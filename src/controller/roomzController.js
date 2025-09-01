import {
    getAllRoomz,
    getRoomzById,
    getRoomzByType,
    createRoomz,
    updateRoomz,
    deleteRoomzById,
    getRoomzByUserId
} from "../service/roomzService.js";

export const getAllRoomsController = async (req, res) => {
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

export const getRoomzByTypeController = async (req, res) => {
    try {
        const { type } = req.params;
        const validTypes = ['studio', 'apartment', 'residential_complex'];
        
        if (!validTypes.includes(type)) {
            return res.status(400).json({ 
                error: "Invalid roomz type. Valid types are: studio, apartment, residential_complex" 
            });
        }
        
        const roomz = await getRoomzByType(type);
        if (roomz.length === 0) {
            return res.status(404).json({ message: `No ${type} roomz found.`, roomz: [] });
        }
        res.status(200).json({ message: `${type} roomz retrieved successfully`, roomz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const getRoomzByUserIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const roomz = await getRoomzByUserId(parseInt(id));
        if (roomz.length === 0) {
            return res.status(404).json({ message: "No roomz found for this user.", roomz: [] });
        }
        res.status(200).json({ message: "Roomz for user retrieved successfully", roomz });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const getRoomzByIdController = async (req, res) => {
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


export const createRoomzController = async (req, res) => {
    try {
        const { user_id, title, subtitle, details, description, address, price, roomz_type, is_available } = req.body;
        const validTypes = ['studio', 'apartment', 'residential_complex'];
        
        if (!user_id || !title || !subtitle || !details || !description || !address || !price || !roomz_type || is_available === undefined) {
            return res.status(400).json({ error: "All fields are required (user_id, title, subtitle, details, description, address, price, roomz_type, is_available)" });
        }
        
        if (!validTypes.includes(roomz_type)) {
            return res.status(400).json({ 
                error: "Invalid roomz type. Valid types are: studio, apartment, residential_complex" 
            });
        }
        
        const id = await createRoomz({ user_id, title, subtitle, details, description, address, price, roomz_type, is_available });
        res.status(201).json({ message: "Room created successfully", id });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const updateRoomzController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, subtitle, details, description, address, price, roomz_type, is_available } = req.body;
        const validTypes = ['studio', 'apartment', 'residential_complex'];
        
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        if (!title || !subtitle || !details || !description || !address || !price || !roomz_type || is_available === undefined) {
            return res.status(400).json({ error: "All fields are required (title, subtitle, details, description, address, price, roomz_type, is_available)" });
        }
        
        if (!validTypes.includes(roomz_type)) {
            return res.status(400).json({ 
                error: "Invalid roomz type. Valid types are: studio, apartment, residential_complex" 
            });
        }
        
        // Primero verificamos que la habitación existe y obtenemos su user_id
        const existingRoom = await getRoomzById(parseInt(id));
        if (!existingRoom) {
            return res.status(404).json({ error: "Room not found" });
        }
        
        const updated = await updateRoomz(parseInt(id), { 
            user_id: existingRoom.user_id, // Mantenemos el user_id original
            title, 
            subtitle, 
            details, 
            description, 
            address, 
            price, 
            roomz_type, 
            is_available 
        });
        
        res.status(200).json({ message: "Room updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};


export const deleteRoomzController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const deleted = await deleteRoomzById(parseInt(id));
        if (!deleted) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
