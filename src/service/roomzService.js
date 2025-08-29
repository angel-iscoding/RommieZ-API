import pool from "../config/databaseConecction.js";

export const getAllRoomz = async () => {
    const [rows] = await pool.query(`
        SELECT 
            r.id, r.user_id, r.title, r.subtitle, r.details, r.description, r.address, r.price, r.roomz_type, r.is_available, r.published_at
        FROM roomz r
    `);
    return rows.map(r => ({
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        subtitle: r.subtitle,
        details: r.details,
        description: r.description,
        address: r.address,
        price: parseFloat(r.price),
        roomz_type: r.roomz_type,
        is_available: !!r.is_available,
        published_at: r.published_at
    }));
};

export const getRoomzById = async (id) => {
    const [rows] = await pool.query(`
        SELECT 
            r.id, r.user_id, r.title, r.subtitle, r.details, r.description, r.address, r.price, r.roomz_type, r.is_available, r.published_at
        FROM roomz r
        WHERE r.id = ?
    `, [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        subtitle: r.subtitle,
        details: r.details,
        description: r.description,
        address: r.address,
        price: parseFloat(r.price),
        roomz_type: r.roomz_type,
        is_available: !!r.is_available,
        published_at: r.published_at
    };
};

export const getRoomzByType = async (roomzType) => {
    const [rows] = await pool.query(`
        SELECT 
            r.id, r.user_id, r.title, r.subtitle, r.details, r.description, r.address, r.price, r.roomz_type, r.is_available, r.published_at
        FROM roomz r
        WHERE r.roomz_type = ?
    `, [roomzType]);
    return rows.map(r => ({
        id: r.id,
        user_id: r.user_id,
        title: r.title,
        subtitle: r.subtitle,
        details: r.details,
        description: r.description,
        address: r.address,
        price: parseFloat(r.price),
        roomz_type: r.roomz_type,
        is_available: !!r.is_available,
        published_at: r.published_at
    }));
};

export const createRoomz = async (roomz) => {
    const { user_id, title, subtitle, details, description, address, price, roomz_type, is_available } = roomz;
    const [result] = await pool.query(
        `INSERT INTO roomz (user_id, title, subtitle, details, description, address, price, roomz_type, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, title, subtitle, details, description, address, price, roomz_type, is_available]
    );
    return result.insertId;
};

export const updateRoomz = async (id, roomz) => {
    const { user_id, title, subtitle, details, description, address, price, roomz_type, is_available } = roomz;
    const [result] = await pool.query(
        `UPDATE roomz SET user_id=?, title=?, subtitle=?, details=?, description=?, address=?, price=?, roomz_type=?, is_available=? WHERE id=?`,
        [user_id, title, subtitle, details, description, address, price, roomz_type, is_available, id]
    );
    return result.affectedRows > 0;
};

export const deleteRoomzById = async (id) => {
    const [result] = await pool.query("DELETE FROM roomz WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
