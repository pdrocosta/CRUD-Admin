import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { client } from "../database";
import { QueryResult } from "pg";
import format from "pg-format";

export const ensureIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {

  const { id } = request.params
  const queryString = format(
    `
          SELECT *
          FROM users
          WHERE id = (%L);
        `,
   Number(id) );


  const queryResult: QueryResult = await client.query(queryString);
  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404)
  }

  return next()
};