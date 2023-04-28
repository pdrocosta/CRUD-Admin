import { QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import { AppError } from "../../error";
import format from "pg-format";

export const reactivateUserService = async (id: number): Promise<TUserResponse> => {

    const queryString: string = format(`
        
        UPDATE
        users
         SET
        active= true
         WHERE   
        id = (%L) AND active = false
    RETURNING *;
  `, id
    )

    const queryResult: QueryResult = await client.query(queryString);

    const reactivatedUser = responseUserSchema.parse(queryResult.rows[0])

    if (queryResult.rowCount === 0) {
        throw new AppError("User already active", 400);
    }

    return reactivatedUser;
};

