import { NextFunction, Request, Response } from 'express'
import { QueryResult } from 'pg'
import { client } from '../database'
import { AppError } from '../error'
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const checkLoginInfos = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = request.body

  const queryString: string = `
            SELECT
                *
            FROM
                users
            WHERE
                email = $1;
        `


  const queryResult: QueryResult = await client.query(queryString, [payload.email])

  const userInfos = queryResult.rows[0]

  if (queryResult.rowCount !== 0) {
    throw new AppError("Wrong email/password", 401)
  }

  if (userInfos.active === false) {
    throw new AppError("Wrong email/password", 401)

  }

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    userInfos.password
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
      subject: userInfos.id.toString(),
    }
  );

  response.locals.token = {
    token: token,
    admin: userInfos.admin,
    id: userInfos.id
  };

  return next()
}

export default checkLoginInfos