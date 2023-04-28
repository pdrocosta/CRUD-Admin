import { Router } from 'express'
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyExists'
import { requestUpdateUserSchema, requestUserSchema } from '../schemas/users.schemas'
import { createUsersController, deleteUserController, listUsersController, reactivateUserController, retriveUserController, updateUserController } from '../controllers/users.controller'
import ensureEmailNotExistsMiddleware from '../middlewares/ensure EmailExists'
import ensureTokenExistsdMiddleware from '../middlewares/ensureTokenIsValid'
import { ensureIdExists } from '../middlewares/ensureIdExists'
import ensureUserIsAdmin from '../middlewares/ensureIsAdmin'
import ensureActiveIsFalse from '../middlewares/ensureActiveIsFalse'
import checkAdminOrOwner from '../middlewares/checkAdmOrOwner'
import checkAdm from '../middlewares/checkAdm'

const userRoutes: Router = Router()

userRoutes.get('', ensureTokenExistsdMiddleware, ensureUserIsAdmin, listUsersController)

userRoutes.get('/profile', ensureTokenExistsdMiddleware, retriveUserController)

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.patch('/:id',
  ensureTokenExistsdMiddleware,
  ensureIdExists,
  ensureBodyIsValidMiddleware(requestUpdateUserSchema),  checkAdminOrOwner,ensureEmailNotExistsMiddleware, updateUserController)
 //     × PATCH /users/:id - Error: Atualizando usuário admin com token de não admin. (30 ms)
 // × PATCH /users/:id - Error: Tentando atualizar usuários com keys inválidas. (13 ms)

userRoutes.put('/:id/recover', ensureTokenExistsdMiddleware, ensureUserIsAdmin, ensureIdExists, ensureActiveIsFalse, reactivateUserController) //  PUT /users/:id/recover - Error: Ativando usuário já ativo.



userRoutes.delete('/:id',
  ensureTokenExistsdMiddleware, ensureIdExists, checkAdm, deleteUserController)
/*
// × // DELETE /users/:id - Error: Deletando usuário admin com token de não admin. (49 ms)
× // DELETE /users/:id - Sucesso: Deletando usuário não admin com token de não admin. (26 ms) */

export default userRoutes

