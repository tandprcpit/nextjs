'use client'

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import Image from "next/image"

const initiateResetSchema = z.object({
  prn: z.string().min(1, "PRN is required"),
  email: z.string().email("Invalid email address"),
})

const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type InitiateResetFormData = z.infer<typeof initiateResetSchema>
type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

enum ForgotPasswordStep {
  INITIATE,
  VERIFY_OTP,
  RESET_PASSWORD,
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.INITIATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [canResendOtp, setCanResendOtp] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const { toast } = useToast()
  const router = useRouter()

  const initiateForm = useForm<InitiateResetFormData>({
    resolver: zodResolver(initiateResetSchema),
    defaultValues: { prn: '', email: '' },
  })

  const otpForm = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: '' },
  })

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (step === ForgotPasswordStep.VERIFY_OTP && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [step, resendTimer])

  useEffect(() => {
    if (resendTimer === 0) {
      setCanResendOtp(true)
    }
  }, [resendTimer])

  const onInitiateSubmit = async (data: InitiateResetFormData) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/student/forgot-password/initiate', data)
      toast({ title: 'Success', description: response.data.message })
      setStep(ForgotPasswordStep.VERIFY_OTP)
      setResendTimer(60)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onVerifyOtpSubmit = async (data: VerifyOtpFormData) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/student/forgot-password/verify-otp', {
        ...data,
        prn: initiateForm.getValues('prn'),
        email: initiateForm.getValues('email'),
      })
      toast({ title: 'Success', description: response.data.message })
      setStep(ForgotPasswordStep.RESET_PASSWORD)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const onResetPasswordSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/student/forgot-password/reset-password', {
        ...data,
        prn: initiateForm.getValues('prn'),
        email: initiateForm.getValues('email'),
      })
      toast({ title: 'Success', description: response.data.message })
      router.push('/sign-in')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resendOtp = async () => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/student/forgot-password/resend-otp', {
        prn: initiateForm.getValues('prn'),
        email: initiateForm.getValues('email'),
      })
      toast({ title: 'Success', description: response.data.message })
      setCanResendOtp(false)
      setResendTimer(60)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Branding Content */}
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
      {/* Forgot Password Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FBE9D0]">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#244855]">Forgot Password</h2>
            {step === ForgotPasswordStep.INITIATE && (
              <Form {...initiateForm}>
                <form onSubmit={initiateForm.handleSubmit(onInitiateSubmit)} className="space-y-6">
                  <FormField
                    control={initiateForm.control}
                    name="prn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PRN</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your PRN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={initiateForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Send Verification Code'}
                  </Button>
                </form>
              </Form>
            )}
            {step === ForgotPasswordStep.VERIFY_OTP && (
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onVerifyOtpSubmit)} className="space-y-6">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter 6-digit code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Verify Code'}
                  </Button>
                  {canResendOtp ? (
                    <Button type="button" onClick={resendOtp} disabled={isSubmitting} className="w-full mt-2">
                      Resend Code
                    </Button>
                  ) : (
                    <p className="text-center mt-2">Resend code in {resendTimer} seconds</p>
                  )}
                </form>
              </Form>
            )}
            {step === ForgotPasswordStep.RESET_PASSWORD && (
              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={resetPasswordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                    {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Reset Password'}
                  </Button>
                </form>
              </Form>
            )}
            <div className="text-center mt-4">
              <Link href="/sign-in" className="text-[#E64833] hover:underline text-sm">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

