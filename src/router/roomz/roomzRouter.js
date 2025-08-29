
import { Router } from "express";
import {
	getRoomz,
	getRoom,
	postRoom,
	putRoom,
	deleteRoomController
} from "../../controller/roomzController.js";

const roomzRouter = Router();

roomzRouter.get('/', getRoomz);
roomzRouter.get('/:id', getRoom);
roomzRouter.post('/', postRoom);
roomzRouter.put('/:id', putRoom);
roomzRouter.delete('/:id', deleteRoomController);

export default roomzRouter;