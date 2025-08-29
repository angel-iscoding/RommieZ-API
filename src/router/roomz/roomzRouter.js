import { Router } from "express";
import {
	getAllRoomz,
	getOneRoomz,
	postRoomz,
	putRoomz,
	deleteRoomz
} from "../../controller/roomzController.js";

const roomzRouter = Router();

roomzRouter.get('/', getAllRoomz);
roomzRouter.get('/:id', getOneRoomz);
roomzRouter.post('/', postRoomz);
roomzRouter.put('/:id', putRoomz);
roomzRouter.delete('/:id', deleteRoomz);

export default roomzRouter;