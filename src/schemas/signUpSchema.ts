import { z } from 'zod'

export const usernameValidation = z
    .string()
    .length(9, "Number must be exactly 9 digits")
    .regex(/^\d{9}$/, "Number must contain only digits");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: " password must be 6 characters" })
}) 