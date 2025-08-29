
import {
    getAllUsers,
    getUserById,
    checkUserExists,
    checkEmailExists,
    createUser,
    updateUser,
    getUserSocialContacts,
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

// Check if user exists
export const checkUserExistence = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const exists = await checkUserExists(parseInt(id));
        res.status(200).json({ message: "User existence checked", exists });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Check if email is registered
export const checkEmailRegistration = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        const exists = await checkEmailExists(email);
        res.status(200).json({ message: "Email registration checked", isRegistered: exists });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const postUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, username, email, password, city, birthdate, role } = req.body;
        if (!first_name || !last_name || !username || !email || !password || !city || !birthdate || !role) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }
        
        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        
        const userId = await createUser({ first_name, middle_name, last_name, username, email, password, city, birthdate, role });
        res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

export const putUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_name, middle_name, last_name, city, email, birthdate } = req.body;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        if (!first_name || !last_name || !city || !email || !birthdate) {
            return res.status(400).json({ error: "All fields are required (first_name, last_name, city, email, birthdate)" });
        }
        
        // Check if new email already exists (if different from current)
        const currentUser = await getUserById(parseInt(id));
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        if (email !== currentUser.email) {
            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                return res.status(400).json({ error: "Email is already registered by another user" });
            }
        }
        
        const updated = await updateUser(parseInt(id), { first_name, middle_name, last_name, city, email, birthdate });
        if (!updated) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Get user social contacts
export const getUserContacts = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }
        const contacts = await getUserSocialContacts(parseInt(id));
        if (!contacts) {
            return res.status(404).json({ message: "No social contacts found for this user", data: null });
        }
        res.status(200).json({ message: "User contacts retrieved successfully", data: contacts });
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