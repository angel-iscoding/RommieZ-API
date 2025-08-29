
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById
} from "../service/usersService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found.", data: [] });
        }
        res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const user = await getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", data: user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const postUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, username, email, password, role } = req.body;
        if (!first_name || !last_name || !username || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const userId = await createUser({ first_name, middle_name, last_name, username, email, password, role });
        res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const putUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_name, middle_name, last_name, username, email, password, role } = req.body;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        if (!first_name || !last_name || !username || !email || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const updated = await updateUser(parseInt(id), { first_name, middle_name, last_name, username, email, password, role });
        if (!updated) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const deleted = await deleteUserById(parseInt(id));
        if (!deleted) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};