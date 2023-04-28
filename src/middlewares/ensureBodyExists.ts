import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'

const ensureBodyIsValidMiddleware =
    (schema: ZodTypeAny) =>
        (request: Request, response: Response, next: NextFunction) => {
            const validatedBody = schema.parse(request.body)

            request.body = validatedBody
            console.log("ensurebody")
            return next()
        }

export default ensureBodyIsValidMiddleware