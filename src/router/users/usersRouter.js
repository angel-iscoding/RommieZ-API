import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from '../../controller/usersController.js'

const usersRouter = Router();

usersRouter.get('/', getUsers)

usersRouter.get('/:id', getUser);

usersRouter.post('/', postUser);

usersRouter.put(':id', putUser);

usersRouter.delete(':id', deleteUser)

export default usersRouter;