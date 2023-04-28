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

const userRoutes: Router = Router()

userRoutes.get('', ensureTokenExistsdMiddleware, ensureUserIsAdmin, listUsersController)

userRoutes.get('/profile', ensureTokenExistsdMiddleware,  retriveUserController)

userRoutes.post(
  "",
  ensureBodyIsValidMiddleware(requestUserSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.patch('/:id',
  ensureTokenExistsdMiddleware,
  ensureIdExists,
  checkAdminOrOwner, ensureBodyIsValidMiddleware(requestUpdateUserSchema), ensureEmailNotExistsMiddleware, updateUserController)


userRoutes.put('/:id/recover', ensureTokenExistsdMiddleware, ensureEmailNotExistsMiddleware, ensureUserIsAdmin, ensureIdExists,  reactivateUserController)


userRoutes.delete('/:id',
  ensureTokenExistsdMiddleware, ensureIdExists, checkAdminOrOwner, deleteUserController)


export default userRoutes

