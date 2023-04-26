import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

async function checkAdminOrOwner(request: Request, response: Response, next: NextFunction) {
    const isAdmin = response.locals.token.admin;
    const {id} = request.params
    const authenticatedUserId = response.locals.token.id;

    if (!isAdmin && id !== authenticatedUserId) {
        throw new AppError("Insufficient Permission", 403);
    }

    return next();
}


export default checkAdminOrOwner;