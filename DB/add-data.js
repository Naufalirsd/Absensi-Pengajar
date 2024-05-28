require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const rows = await sql`
            INSERT INTO presensi_pengajar (hari, bulan, tahun, id_karyawan, jam_datang, keterangan)
            VALUES (01, 5, 2024, 'Fajar', '08:00', 'Terlambat')
            RETURNING *
        `;
        console.log("Data added:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
