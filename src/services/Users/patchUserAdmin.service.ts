import format from 'pg-format'
import {
    TUserResponse,
    TUserUpdateRequest,
} from '../../interfaces/users.interfaces'
import { QueryResult } from 'pg'
import { client } from '../../database'
import { responseUpdatedUserSchema } from '../../schemas/users.schemas'

export const updateUserInfoService = async (
    userData: TUserUpdateRequest,
    id: number
): Promise<TUserResponse> => {

    console.log(userData, id)
    const queryString = format(
        `
            UPDATE users
                SET(%I) = ROW(%L)
            WHERE
                id = (%L)
            RETURNING
                *
        `,
        Object.keys(userData),
        Object.values(userData),
        [id]
    )

        console.log(queryString)

    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryString
    )
    console.log(queryResult)

    const updatedUser = responseUpdatedUserSchema.parse(queryResult.rows[0])
    console.log(updatedUser)

    return updatedUser
}





