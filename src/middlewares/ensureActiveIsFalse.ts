
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

const ensureActiveIsFalse = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const email = request.body.email
    const queryString = format(
      `
            SELECT *
            FROM users
            WHERE email = (%L);
          `,
          email
    );
  
  
    const queryResult: QueryResult = await client.query(queryString);
    const userInfos = queryResult.rows[0]
    console.log(email, queryString, userInfos)

    const active = userInfos.active
    console.log(active, email, queryString, userInfos)

    if (active === false) {
        return next()
    }

    throw new AppError("User already active", 400)

}


export default ensureActiveIsFalse