import {
    getAllRoomz,
    getRoomzById,
    createRoomz,
    updateRoomz,
    deleteRoomz
} from "../service/roomzService.js";


export const getRoomz = async (req, res) => {
    try {
        const roomz = await getAllRoomz();
        if (roomz.length === 0) {
            return res.status(404).json({ message: "No roomz found.", roomz: [] });
        }
        res.status(200).json({ message: "Roomz retrieved successfully", roomz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const getRoom = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const room = await getRoomzById(parseInt(id));
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json({ message: "Room retrieved successfully", room });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const postRoom = async (req, res) => {
    try {
        const { user_id, title, description, address, price, is_available } = req.body;
        if (!user_id || !title || !description || !address || !price || is_available === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const roomId = await createRoomz({ user_id, title, description, address, price, is_available });
        res.status(201).json({ message: "Room created successfully", roomId });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const putRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, title, description, address, price, is_available } = req.body;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        if (!user_id || !title || !description || !address || !price || is_available === undefined) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const updated = await updateRoomz(parseInt(id), { user_id, title, description, address, price, is_available });
        if (!updated) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const deleteRoomController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const deleted = await deleteRoomz(parseInt(id));
        if (!deleted) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
