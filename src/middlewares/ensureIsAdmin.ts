
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserIsAdmin = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const admin = response.locals.token.admin

    if (admin) {
        return next()
    }

    throw new AppError("Insufficient Permission", 403)

}


export default ensureUserIsAdmin