import express from 'express';
import mysql from 'mysql2';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Gagal untuk koneksi ke database!');
        return;
    }
    console.log('Berhasil koneksi ke database!');
});

app.post('/contact', (req, res) => {
    console.log('Data diterima dari form:', req.body);

    const { student_name, email, tutor_name, message } = req.body;
    
    if (!student_name || !email || !tutor_name) {
        return res.status(400).send("Nama, email, dan nama guru harus diisi.");
    }

    const sqlQuery = `
        INSERT INTO penyewaan_guru (nama_pemesan, email_pemesan, nama_guru_dipilih, pesan_tambahan)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sqlQuery, [student_name, email, tutor_name, message], (err, result) => {
        if (err) {
            console.error('Error saat menyimpan data:', err);
            return res.status(500).send('Terjadi kesalahan pada server.');
        }

        console.log('Data berhasil disimpan:', result);
        res.status(200).send('Permintaan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});