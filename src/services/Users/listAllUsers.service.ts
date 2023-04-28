import { QueryResult } from "pg";
import "dotenv/config";
import { client } from "../../database";
import { TAllUserResponse } from "../../interfaces/users.interfaces";
import { responseAllUsersSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<TAllUserResponse> => {

  const queryString: string = `
        SELECT
          *
        FROM
            users;
    `;

  const queryResult: QueryResult<TAllUserResponse> = await client.query(
    queryString
  );
  const allUsers: TAllUserResponse = responseAllUsersSchema.parse(queryResult.rows)


  return allUsers
};

export default listUsersService;

