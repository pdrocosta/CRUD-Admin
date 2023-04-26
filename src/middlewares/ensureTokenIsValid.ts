import jwt from "jsonwebtoken";
import { AppError } from "../error";
import { NextFunction, Request, Response } from "express";

const ensureTokenExistsdMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }
  token = token.split(" ")[1];

  jwt.verify(token, String(process.env.SECRET_KEY!), (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    response.locals.token = {
      token: token,
      admin: decoded.admin,
      id: parseInt(decoded.sub),

    };
  });

  return next();
};

export default ensureTokenExistsdMiddleware;