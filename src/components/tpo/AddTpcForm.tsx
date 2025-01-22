'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'

import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { tpcSchema } from '@/schemas/tpcSchema'



type TpcFormData = z.infer<typeof tpcSchema>

interface AddTpcFormProps {
  onClose: () => void
  fetchTpcs: () => Promise<void>
}

export function AddTpcForm({ onClose, fetchTpcs }: AddTpcFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<TpcFormData>({
    resolver: zodResolver(tpcSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: TpcFormData) => {
    setIsSubmitting(true)

    try {
      const response = await axios.post<{ message: string }>("/api/tpo/add-tpc", data)
      toast({
        title: "Success",
        description: response.data.message,
      })
      fetchTpcs() // Fetch updated TPC list after adding
      onClose()
    } catch (error) {
      console.error("Error in TPC sign-up:", error)
      toast({
        title: "Sign-up failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg max-w-lg mx-auto mb-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#244855]">Add New TPC</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-[#244855]">
            Name
          </label>
          <Input
            id="name"
            placeholder="Full Name"
            {...form.register("name")}
            className="w-full px-3 py-2 border border-[#90AEAD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#244855]"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-[#E64833]">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#244855]">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            {...form.register("email")}
            className="w-full px-3 py-2 border border-[#90AEAD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#244855]"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-[#E64833]">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[#244855]">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...form.register("password")}
            className="w-full px-3 py-2 border border-[#90AEAD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#244855]"
          />
          {form.formState.errors.password && (
            <p className="text-sm text-[#E64833]">{form.formState.errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            className="w-full md:w-auto bg-[#E64833] text-white hover:bg-[#244855] transition-colors"
            disabled={isSubmitting}
          >
             {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>) : 'Add TPC'}
          
          </Button>
        </div>
      </form>
    </div>
  )
}
