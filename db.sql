CREATE DATABASE uas_pwd_2025;

USE uas_pwd_2025;

CREATE TABLE penyewaan_guru (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_pemesan VARCHAR(255) NOT NULL,
    email_pemesan VARCHAR(255) NOT NULL,
    nama_guru_dipilih VARCHAR(255) NOT NULL,
    pesan_tambahan TEXT,
    tanggal_submit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);