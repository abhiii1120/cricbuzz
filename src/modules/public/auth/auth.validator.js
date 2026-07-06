import { z } from "zod";
import { ROLES } from "../../../constant/model.constant";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("A valid email is required"),
    password: z.string().min(5, "Password must be at least 6 characters"),
    picture: z.string().trim().url().optional(),
  }),
});
