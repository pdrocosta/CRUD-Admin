import format from "pg-format";
import "dotenv/config";
import { QueryResult } from "pg";
import * as bcrypt from "bcryptjs";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { TLoginRequest, TLoginResponse } from "../../interfaces/session.interface";
import { userSchema } from "../../schemas/users.schemas";
import process from "process";
import jwt from "jsonwebtoken";

const createSessionService = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const query: string = `
    SELECT * FROM users WHERE email = %L;
  `;
console.log("creation")

  const queryFormat: string = format(query, [payload.email]);

  const queryResult: QueryResult<TUser> = await client.query(queryFormat);
  const user = userSchema.parse(queryResult.rows[0])

  const token: string = jwt.sign(
    {
      email: user.email,
    },
    (process.env.SECRET_KEY!),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createSessionService;