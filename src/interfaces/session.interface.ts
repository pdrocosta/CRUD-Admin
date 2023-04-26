import { z } from "zod";
import {
  responseLoginSchema,
  resquestLoginSchema,
} from "../schemas/session.schemas";

export type TLoginRequest = z.infer<typeof resquestLoginSchema>;
export type TLoginResponse = z.infer<typeof responseLoginSchema>;