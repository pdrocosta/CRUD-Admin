
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

const ensureActiveIsFalse = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

  const id = request.params.id
    const queryString = format(
      `
            SELECT *
            FROM users
            WHERE id = (%L);
          `,
          id
    );
  
  
    const queryResult: QueryResult = await client.query(queryString);
    const userInfos = queryResult.rows[0]
      console.log(userInfos, queryResult, id)
    const active = userInfos.active

    if (active === false) {
        return next()
    }

    throw new AppError("User already active", 400)

}


export default ensureActiveIsFalse