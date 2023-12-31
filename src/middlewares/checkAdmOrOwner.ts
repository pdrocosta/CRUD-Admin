import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";

async function checkAdminOrOwner(request: Request, response: Response, next: NextFunction) {
    const authenticatedUserId = response.locals.token.id;

    const queryString: string = format(
        `
        SELECT *
        FROM users
        WHERE id =  (%L);
      `,
      Number(authenticatedUserId)
    );

    const queryResult: QueryResult = await client.query(queryString);
    const userInfos = (queryResult.rows[0]);
    const id = userInfos.id


    if (userInfos.admin === false && userInfos.id !== authenticatedUserId) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
}


export default checkAdminOrOwner;