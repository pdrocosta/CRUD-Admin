import express, { Application, json } from 'express'
import userRoutes from './routers/users.routes'

const app: Application = express()
app.use(express.json())

app.use('/user', userRoutes)

export default app
