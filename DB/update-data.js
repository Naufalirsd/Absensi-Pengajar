require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
            UPDATE presensi_pengajar 
            SET hari = 28,
                bulan = 5,
                tahun = 2024,
                id_karyawan = 'Saiful',
                jam_datang = '09:00',
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
