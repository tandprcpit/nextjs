'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import {  useState } from "react";
import { tpoSchema } from "@/schemas/tpoSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";


const TpoSignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const form = useForm<z.infer<typeof tpoSchema>>({
    resolver: zodResolver(tpoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof tpoSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/tpo/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/tpo/sign-in");
    } catch (error) {
      console.error("Error in TPO sign-up:", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      let errorMessage = AxiosError.response?.data.message;

      toast({
        title: "Sign-up failed",
        description: errorMessage || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-800">
      {/* Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FBE9D0]">
        <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#244855]">TPO Sign Up</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-sm text-[#874F41]">
              Already have an account?{" "}
              <Link href="/tpo/sign-in" className="text-[#E64833] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
     
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
          <h2 className="text-2xl font-normal text-[#244855]">Shirpur Education Society&apos;s</h2>
          <h1 className="text-3xl font-semibold tracking-tight text-[#244855]">R. C. Patel Institute of Technology, Shirpur</h1>
          <div className="space-y-2">
            <p className="text-lg text-[#244855]">An Autonomous Institute</p>
            <p className="text-lg text-[#244855]">Affiliated to DBATU, Lonere (M.S.)</p>
          </div>
          <span className="text-2xl block text-[#244855] font-semibold">Training and Placement Department</span>
        </div>
      </div>
    </div>
  );
};

export default TpoSignUpPage;
