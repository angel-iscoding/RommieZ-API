DROP DATABASE IF EXISTS RoomieZ;
CREATE DATABASE RoomieZ;
USE RoomieZ;

-- SHOW DATA

SHOW TABLES;

-- CONSULTAS PERSONALIZADAS PARA VISUALIZAR DATOS

-- Ver todos los usuarios
SELECT * FROM users;

-- Ver todas las publicaciones con el nombre del landlord
SELECT p.*, u.first_name AS landlord_first_name, u.last_name AS landlord_last_name
FROM publications p
JOIN users u ON p.user_id = u.id;

-- Ver todas las reservas con datos del estudiante y la publicación
SELECT b.*, u.first_name AS student_first_name, u.last_name AS student_last_name, p.title AS publication_title
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN publications p ON b.publication_id = p.id;

-- Ver todas las transacciones con datos de la reserva y usuario
SELECT t.*, b.user_id, u.first_name AS student_first_name, u.last_name AS student_last_name
FROM transactions t
JOIN bookings b ON t.booking_id = b.id
JOIN users u ON b.user_id = u.id;

-- Ver todas las reseñas con datos del usuario y publicación
SELECT r.*, u.first_name AS reviewer_first_name, u.last_name AS reviewer_last_name, p.title AS publication_title
FROM reviews r
JOIN users u ON r.user_id = u.id
JOIN bookings b ON r.booking_id = b.id
JOIN publications p ON b.publication_id = p.id;

-- USERS
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('landlord', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- PUBLICATIONS 
CREATE TABLE publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- landlord who posts
    title VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- BOOKINGS 
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    publication_id INT NOT NULL,
    user_id INT NOT NULL, -- student who books
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    `status` ENUM('pending', 'confirmed', 'canceled', 'completed') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (publication_id) REFERENCES publications(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- TRANSACTIONS 
CREATE TABLE transactions (
   id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('card', 'nequi', 'daviplata', 'cash') NOT NULL,
    `status` ENUM('pending', 'paid', 'failed') NOT NULL,
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- REVIEWS 
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL, -- value 1-5, validation at app level
    `comment` TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO users (first_name, middle_name, last_name, username, email, `password`, `role`)
VALUES 
('John', 'Michael', 'Doe', 'johndoe', 'john.doe@email.com', 'hashedpass123', 'student'),
('Anna', NULL, 'Smith', 'annasmith', 'anna.smith@email.com', 'hashedpass456', 'landlord'),
('Carlos', 'Andres', 'Lopez', 'carloslopez', 'carlos.lopez@email.com', 'hashedpass789', 'student');

-- PUBLICATIONS
INSERT INTO publications (user_id, title, `description`, address, price, is_available)
VALUES
(2, 'Room near University', 'A cozy room close to campus with internet and utilities included.', '123 Main St, City', 350.00, TRUE),
(2, 'Shared apartment', 'One bed available in a shared apartment, utilities included.', '456 College Ave, City', 250.00, TRUE);

-- BOOKINGS
INSERT INTO bookings (publication_id, user_id, start_date, end_date, status)
VALUES
(1, 1, '2025-09-01', '2025-12-15', 'confirmed'),
(2, 3, '2025-09-10', '2025-10-10', 'pending');

-- TRANSACTIONS
INSERT INTO transactions (booking_id, amount, payment_method, status)
VALUES
(1, 350.00, 'nequi', 'paid'),
(2, 250.00, 'card', 'pending');

-- REVIEWS
INSERT INTO reviews (booking_id, user_id, rating, comment)
VALUES
(1, 1, 5, 'The room was excellent, very clean and close to the university.'),
(1, 1, 4, 'Everything was good but could improve internet speed.');



