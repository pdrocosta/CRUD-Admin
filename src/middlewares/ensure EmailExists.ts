import { NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';
import format from 'pg-format';

const ensureEmailNotExistsMiddleware = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { email } = request.body;
    console.log("ensureemail")

    if (request.method === "PATCH " && !request.body.email) {
        return next()
    }

    const queryString: string = format(`
    SELECT *
    FROM users
    WHERE email = (%L);
  `, email);

    const queryResult: QueryResult = await client.query(queryString);
    console.log(queryResult);

    if (queryResult.rowCount !== 0) {
        throw new AppError("E-mail already registered", 409);
    }

    return next();
};

export default ensureEmailNotExistsMiddleware;
