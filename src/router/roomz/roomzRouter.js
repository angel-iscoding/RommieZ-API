import { Router } from "express";
import {
	getAllRoomsController,
	getRoomzByIdController,
	getRoomzByTypeController,
	createRoomzController,
	updateRoomzController,
	deleteRoomzController
} from "../../controller/roomzController.js";

const roomzRouter = Router();

// Get all roomz (regardless of type)
roomzRouter.get('/', getAllRoomsController);

// Get roomz by type (studio, apartment, residential_complex)
roomzRouter.get('/type/:type', getRoomzByTypeController);

// Get roomz by id
roomzRouter.get('/:id', getRoomzByIdController);

// Create new roomz
roomzRouter.post('/', createRoomzController);

// Update roomz
roomzRouter.put('/:id', updateRoomzController);

// Delete roomz
roomzRouter.delete('/:id', deleteRoomzController);

export default roomzRouter;