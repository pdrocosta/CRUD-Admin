import { z } from 'zod'
import { requestUpdateUserSchema, requestUserSchema, responseUserSchema, userSchema } from '../schemas/users.schemas'


type TUser = z.infer<typeof userSchema>

type TUserRequest = z.infer<typeof requestUserSchema>

type TUserResponse = z.infer<typeof responseUserSchema>

type TUserUpdateRequest = z.infer<typeof requestUpdateUserSchema>

export { TUser, TUserRequest, TUserResponse, TUserUpdateRequest }