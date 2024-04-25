//form has to render in a client component because it depends broswer-specific APIs.
'use client';

//uses zod for form validation. install form from shadcn. zod resolver hooks into react hook form so that when data changes it revalidates the data
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/app/ui/button';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

//create form schema to define types/ our form data is an object with a bunch of fields. set it to z.string
//add complex [fields, the PW and confirm password of type string and min 3 char, then add PWConfirm, of type string. no need to add the min as we will do some validation. we use .refine(), which gets passed a cb function as an arg as it contains all data from our form. we need to return T or F. if true, form is valide. if not, provide an error message targetting the appropriate field. if F, .refine() takes a second argument with a message and a path which is an array. the array contains the field for the error. Go ahead and add the fields to the markup

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    },
  );

export default function FormPage() {
  //1. Define the form
  //becaz we are using TS, we need to tell the useform hook the field values and the types. we pass a type to useForm, which is z.infer(), which is generic, so we add a type and reference the formSchema. so essentially it maps all our fields and the types from the schema to the useForm hook.
  //pass a configuration object to the useform hook, first a resolver becz Zod and react form know nothing about each other. the resolver takes the form schema and links it to the useForm hook. add default values

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // 2. Define a submit handler.
  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        style={{
          display: 'grid',
          gridGap: '8px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
        }}
      >
        <div style={{ position: 'relative', height: '400px' }}>
          <Image
            alt="Mountains"
            src={logo}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: 'cover', // cover, contain, none
            }}
          />
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <Image
            alt="Mountains"
            src={logo}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: 'cover', // cover, contain, none
            }}
          />
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <Image
            alt="Mountains"
            src={logo}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: 'cover', // cover, contain, none
            }}
          />
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <Image
            alt="Mountains"
            src={logo}
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: 'cover', // cover, contain, none
            }}
          />
        </div>
        {/* And more images in the grid... */}
      </div>

      {/* //pass all the values returned from useForm used as props, we use the spread operator. */}
      <Form {...form}>
        {/* form.handleSubmit from the form. amd the second handler is our function */}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/*add inputs using Form Field. add a name, it has to be equal to what was in the schema. add control as form.comtrol for the intellisense, to show what it is all about. then add a render prop which receives a field property. this prop returns some markup. it returns a FormItem because it contains react context, so that anything rendered has access to the context. if we get an error, the form message automatically displays an error. in this, we need to add FormLable. under the Form Label we add FormControl which adds the appropriate aria labels (optional). Lastly, render an input component, after installing it from shadcn. we need to spread the field into the input component. add a placeholder, type and save. Style the form by adding a classname. import and add a button at the bottom. Button is added automatically. add type-submit, add classes to the button max-w-md, flex flex-col and gap-4. */}
          {/* Form Field is not self closing, rather it wraps all its children in the render method */}

          {/* Email */}
          <FormField
            name="emailAddress"
            control={form.control}
            render={({ field }) => {
              // Form Item is returned, it contains React context so error messages and all.
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* PAssword */}
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => {
              // Form Item is returned, it contains React context so error messages and all.
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Password confirm */}
          <FormField
            name="passwordConfirm"
            control={form.control}
            render={({ field }) => {
              // Form Item is returned, it contains React context so error messages and all.
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="mt-2 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
