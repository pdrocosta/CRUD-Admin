import { z } from 'zod'
import { requestUpdateUserSchema, requestUserSchema, responseAllUsersSchema, responseUserSchema, userSchema } from '../schemas/users.schemas'


type TUser = z.infer<typeof userSchema>

type TUserRequest = z.infer<typeof requestUserSchema>

type TUserResponse = z.infer<typeof responseUserSchema>

type TAllUserResponse = z.infer<typeof responseAllUsersSchema>

type TUserUpdateRequest = z.infer<typeof requestUpdateUserSchema>

export { TUser, TUserRequest, TUserResponse, TUserUpdateRequest, TAllUserResponse }