import * as z from 'zod'

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  salary: z.string().optional() ,
  bond: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  criteria: z.object({
    overallCGPA:  z
    .number({
      required_error: "Overall CGPA is required",
    })
    .min(0, { message: "Overall CGPA must be at least 0" }) 
    .max(10, { message: "Overall CGPA must not exceed 10" }), 
    
    gender: z.array(z.string()),
    passoutYear: z.number().int().positive(),
    anyLiveKTs: z.number().optional(),
    anyGapDuringEducation: z.array(z.string()),
    department: z.array(z.string()),
    tenthMarks: z.number().min(0).max(100),
    twelfthPercentage: z.number().min(0).max(100),
    diplomaPercentage: z.number().min(0).max(100),
    skills: z.array(z.string()),
  }),
  rounds: z.array(z.object({
    roundNumber: z.number().int().positive(),
    roundName: z.string().min(1, "Round name is required"),
  })),
})

export type CompanyFormData = z.infer<typeof companySchema>
