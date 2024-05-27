require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const rows = await sql`
            INSERT INTO presensi_pengajar (hari, tanggal, bulan, tahun, id_karyawan, nama, jam_datang, jam_pulang, keterangan)
            VALUES ('Senin', 27, 5, 2024, 1, 'Nama Pengajar', '08:00:00', '16:00:00', 'Normal')
            RETURNING *
        `;
        console.log("Data added:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
