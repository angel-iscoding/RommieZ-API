import pool from "../config/databaseConecction.js";

export const getAllUsers = async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
};

export const createUser = async (user) => {
    const { first_name, middle_name, last_name, username, email, password, role } = user;
    const [result] = await pool.query(
        "INSERT INTO users (first_name, middle_name, last_name, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [first_name, middle_name, last_name, username, email, password, role]
    );
    return result.insertId;
};

export const updateUser = async (id, user) => {
    const { first_name, middle_name, last_name, username, email, password, role } = user;
    const [result] = await pool.query(
        "UPDATE users SET first_name=?, middle_name=?, last_name=?, username=?, email=?, password=?, role=? WHERE id=?",
        [first_name, middle_name, last_name, username, email, password, role, id]
    );
    return result.affectedRows > 0;
};

export const deleteUserById = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
