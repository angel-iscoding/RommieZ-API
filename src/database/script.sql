DROP DATABASE IF EXISTS RoomieZ;
CREATE DATABASE RoomieZ;
USE RoomieZ;

-- USERS
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
	city VARCHAR(100) NOT NULL,
	birthdate DATE NOT NULL,
    `role` ENUM('landlord', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- roomz 
CREATE TABLE roomz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- landlord who posts
    title VARCHAR(200) NOT NULL,
	subtitle VARCHAR(200) NOT NULL,
	details VARCHAR(100) NOT NULL, 
    `description` TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    roomz_type ENUM('studio', 'apartment', 'residential_complex') NOT NULL,
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
    FOREIGN KEY (publication_id) REFERENCES roomz(id)
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
/*CREATE TABLE reviews (
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
);*/
-- TABLA CONTACT CON URLs DE REDES SOCIALES
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    -- PHONE
    phone_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    
    -- URLs DE REDES SOCIALES
    instagram_url VARCHAR(255),
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    
    -- CONTROL DE TIEMPO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- FOREIGN KEY WITH USERS
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    -- FORMAT VALIDATIONS FOR PHONES
    CONSTRAINT chk_phone_format 
        CHECK (phone_number IS NULL OR phone_number REGEXP '^[+]?[0-9\\s\\-\\(\\)]+$'),
        
    CONSTRAINT chk_whatsapp_format 
        CHECK (whatsapp_number IS NULL OR whatsapp_number REGEXP '^[+]?[0-9\\s\\-\\(\\)]+$'),
        
    -- URL VALIDATIONS - BASIC FORMAT
    CONSTRAINT chk_instagram_url 
        CHECK (instagram_url IS NULL OR instagram_url REGEXP '^https?://(www\\.)?(instagram\\.com|instagr\\.am)/[a-zA-Z0-9._]+/?$'),
        
    CONSTRAINT chk_facebook_url 
        CHECK (facebook_url IS NULL OR facebook_url REGEXP '^https?://(www\\.)?facebook\\.com/[a-zA-Z0-9._]+/?$'),
        
    CONSTRAINT chk_twitter_url 
        CHECK (twitter_url IS NULL OR twitter_url REGEXP '^https?://(www\\.)?(twitter\\.com|x\\.com)/[a-zA-Z0-9_]+/?$'),
        
    CONSTRAINT chk_tiktok_url 
        CHECK (tiktok_url IS NULL OR tiktok_url REGEXP '^https?://(www\\.)?tiktok\\.com/@[a-zA-Z0-9._]+/?$'),
        
    CONSTRAINT chk_linkedin_url 
        CHECK (linkedin_url IS NULL OR linkedin_url REGEXP '^https?://(www\\.)?linkedin\\.com/in/[a-zA-Z0-9\\-]+/?$'),
        
    -- CONSTRAINT PARA ASEGURAR AL MENOS UN MEDIO DE CONTACTO
    CONSTRAINT chk_at_least_one_contact 
        CHECK (phone_number IS NOT NULL OR whatsapp_number IS NOT NULL OR 
               instagram_url IS NOT NULL OR facebook_url IS NOT NULL OR 
               twitter_url IS NOT NULL OR tiktok_url IS NOT NULL OR 
               linkedin_url IS NOT NULL));


INSERT INTO users (first_name, middle_name, last_name, username, email, `password`, city, birthdate, `role`)
VALUES 
('John', 'Michael', 'Doe', 'johndoe', 'john.doe@email.com', 'hashedpass123', 'Barranquilla', '1998-05-15', 'student'),
('Anna', NULL, 'Smith', 'annasmith', 'anna.smith@email.com', 'hashedpass456', 'Barranquilla', '1985-03-20', 'landlord'),
('Carlos', 'Andres', 'Lopez', 'carloslopez', 'carlos.lopez@email.com', 'hashedpass789', 'Barranquilla', '1999-11-10', 'student');

-- roomz
INSERT INTO roomz (user_id, title, subtitle, details, `description`, address, price, roomz_type, is_available)
VALUES
(2, 'Room near University', 'Cozy student accommodation', 'Internet, utilities included', 'A cozy room close to campus with internet and utilities included.', '123 Main St, City', 350.00, 'apartment', TRUE),
(2, 'Shared apartment', 'Shared living space', 'Utilities included', 'One bed available in a shared apartment, utilities included.', '456 College Ave, City', 250.00, 'apartment', TRUE),
(2, 'Studio apartment downtown', 'Modern city center studio', 'Fully furnished', 'Modern studio in city center, fully furnished with all amenities.', '789 Downtown Blvd, City', 450.00, 'studio', TRUE);

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

-- DATOS DE CONTACTO CON URLs
INSERT INTO contact (user_id, phone_number, whatsapp_number, instagram_url, facebook_url, twitter_url, tiktok_url, linkedin_url)
VALUES
(1, 
 '+57 300 123 4567', 
 '+57 300 123 4567',
 'https://www.instagram.com/john_doe_2025',
 'https://www.facebook.com/john.doe.student',
 'https://www.twitter.com/johndoe2025',
 'https://www.tiktok.com/@john_doe_official',
 'https://www.linkedin.com/in/john-doe-student'
),
(2, 
 '+57 305 987 6543',
 '+57 305 987 6543', 
 'https://www.instagram.com/anna_rooms_barranquilla',
 'https://www.facebook.com/anna.smith.landlord',
 NULL,
 NULL,
 'https://www.linkedin.com/in/anna-smith-properties'
),
(3, 
 NULL,
 '+57 310 456 7890',
 'https://www.instagram.com/carlos_lopez_univ',
 NULL,
 'https://www.x.com/carloslopez2025',
 'https://www.tiktok.com/@carlos_student_life',
 NULL
);

-- ==========================================
-- CONSULTAS DE VERIFICACIÓN Y VISUALIZACIÓN
-- ==========================================

-- Mostrar todas las tablas creadas
SHOW TABLES;

-- Ver todos los usuarios
SELECT * FROM users;

-- Ver todas las publicaciones con el nombre del landlord
SELECT p.*, u.first_name AS landlord_first_name, u.last_name AS landlord_last_name
FROM roomz p
JOIN users u ON p.user_id = u.id;

-- Ver todas las reservas con datos del estudiante y publicación
SELECT b.*, u.first_name AS student_first_name, u.last_name AS student_last_name, p.title AS publication_title
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN roomz p ON b.publication_id = p.id;

-- Ver todas las transacciones con datos de la reserva y usuario
SELECT t.*, b.user_id, u.first_name AS student_first_name, u.last_name AS student_last_name
FROM transactions t
JOIN bookings b ON t.booking_id = b.id
JOIN users u ON b.user_id = u.id;

