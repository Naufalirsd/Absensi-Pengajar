require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        await sql`DROP TABLE IF EXISTS presensi_pengajar`;
        console.log("Table dropped");

        await sql`
        CREATE TABLE IF NOT EXISTS presensi_pengajar (
            id SERIAL PRIMARY KEY,
            hari VARCHAR(20) NOT NULL,
            tanggal INT NOT NULL,
            bulan INT NOT NULL,
            tahun INT NOT NULL,
            id_pengajar INT NOT NULL,
            nama VARCHAR(100) NOT NULL,
            jam_datang TIME NOT NULL,
            jam_pulang TIME NOT NULL,
            keterangan VARCHAR(255)
        )
        `;
        console.log("Table created");
    } catch (error) {
        console.log(error);
    }
}

execute();
