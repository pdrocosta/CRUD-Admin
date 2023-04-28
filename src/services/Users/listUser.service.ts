import { QueryResult } from "pg";
import "dotenv/config";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import format from "pg-format";

const listUserInfosService = async (id: Number): Promise<TUserResponse> => {
    const userId = Number(id)
    const queryString: string = format(
        `
        SELECT
          *
        FROM
            users
            WHERE id= %L;
    `, [userId]
    );


    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryString
    );
    const userInfos: TUserResponse = responseUserSchema.parse(queryResult.rows[0])

    return userInfos
};
export default listUserInfosService;

