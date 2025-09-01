
import {
    getAllUsers,
    getUserById,
    checkUserExists,
    checkEmailExists,
    createUser,
    updateUser,
    getUserSocialContacts,
    createUserSocialContacts,
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
        
        const id = await createUser({ first_name, middle_name, last_name, username, email, password, city, birthdate, role });
        res.status(201).json({ message: "User created successfully", id });
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

// Create or update user social contacts
export const postUserContacts = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "You need to enter a valid numeric id" });
        }

        // Check if user exists
        const userExists = await checkUserExists(parseInt(id));
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const {
            phone_number,
            whatsapp_number,
            instagram_url,
            facebook_url,
            twitter_url,
            tiktok_url,
            linkedin_url
        } = req.body;

        // Validate that at least one contact method is provided
        if (!phone_number && !whatsapp_number && !instagram_url && 
            !facebook_url && !twitter_url && !tiktok_url && !linkedin_url) {
            return res.status(400).json({ 
                error: "At least one contact method must be provided" 
            });
        }

        const contactData = {
            phone_number: phone_number || null,
            whatsapp_number: whatsapp_number || null,
            instagram_url: instagram_url || null,
            facebook_url: facebook_url || null,
            twitter_url: twitter_url || null,
            tiktok_url: tiktok_url || null,
            linkedin_url: linkedin_url || null
        };

        const result = await createUserSocialContacts(parseInt(id), contactData);
        
        if (result) {
            // Get the updated/created contacts to return them
            const updatedContacts = await getUserSocialContacts(parseInt(id));
            res.status(201).json({ 
                message: "User contacts created/updated successfully", 
                data: updatedContacts 
            });
        } else {
            res.status(500).json({ error: "Failed to create/update user contacts" });
        }

    } catch (error) {
        // Handle specific database constraint errors
        if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
            if (error.sqlMessage.includes('chk_instagram_url')) {
                return res.status(400).json({ error: "Invalid Instagram URL format" });
            }
            if (error.sqlMessage.includes('chk_facebook_url')) {
                return res.status(400).json({ error: "Invalid Facebook URL format" });
            }
            if (error.sqlMessage.includes('chk_twitter_url')) {
                return res.status(400).json({ error: "Invalid Twitter/X URL format" });
            }
            if (error.sqlMessage.includes('chk_tiktok_url')) {
                return res.status(400).json({ error: "Invalid TikTok URL format" });
            }
            if (error.sqlMessage.includes('chk_linkedin_url')) {
                return res.status(400).json({ error: "Invalid LinkedIn URL format" });
            }
            if (error.sqlMessage.includes('chk_phone_format')) {
                return res.status(400).json({ error: "Invalid phone number format" });
            }
            if (error.sqlMessage.includes('chk_whatsapp_format')) {
                return res.status(400).json({ error: "Invalid WhatsApp number format" });
            }
            return res.status(400).json({ error: "Invalid contact data format" });
        }
        
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