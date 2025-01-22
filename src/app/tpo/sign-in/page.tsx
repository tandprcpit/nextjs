'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema"; // Reuse schema for consistency
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"; // Import loader icon
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true); 

    const result = await signIn('tpo-credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    });

    setIsSubmitting(false); 

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect TPO username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }
    if (result?.url) {
      toast({
        title: 'Success',
        description: 'TPO login successfully.',
        variant: 'default',
      });
      router.replace('/tpo/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
     
      <div className="w-full md:w-1/2 bg-[#90AEAD] flex items-center justify-center p-12">
        <div className="max-w-md w-full space-y-5 text-center">
          <div className="flex justify-center">
            <Image
              src="/rcpitlogo.png"
              alt="RCPIT Logo"
              width={180}
              height={180}
              className="w-32 h-32"
            />
          </div>
          <h2 className="text-2xl font-normal text-[#244855]">
            Shirpur Education Society&apos;s
          </h2>
          <h1 className="text-3xl font-semibold tracking-tight text-[#244855]">
            R. C. Patel Institute of Technology, Shirpur
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-[#244855]">
              An Autonomous Institute
            </p>
            <p className="text-lg text-[#244855]">
              Affiliated to DBATU, Lonere (M.S.)
            </p>
          </div>
          <span className="text-2xl block text-[#244855] font-semibold">
            Training and Placement Department
          </span>
        </div>
      </div>
     
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FBE9D0]">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#244855]">TPO Sign In</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="identifier" className="text-sm font-medium text-[#244855]">
                  Email
                </label>
                <Input
                  id="identifier"
                  placeholder="email"
                  {...form.register("identifier")}
                  className="w-full px-3 py-2 border border-[#90AEAD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#244855]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#244855]">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  {...form.register("password")}
                  className="w-full px-3 py-2 border border-[#90AEAD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#244855]"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Sign In'}
              </Button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-[#874F41]">
                Not a TPO?{' '}
                <Link href="/sign-in" className="text-[#E64833] hover:underline">
                  Sign in as a Student
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
