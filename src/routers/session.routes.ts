import { Router } from 'express'
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyExists'
import { resquestLoginSchema } from '../schemas/session.schemas'
import { loginUserController } from '../controllers/session.controller'
import ensureActiveIsFalse from '../middlewares/ensureActiveIsFalse'
import checkAdminOrOwner from '../middlewares/checkAdmOrOwner'


const sessionRoutes: Router = Router()

sessionRoutes.post('', ensureBodyIsValidMiddleware(resquestLoginSchema), loginUserController)


export default sessionRoutes;