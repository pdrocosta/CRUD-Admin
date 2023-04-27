import { Router } from 'express'
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyExists'
import checkLoginInfos from '../middlewares/ensureLoginInfos'
import createSessionService from '../services/Users/loginUser.service'
import { resquestLoginSchema } from '../schemas/session.schemas'


const sessionRoutes: Router = Router()

sessionRoutes.post('', ensureBodyIsValidMiddleware(resquestLoginSchema), checkLoginInfos, createSessionService)

export default sessionRoutes;