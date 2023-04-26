import { QueryResult } from "pg";
import "dotenv/config";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const listUserInfosService = async (id: Number): Promise<TUserResponse> => {

    const queryString: string = `
        SELECT
          *
        FROM
            users;
            WHERE id=$1
    `;

    const queryResult: QueryResult<TUserResponse> = await client.query(
        queryString, [id]
    );
    const userInfos: TUserResponse = responseUserSchema.parse(queryResult.rows[0])

    return userInfos
};
export default listUserInfosService;

