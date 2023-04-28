
import { z } from 'zod'

const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(20),
  email: z.string().max(100).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const requestCreateUserSchema = userSchema
  .partial()
  .omit({ id: true })
  .merge(
    z.object({
      admin: z.boolean().optional(),
      active: z.boolean().default(true).optional(),
    })
  );

const responseCreatedUserSchema = userSchema
  .omit({ password: true });

const requestUpdateUserSchema = userSchema
  .partial()
  .omit({ id: true, admin: true, active: true });

export const responseUpdatedUserSchema = userSchema
  .omit({ password: true });


const requestUserSchema = userSchema.omit({ id: true })

const responseUserSchema = userSchema.omit({ password: true })

const responseAllUsersSchema = z.array(responseUserSchema)

export { userSchema, requestUserSchema, responseAllUsersSchema, responseUserSchema, requestCreateUserSchema, responseCreatedUserSchema, requestUpdateUserSchema }
