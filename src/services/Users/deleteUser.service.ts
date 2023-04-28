import { QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import format from "pg-format";

export const deleteUserService = async (id: number): Promise<TUserResponse> => {

    const queryString: string = format(
        `
    UPDATE
        users
    SET
        active= false
    WHERE   
        id=(%L)
    RETURNING *;
  `, id

    );
    const queryResult: QueryResult = await client.query(queryString);
    const deletedUser = responseUserSchema.parse(queryResult.rows[0])
    return deletedUser
};
