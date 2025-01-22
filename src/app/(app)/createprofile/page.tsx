'use client'
import React, { useEffect, useState } from 'react'
import { MultiSelect } from "react-multi-select-component"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from 'axios'
import { useSession, signOut } from 'next-auth/react';
import { ApiResponse } from "@/types/apiResponse"
import { signIn } from 'next-auth/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { User } from "next-auth";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { updateProfileSchema } from '@/schemas/updateProfileSchema';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import {
    castOptions,
    departmentOptions,
    liveKTOptions,
    divisionOptions,
    twelfthDiplomaOptions,
    occupationOptions,
    genderOptions,
    bloodGroupOptions,
    areaOfInterestOptions,
    admissionBasedOnOptions,
    semBacklog,
    gapOptions
} from '@/data/options';
import { IconArrowLeft } from '@tabler/icons-react';
import { DayPicker } from 'react-day-picker';

const Page = () => {

    type SkillOption = {
        label: string;
        value: string;
    };

    const { data: session } = useSession();
    const user: User = session?.user as User;
    const username: string = user?.username || "Loading...";
    const email: string = user?.email || "Loading..."

    const skillOptions: SkillOption[] = [
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "React.js", value: "reactjs" },
        { label: "Node.js", value: "nodejs" },
        { label: "Express.js", value: "expressjs" },
        { label: "Next.js", value: "nextjs" },
        { label: "MongoDB", value: "mongodb" },
        { label: "SQL", value: "sql" },
        { label: "Git", value: "git" },
        { label: "Docker", value: "docker" },
        { label: "Kubernetes", value: "kubernetes" },
        { label: "AWS", value: "aws" },
        { label: "Firebase", value: "firebase" },
        { label: "Python", value: "python" },
        { label: "Django", value: "django" },
        { label: "Flask", value: "flask" },
        { label: "Java", value: "java" },
        { label: "C++", value: "cpp" },
        { label: "GraphQL", value: "graphql" },
    ];




    const [gapVisible, setGapVisible] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [diplomaOr12th, setDiplomaOr12th] = useState("")
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            skills: [],
        },
    });

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'gopaluploadpreset');
        formData.append('cloud_name', 'dae4fjmsn');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dae4fjmsn/image/upload/', formData);
            return response.data.url;
        } catch (error) {
            throw new Error('Image upload failed');
        }
    };

    const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
        setIsSubmitting(true);
        try {

            if (data.image instanceof File) {
                const imageUrl = await uploadImage(data.image);

                data = { ...data, image: imageUrl };
            }

            const updatedData = { ...data, isProfileComplete: true };


            await axios.post<ApiResponse>('/api/update-student-profile/', updatedData);

            toast({
                title: 'Success',
                description: "Profile Created SuccessFully, Login again with your PRN OR Email",
            });


            await signIn('student-credentials', { redirect: false });
            signOut();
            router.replace(`/sign-in`);
        } catch (error) {
            console.error('Error updating user profile', error);

            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message || 'An unexpected error occurred';

            toast({
                title: "Profile update failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        form.setValue('prnNumber', username);
        form.setValue('username', username);
        form.setValue('email', email);
    }, [username, email, form]);


    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date(selectedYear, 0));

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const handleYearChange = (year: string) => {
        const newYear = parseInt(year, 10);
        setSelectedYear(newYear);
        setSelectedMonth(new Date(newYear, 0));
    };

    const handleMonthChange = (month: Date) => {
        setSelectedMonth(month);
    };




    return (
        <div className="flex justify-center items-start min-h-screen">
            <div className="w-full max-w-6xl p-8 space-y-8 bg-white rounded-lg  mt-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-1xl mb-6">
                        Update Profile
                    </h1>
                    <p className="mb-4">Update your information below then you will get entire access</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <p className="mb-4 text-xl font-bold">Personal Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">


                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="middle Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="last name" {...field} />
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
                                        <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Loading..." disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="mobile number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Controller
                                name="birthDate"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Birth Date <span className="text-red-500">*</span></FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={`w-full justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""
                                                            }`}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <div className="p-2 flex flex-col space-y-2">
                                                    {/* Year Selector */}
                                                    <Select onValueChange={handleYearChange} value={selectedYear.toString()}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {years.map((year) => (
                                                                <SelectItem key={year} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>


                                                    <DayPicker
                                                        mode="single"
                                                        selected={field.value ? field.value : undefined}
                                                        onSelect={(date) => field.onChange(date)}
                                                        month={selectedMonth}
                                                        onMonthChange={handleMonthChange}
                                                        fromMonth={new Date(selectedYear, 0)}
                                                        toMonth={new Date(selectedYear, 11)}
                                                        initialFocus
                                                    />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        {/* <FormMessage>{formState.errors.birthDate?.message}</FormMessage> */}
                                    </FormItem>
                                )}
                            />





                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {genderOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="adharNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Aadhar Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Aadhar Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cast"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cast <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Cast" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {castOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Group <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select blood group" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {bloodGroupOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Full Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Father Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fatherMobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Mobile Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Father Mobile Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fatherOccupation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father Occupation <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Father Occupation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {occupationOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="motherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Full Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mother Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="motherMobileNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Mobile Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mother Mobile Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="motherOccupation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mother Occupation <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Mother Occupation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {occupationOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>District <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="District" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="State" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pincode <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pincode" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="localAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Local Address <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Local Address"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <p className="mb-4 text-xl font-bold">Acadmic Infromation</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="prnNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PRN Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Loading..." disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="tenthMarks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>10th Percentage <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="10th percentage" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="twelfthDiploma"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>12th/Diploma <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            {/* Changed 'defaultValue' to 'value' to bind the selected value */}
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setDiplomaOr12th(value);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    {/* Placeholder will show when no value is selected */}
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {/* Mapping through twelfthDiplomaOptions to create select items */}
                                                    {twelfthDiplomaOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="twelfthDiplomaPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{diplomaOr12th} Percentage <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder={diplomaOr12th} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="admissionBasedOn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Admission Based On <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Admission Basis" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {admissionBasedOnOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departmentOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="division"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Division <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Division" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {divisionOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="passoutYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Passout Year <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Passout Year" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lgName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LG Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="LG Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem1SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 1 SGPA</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Sem 1 SGPA"
                                                type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="sem1CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 1 CGPA</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 1 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem1Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 1 Backlog</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Convert number to string for display in the Select component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Convert option.value to string for consistency */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem2SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 2 SGPA</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 2 SGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem2CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 2 CGPA</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 2 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem2Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 2 Backlog</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Convert number to string for display in the Select component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Convert option.value to string for consistency */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem3SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 3 SGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 3 SGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem3CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 3 CGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 3 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem3Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 3 Backlog <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Convert number to string for display in the Select component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Ensure value is a string */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="sem4SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 4 SGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 4 SGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem4CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 4 CGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 4 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem4Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 4 Backlog <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Convert number to string for display in the Select component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Ensure value is a string */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem5SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 5 SGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 5 SGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem5CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 5 CGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 5 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem5Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 5 Backlog <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Use value for controlled component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Ensure value is a string for consistency */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sem6SGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 6 SGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 6 SGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem6CGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 6 CGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sem 6 CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sem6Backlog"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sem 6 Backlog <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Use value for controlled component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {semBacklog.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Ensure value is a string for consistency */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="overallCGPA"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overall CGPA <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Overall CGPA" type='number'
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="anyLiveKTs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Any Live KTs <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number before updating the form state
                                                value={field.value !== undefined ? String(field.value) : undefined} // Use value for controlled component
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {liveKTOptions.map((option) => (
                                                        <SelectItem key={option.value} value={String(option.value)}> {/* Ensure value is a string for consistency */}
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="anyGapDuringEducation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Any Gap During Education <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value); // Update form state with selected value
                                                    setGapVisible(value === "Yes"); // Set visibility based on selected value
                                                }}
                                                value={field.value || ""} // Controlled component; use value instead of defaultValue
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {gapOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {gapVisible && (
                                <FormField
                                    control={form.control}
                                    name="gapReason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason (If any gap during education)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Gap Reason" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <p className="mb-3 mt-5 text-xl font-bold">SkillSet Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                            <FormField
                                control={form.control}
                                name="projectTitle1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title 1 </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project Title 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectLink1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Link 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project Link 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectDescription1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Description 1</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Project Description 1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectTitle2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title 2</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project Title 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectLink2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Link 2</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project Link 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectDescription2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Description 2</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Project Description 2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="personalPortfolioLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Personal Portfolio Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Personal Portfolio Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="resumeLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Resume Drive Link <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Resume Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="githubLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="GitHub Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedinLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="LinkedIn Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagramLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Instagram Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="twitterLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Twitter Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Twitter Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="leetcodeLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LeetCode Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="LeetCode Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="geeksForGeeksLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GeeksForGeeks Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="GeeksForGeeks Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="codechefLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CodeChef Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="CodeChef Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hackerRankLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>HackerRank Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="HackerRank Link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="areaOfInterest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area of Interest <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select area of interest" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {areaOfInterestOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Skills <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Controller
                                                control={form.control}
                                                name="skills"
                                                render={({ field }) => (
                                                    <MultiSelect
                                                        options={skillOptions}
                                                        value={field.value.map((skill: string) => ({
                                                            label: skill,
                                                            value: skill.toLowerCase().replace(/\s+/g, '-'),
                                                        }))}
                                                        onChange={(selected: SkillOption[]) =>
                                                            field.onChange(selected.map((option: SkillOption) => option.value))
                                                        }
                                                        labelledBy={"Select skills"}
                                                        hasSelectAll={false}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="aboutYou"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About You <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="About You" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold mb-2">Upload Image <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <label
                                                htmlFor="image-upload"
                                                className={`flex items-center justify-center w-full h-36 border-2 rounded-md cursor-pointer transition ${selectedImage ? 'border-green-500' : 'border-dashed border-gray-300 hover:border-gray-400'}`}
                                            >
                                                {selectedImage ? (
                                                    <div className="flex flex-col items-center">
                                                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="h-24 w-24 object-cover mb-2 rounded-md" />
                                                        <span className="text-gray-600">Image Selected</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-600">Click to upload</span>
                                                )}
                                                <input
                                                    id="image-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        field.onChange(file || null);
                                                        setSelectedImage(file || null);
                                                    }}
                                                />
                                            </label>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                        <div className="flex justify-center mt-4">

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : ('Update Profile')}

                            </Button>
                        </div>

                    </form>


                </Form>

            </div>
        </div>
    );
};

export default Page;
