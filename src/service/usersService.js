import pool from "../config/databaseConecction.js";

export const getAllUsers = async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
};

export const checkUserExists = async (id) => {
    const [rows] = await pool.query("SELECT id FROM users WHERE id = ?", [id]);
    return rows.length > 0;
};

export const checkEmailExists = async (email) => {
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    return rows.length > 0;
};

export const createUser = async (user) => {
    const { first_name, middle_name, last_name, username, email, password, city, birthdate, role } = user;
    const [result] = await pool.query(
        "INSERT INTO users (first_name, middle_name, last_name, username, email, password, city, birthdate, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [first_name, middle_name, last_name, username, email, password, city, birthdate, role]
    );
    return result.insertId;
};

export const updateUser = async (id, user) => {
    const { first_name, middle_name, last_name, city, email, birthdate } = user;
    const [result] = await pool.query(
        "UPDATE users SET first_name=?, middle_name=?, last_name=?, city=?, email=?, birthdate=? WHERE id=?",
        [first_name, middle_name, last_name, city, email, birthdate, id]
    );
    return result.affectedRows > 0;
};

export const getUserSocialContacts = async (userId) => {
    const [rows] = await pool.query("SELECT * FROM contact WHERE user_id = ?", [userId]);
    return rows[0];
};

export const createUserSocialContacts = async (userId, contactData) => {
    const { 
        phone_number, 
        whatsapp_number, 
        instagram_url, 
        facebook_url, 
        twitter_url, 
        tiktok_url, 
        linkedin_url 
    } = contactData;
    
    // Check if user already has contacts
    const existingContacts = await getUserSocialContacts(userId);
    
    if (existingContacts) {
        // Update existing contacts
        const [result] = await pool.query(
            `UPDATE contact 
             SET phone_number=?, whatsapp_number=?, instagram_url=?, facebook_url=?, 
                 twitter_url=?, tiktok_url=?, linkedin_url=?, updated_at=CURRENT_TIMESTAMP 
             WHERE user_id=?`,
            [phone_number, whatsapp_number, instagram_url, facebook_url, 
             twitter_url, tiktok_url, linkedin_url, userId]
        );
        return result.affectedRows > 0;
    } else {
        // Create new contacts
        const [result] = await pool.query(
            `INSERT INTO contact (user_id, phone_number, whatsapp_number, instagram_url, 
                                facebook_url, twitter_url, tiktok_url, linkedin_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, phone_number, whatsapp_number, instagram_url, facebook_url, 
             twitter_url, tiktok_url, linkedin_url]
        );
        return result.insertId;
    }
};

export const deleteUserById = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
