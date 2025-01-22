
import * as z from "zod";

export const addCompanyQuestionsSchema = z.object({
  company: z.string().nonempty("Company is required"),
  questions: z.array(z.string().min(1, "Question cannot be empty")),
  review: z.string().optional(),
});
