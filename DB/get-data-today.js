require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        SELECT * FROM presensi_pengajar WHERE hari = ${(new Date()).getDate()} and bulan = ${(new Date()).getMonth() + 1} and tahun = ${(new Date()).getFullYear()} `;
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
