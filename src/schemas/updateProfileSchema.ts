import { z } from 'zod';

export const updateProfileSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    mobileNumber: z.string({ required_error: "Enter mobile number" })
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    birthDate: z.date({ required_error: "Birth date is required" }),
    gender: z.string(),
    bloodGroup: z.string(),
    adharNumber: z
        .string({ required_error: "Enter Aadhaar number" })
        .regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
    cast: z.string(),
    fatherName: z.string({ required_error: "Father's name is required" }).min(5, "Enter Full Name"),

    fatherMobileNumber: z.string({ required_error: "Enter mobile number" })
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    fatherOccupation: z.string(),
    motherName: z.string({ required_error: "Mother's name is required" }).min(5, "Enter Full Name"),
    motherMobileNumber: z.string({ required_error: "Enter mobile number" })
        .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    motherOccupation: z.string(),
    localAddress: z.string({ required_error: "Enter Full Address" }).min(20, "Enter Full Valid Address"),
    city: z.string({ required_error: "Enter City Name" }).min(2, "Enter Valid City Name"),
    district: z.string({ required_error: "Enter District Name" }).min(2, "Enter Valid District Name"),
    state: z.string({ required_error: "Enter State Name" }).min(2, "Enter Valid State Name"),
    pincode: z.string().length(6, "Pincode must be exactly 6 digits").regex(/^\d{6}$/, "Pincode must contain only digits"),


    prnNumber: z.string().optional(),
    tenthMarks: z
        .string()
        .refine(
            (value) => {
                const percentage = parseFloat(value);
                return !isNaN(percentage) && percentage >= 0 && percentage <= 100;
            },
            { message: "Tenth percentage must be a valid number between 0 and 100" }
        ),
    twelfthDiploma: z.string(),
    twelfthDiplomaPercentage: z
        .string()
        .refine(
            (value) => {
                const percentage = parseFloat(value);
                return !isNaN(percentage) && percentage >= 0 && percentage <= 100;
            },
            { message: "12th/Diploma percentage must be a valid number between 0 and 100" }
        ),
    admissionBasedOn: z.string(),
    department: z.string(),
    division: z.string(),
    lgName: z.string(),

    sem1SGPA: z.number().optional(),
    sem1CGPA: z.number().optional(),
    sem1Backlog: z.number().optional(),
    sem2SGPA: z.number().optional(),
    sem2CGPA: z.number().optional(),
    sem2Backlog: z.number().optional(),


    sem3SGPA: z
        .number({
            required_error: "Sem 3 SGPA is required",
        })
        .min(1, { message: "Sem 3 SGPA  must be at least 1" })
        .max(10, { message: "Sem 3 SGPA  must not exceed 10" }),

    sem3CGPA: z
        .number({
            required_error: "Sem 3 CGPA is required",
        })
        .min(1, { message: "Sem 3 CGPA  must be at least 1" })
        .max(10, { message: "Sem 3 CGPA  must not exceed 10" }),
    sem3Backlog: z.number(),
    sem4SGPA: z
        .number({
            required_error: "Sem 4 SGPA is required",
        })
        .min(1, { message: "Sem 4 SGPA  must be at least 1" })
        .max(10, { message: "Sem 4 SGPA  must not exceed 10" }),
    sem4CGPA: z
        .number({
            required_error: "Sem 4 CGPA is required",
        })
        .min(1, { message: "Sem 4 CGPA  must be at least 1" })
        .max(10, { message: "Sem 4 CGPA  must not exceed 10" }),
    sem4Backlog: z.number(),
    sem5SGPA: z
        .number({
            required_error: "Sem 5 SGPA is required",
        })
        .min(1, { message: "Sem 5 SGPA  must be at least 1" })
        .max(10, { message: "Sem 5 SGPA  must not exceed 10" }),
    sem5CGPA: z
        .number({
            required_error: "Sem 5 CGPA is required",
        })
        .min(1, { message: "Sem 5 CGPA  must be at least 1" })
        .max(10, { message: "Sem 5 CGPA  must not exceed 10" }),
    sem5Backlog: z.number(),
    sem6SGPA: z
        .number({
            required_error: "Sem 6 SGPA is required",
        })
        .min(1, { message: "Sem 6 SGPA  must be at least 1" })
        .max(10, { message: "Sem 6 SGPA  must not exceed 10" }),

    sem6CGPA: z
        .number({
            required_error: "Sem 6 CGPA is required",
        })
        .min(1, { message: "Sem 6 CGPA  must be at least 1" })
        .max(10, { message: "Sem 6 CGPA  must not exceed 10" }),
    sem6Backlog: z.number(),
    passoutYear: z
        .number({
            required_error: "Year must be a 4-digit number, e.g., 2025",
            invalid_type_error: "Year must be a number",
        })
        .int({ message: "Year must be an integer" })
        .refine((year) => year.toString().length === 4, {
            message: "Year must be a 4-digit number, e.g., 2025",
        }),

    overallCGPA: z
        .number({
            required_error: "Overall CGPA is required",
        })
        .min(0, { message: "Overall CGPA must be at least 0" })
        .max(10, { message: "Overall CGPA must not exceed 10" }),

    anyLiveKTs: z.number(),
    anyGapDuringEducation: z.string(),
    gapReason: z.string().optional(),
    areaOfInterest: z.string(),
    aboutYou: z
        .string({
            required_error: "The 'About You' section is required",
        })
        .min(50, { message: "The 'About You' section must be at least 50 characters long" })
        .max(800, { message: "The 'About You' section must not exceed 800 characters" }),
    projectTitle1: z.string().optional(),
    projectLink1: z.string().optional(),
    projectDescription1: z.string().optional(),
    projectTitle2: z.string().optional(),
    projectLink2: z.string().optional(),
    projectDescription2: z.string().optional(),
    personalPortfolioLink: z.string().optional(),
    resumeLink: z
        .string({
            required_error: "Resume link is required", // Error if missing
        })
        .regex(
            /^https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)[\w-]+/,
            { message: "Resume link must be a valid Google Drive link" }
        ),
    githubLink: z.string().optional(),
    linkedinLink: z.string().optional(),
    instagramLink: z.string().optional(),
    twitterLink: z.string().optional(),
    leetcodeLink: z.string().optional(),
    geeksForGeeksLink: z.string().optional(),
    codechefLink: z.string().optional(),
    hackerRankLink: z.string().optional(),
    firstName: z.string({ required_error: "First name is required" }).min(2, "Atleat Two Character"),
    middleName: z.string({ required_error: "Middle name is required" }).min(2, "Atleat Two Character"),
    skills: z.array(z.string()).min(1, "Please select at least one skill"),
    lastName: z.string({ required_error: "Last name is required" }).min(2, "Atleat Two Character"),
    isProfileComplete: z.boolean().optional().default(false),
    image: z.any(),
});
