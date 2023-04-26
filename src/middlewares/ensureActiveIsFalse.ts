
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

const ensureActiveIsFalse = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { id } = request.params
    const queryString = format(
      `
            SELECT *
            FROM users
            WHERE id = $1;
          `,
      id
    );
  
  
    const queryResult: QueryResult = await client.query(queryString);
    const userInfos = queryResult.rows[0]

    const active = userInfos.body.active

    console.log(active)

    if (!active) {
        return next()
    }

    throw new AppError("User already active", 400)

}


export default ensureActiveIsFalse