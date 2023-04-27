import format from "pg-format";
import { TUserRequest, TUserResponse } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import { hash } from "bcryptjs"

const createUserService = async (
  userInfos: TUserRequest
): Promise<TUserResponse> => {

  const hashPasswoard: string = await hash(userInfos.password, 10)

  userInfos.password = hashPasswoard

  const queryString: string = format(
    `
                INSERT INTO
                    users(%I)
                VALUES (%L)
                RETURNING
                    *;
            `,
    ...Object.keys(userInfos),
    ...Object.values(userInfos)
  );


  const queryResult: QueryResult<TUserResponse> = await client.query(queryString);

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};


export default createUserService;