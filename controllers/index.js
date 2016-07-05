import { Router } from 'express'
import userRouter from './user'
import activityRouter from './activity'
import attachmentRouter from './attachment'

const router = Router()

const apiRouter = Router()
apiRouter.use(userRouter)
apiRouter.use(activityRouter)
apiRouter.use(attachmentRouter)


router.use('/api', apiRouter)

export default router
