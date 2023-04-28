import { TLoginRequest, TLoginResponse } from "../interfaces/session.interface"
import createSessionService from "../services/Users/loginUser.service"
import { Request, Response } from 'express'


export const loginUserController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TLoginRequest = req.body

    const token: TLoginResponse = await createSessionService(payload)

    return resp.status(200).json(token)
}
