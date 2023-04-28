import { Request, Response } from 'express'
import { TAllUserResponse, TUser, TUserRequest, TUserResponse, TUserUpdateRequest } from '../interfaces/users.interfaces'
import createUserService from '../services/Users/newUser.service'
import listAllUsersService from '../services/Users/listAllUsers.service'
import { updateUserInfoService } from '../services/Users/patchUserAdmin.service'
import { deleteUserService } from '../services/Users/deleteUser.service'
import { reactivateUserService } from '../services/Users/reactivateUser.service'
import listUserInfosService from '../services/Users/listUser.service'

export const createUsersController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TUserRequest = req.body

    const newUser: TUserResponse = await createUserService(payload)

    return resp.status(201).json(newUser)
}

export const listUsersController = async (req: Request, resp: Response): Promise<Response> => {
    const allUsers: TAllUserResponse = await listAllUsersService()

    return resp.status(200).json(allUsers)
}


export const retriveUserController = async (req: Request, resp : Response): Promise<Response> => {
    const id = resp.locals.token.id
    const userInfos: TUserResponse = await listUserInfosService(Number(id))

    return resp.status(200).json(userInfos)
}


export const updateUserController = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TUserUpdateRequest = req.body
    const { id } = req.params

    const updatedUser: TUserResponse = await updateUserInfoService(payload, Number(id))

    return resp.status(200).json(updatedUser)
}

export const deleteUserController = async (req: Request, resp: Response): Promise<Response> => {
    const { id } = req.params
    const userID = Number(id)
    await deleteUserService(userID)

    return resp.status(204)
}

export const reactivateUserController = async (req: Request, resp: Response): Promise<Response> => {
    const { id } = req.params

    const reactivatedUser: TUserResponse = await reactivateUserService(Number(id))
    return resp.status(200).json(reactivatedUser)
}