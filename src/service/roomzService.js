import pool from "../config/databaseConecction.js";

export const getRoomz = async () => {
    const [rows] = await pool.query(`
        SELECT 
            p.id, p.user_id, p.title, p.description, p.address, p.price, p.is_available, p.published_at
        FROM publications p
    `);
    // Renombrar publications a roomz en la respuesta
    return rows.map(r => ({
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        description: r.description,
        address: r.address,
        price: parseFloat(r.price),
        is_available: !!r.is_available,
        published_at: r.published_at
    }));
};

export const getRoomzById = async (id) => {
    const [rows] = await pool.query(`
        SELECT 
            p.id, p.user_id, p.title, p.description, p.address, p.price, p.is_available, p.published_at
        FROM publications p
        WHERE p.id = ?
    `, [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        description: r.description,
        address: r.address,
        price: parseFloat(r.price),
        is_available: !!r.is_available,
        published_at: r.published_at
    };
};

export const createRoomz = async (roomz) => {
    const { user_id, title, description, address, price, is_available } = roomz;
    const [result] = await pool.query(
        `INSERT INTO publications (user_id, title, description, address, price, is_available) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, title, description, address, price, is_available]
    );
    return result.insertId;
};

export const updateRoomz = async (id, roomz) => {
    const { user_id, title, description, address, price, is_available } = roomz;
    const [result] = await pool.query(
        `UPDATE publications SET user_id=?, title=?, description=?, address=?, price=?, is_available=? WHERE id=?`,
        [user_id, title, description, address, price, is_available, id]
    );
    return result.affectedRows > 0;
};

export const deleteRoomzById = async (id) => {
    const [result] = await pool.query("DELETE FROM publications WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
