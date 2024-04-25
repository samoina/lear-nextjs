import Image from 'next/image';
import SignupForm from '@/app/ui/signup/signup-form';

const Signup = () => {
  return (
    <>
      <section className="flex h-full gap-8 p-0 md:max-lg:relative  md:max-lg:w-[417px] md:max-lg:p-8 md:max-lg:gap-6 md:max-lg:h-[874px]  md:max-lg:top-20 md:max-lg:left-96">
        <Image
          className="hidden border border-red-300 sm:block"
          width={667}
          height={1024}
          src="/rocket-takeoff.png"
          alt="Image showing rocket at takeoff"
          style={{
            // 	width: '100%',
            height: 'auto',
          }}
          sizes="(min-width: 1024px) 667px, (max-width: 768px) 558px"
        />

        <div className="mx-auto my-[50px] flex w-[360px] flex-col items-center border border-red-300 bg-[#131620] md:max-lg:absolute md:max-lg:left-[512px] md:max-lg:z-10 md:max-lg:w-[417px] md:max-lg:p-8">
          <Image
            src="/logo.svg"
            alt="Lockbet Logo"
            width={67}
            height={60}
            className="m-4"
          />

          <p className="text-center text-2xl font-semibold leading-9">
            Welcome to Lockbet
          </p>
          <p>Create an account below</p>
          <SignupForm />
        </div>
      </section>
    </>
  );
};

export default Signup;
