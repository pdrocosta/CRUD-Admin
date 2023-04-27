import express, { Application } from 'express'
import userRoutes from './routers/users.routes'
import sessionRoutes from './routers/session.routes';
import { handleErrors } from './error';
import "express-async-errors";

const app: Application = express();
app.use(express.json());


app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.use(handleErrors);
export default app
