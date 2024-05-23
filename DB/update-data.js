// update-presensi-pengajar.js
require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
            UPDATE presensi_pengajar 
            SET hari = 'Selasa',
                tanggal = 23,
                bulan = 'Mei',
                tahun = 2024,
                id_pengajar = 2,
                nama = 'Nama Pengajar Baru',
                jam_datang = '09:00:00',
                jam_pulang = '17:00:00',
                keterangan = 'Terlambat'
            WHERE id = 1
            RETURNING *
        `;
        console.log("Data updated:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
