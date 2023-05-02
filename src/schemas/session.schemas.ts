import { z } from "zod";

export const resquestLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const responseLoginSchema = z.object({
  token: z.string(),
});