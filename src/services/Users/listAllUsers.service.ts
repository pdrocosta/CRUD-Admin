import { QueryResult } from "pg";
import "dotenv/config";
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseAllUsersSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<Array<TUserResponse>> => {

  const queryString: string = `
        SELECT
          *
        FROM
            users;
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );
  const allUsers : TUserResponse[] = responseAllUsersSchema.parse(queryResult.rows[0])

  return allUsers
};

export default listUsersService;

