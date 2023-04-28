import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

async function checkAdminOrOwner(request: Request, response: Response, next: NextFunction) {
    const isAdmin = request.body.admin
    const id = request.params.id
    const authenticatedUserId = response.locals.token.id;


    if (isAdmin === false && id !== authenticatedUserId) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
}


export default checkAdminOrOwner;