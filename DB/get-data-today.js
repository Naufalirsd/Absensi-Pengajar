// get-data-today.js
require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        SELECT * FROM presensi_pengajar
        WHERE tanggal = EXTRACT(DAY FROM CURRENT_DATE)
        AND bulan = TO_CHAR(CURRENT_DATE, 'Month')
        AND tahun = EXTRACT(YEAR FROM CURRENT_DATE)
        `;
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
