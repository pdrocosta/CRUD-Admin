import { z } from "zod";

export const resquestLoginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export const responseLoginSchema = z.object({
  token: z.string(),
});