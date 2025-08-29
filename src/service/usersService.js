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

export const deleteUserById = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
