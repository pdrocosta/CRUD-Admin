import { Router } from 'express'
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyExists'
import checkLoginInfos from '../middlewares/ensureLoginInfos'
import { resquestLoginSchema } from '../schemas/session.schemas'
import { loginUserController } from '../controllers/session.controller'
import ensureActiveIsFalse from '../middlewares/ensureActiveIsFalse'


const sessionRoutes: Router = Router()

sessionRoutes.post('', ensureBodyIsValidMiddleware(resquestLoginSchema), checkLoginInfos, loginUserController)

export default sessionRoutes;