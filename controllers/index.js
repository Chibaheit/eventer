import { Router } from 'express'
import userRouter from './user'
import activityRouter from './activity'

const router = Router()

const apiRouter = Router()
apiRouter.use(userRouter)
apiRouter.use(activityRouter)

router.use('/api', apiRouter)

export default router
