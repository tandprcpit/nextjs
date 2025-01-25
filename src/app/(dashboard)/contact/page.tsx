
"use client"
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label_aceternity";
import { Input } from "@/components/ui/input_aceternity";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea_aceternity";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;

        emailjs
            .sendForm(
                "service_y0opnmj", 
                "template_48sovfa", 
                form,
                "6JUazIfqT55ywBw1j"  
            )
            .then(
                (result) => {
                    console.log("Email sent:", result.text);
                    setStatus("success");
                    setLoading(false);
                    form.reset();
                },
                (error) => {
                    console.error("Email error:", error.text);
                    setStatus("error");
                    setLoading(false);
                }
            );
    };

    return (
        <div className="min-h-screen bg-white relative">
            <div className="mt-16 max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white mb-10">
                <h2 className="flex justify-center font-bold text-3xl text-[#244855]">
                    Contact
                </h2>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="firstname">Name</Label>
                        <Input id="firstname" name="name" placeholder="Gopal" type="text" required />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="gopalpatilrcpit@gmail.com"
                            type="email"
                            required
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="message"
                            placeholder="Enter your description here..."
                            required
                        />
                    </LabelInputContainer>

                    <button
                        className="bg-[#E64833] hover:bg-[#d43d29] relative group/btn text-white w-full rounded-md h-10 font-medium"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message →"}
                        <BottomGradient />
                    </button>

                    {status === "success" && (
                        <p className="text-green-500 mt-4">Message sent successfully!</p>
                    )}
                    {status === "error" && (
                        <p className="text-red-500 mt-4">Failed to send the message. Try again later!</p>
                    )}

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
            </div>
        </div>
    );
};

export default Contact;

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
