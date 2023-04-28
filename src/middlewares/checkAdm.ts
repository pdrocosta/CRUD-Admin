import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

async function checkAdm(request: Request, response: Response, next: NextFunction) {
    const authenticatedUserId = response.locals.token.id;
    console.log("checkAdm", authenticatedUserId)
    const queryString: string = format(
        `
        SELECT *
        FROM users
        WHERE id =  (%L);
      `,
      Number(authenticatedUserId)
    );
    console.log(queryString)

    const queryResult: QueryResult = await client.query(queryString);
    const userInfos = (queryResult.rows[0]);
    console.log(userInfos)

    if (userInfos.admin === false) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
}


export default checkAdm;