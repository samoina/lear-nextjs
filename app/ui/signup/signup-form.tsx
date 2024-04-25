'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from './form';
import Input from './input'
import { Checkbox } from './checkbox';
import { Button } from './button';
import Link from 'next/link';

const formSchema = z
	.object({
		name: z.string(),
		userName: z.string(),
		phoneNumber: z.string(),
		password: z.string().min(3),
		confirmPassword: z.string(),
		mobile: z.boolean().default(false).optional(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passowrds do not match',
			path: ['confirmPassword'],
		}
	);

export default function SignupForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			userName: '',
			phoneNumber: '',
			password: '',
			confirmPassword: '',
			mobile: true,
		},
	});

	function handleSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<main>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 md:max-lg:w-[360px]"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											className="h-12"
											placeholder="Enter name"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="userName"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											className="h-12"
											placeholder="Username"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="phoneNumber"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input
											className="h-12"
											placeholder="+254"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="password"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											className="h-12"
											placeholder="Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="confirmPassword"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											className="h-12"
											placeholder="Password"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<FormField
						name="mobile"
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Checkbox
											className="bg-[#0098DA]"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="text-xs">
										By clicking Register, you confirm to have read and agreed to
										the Terms and conditions and that you are over 18 years of
										age
									</FormLabel>

									<FormMessage />
								</FormItem>
							);
						}}
					/>

					<Button
						type="submit"
						className=" h-[40px] rounded-3xl px-3 py-4 bg-[#0098DA]"
					>
						Register
					</Button>

					<p className="text-sm">
						Already have an account?{' '}
						<Link
							href=".login"
							className="font-semibold text-sm text-[#0098DA]"
						>
							Log In
						</Link>
					</p>
				</form>
			</Form>
		</main>
	);
}
