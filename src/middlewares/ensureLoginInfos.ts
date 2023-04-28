import format from "pg-format";

import { NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSchema } from "../schemas/users.schemas";

const checkLoginInfos = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = request.body;

  const queryString: string = format(
    `
      SELECT *
      FROM users
      WHERE email =  (%L);
    `,
    payload.email
  );

  const queryResult: QueryResult = await client.query(queryString);

  const userInfos = (queryResult.rows[0]);

  if (!userInfos) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!userInfos.active) {
    throw new AppError('Your account is not active', 401);
  }

  const comparePassword: boolean = await bcrypt.compare(
    payload.password,
    userInfos.password
  );

  if (comparePassword === false) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = jwt.sign(
    {
      email: userInfos.email,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: userInfos.id.toString(),
    }
  );
  response.locals.token = {
    token: token,
    admin: userInfos.admin,
    id: userInfos.id,
  };

  return next();
};

export default checkLoginInfos;
