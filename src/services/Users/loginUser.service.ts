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
  const queryFormat: string = format(query, [payload.email]);
  const queryResult: QueryResult<TUser> = await client.query(queryFormat);
  const user = userSchema.parse(queryResult.rows[0])

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password!", 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (comparePassword === false) {
    throw new AppError("Wrong email or password!", 401);
  }

  const token: string = jwt.sign(
    {
      password: payload.password
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "24h",
      subject: user.id.toString(),
    }
  );

  return { token };
};

export default createSessionService;