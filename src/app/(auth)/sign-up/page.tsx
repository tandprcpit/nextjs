'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useDebounceCallback } from 'usehooks-ts'
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

import Image from "next/image"

const Page = () => {
    const [username, setUsername] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUsername, 500)
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const AxiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(AxiosError.response?.data.message ?? "Error checking username")
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsernameUnique()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)

        try {
            const response = await axios.post<ApiResponse>('/api/sign-up/', data)
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace(`/verify/${username}`)
            setIsSubmitting(false)
        } catch (error) {
            console.error('error in signup of User', error)
            const AxiosError = error as AxiosError<ApiResponse>;
            let errorMessage = AxiosError.response?.data.message

            toast({
                title: "Signup failed",
                description: errorMessage,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-800">
            {/* Sign Up Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FBE9D0]">
                <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-xl">
                  
                    <h2 className="text-3xl font-bold mb-6 text-center text-[#244855]">Sign Up</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username (PRN)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    debounced(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                                        <p className={`text-sm ${usernameMessage === 'Username is unique' ? 'text-green-500' : 'text-red-500'}`}>
                                            {usernameMessage}
                                        </p>
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
                                            <Input placeholder="email" {...field} />
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
                                            <Input type="password" placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#E64833] text-white hover:bg-[#244855] transition-colors">
                                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Sign up'}
                            </Button>
                        </form>
                    </Form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-[#874F41]">
                            Already a member?{' '}
                            <Link href="/sign-in" className="text-[#E64833] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
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
    )
}

export default Page
