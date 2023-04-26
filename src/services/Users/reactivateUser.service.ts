import { QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

export const reactivateUserService = async (id: number): Promise<TUserResponse> => {

    const queryString = `
    UPDATE
        users
    SET
        active= true
    WHERE   
        id=$1
    RETURNING *;
  `;
    const queryResult: QueryResult = await client.query(queryString, [id]);

    const reactivatedUser = responseUserSchema.parse(queryResult.rows[0])

    return reactivatedUser;
};

