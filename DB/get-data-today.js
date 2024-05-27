require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1
        const currentYear = currentDate.getFullYear();

        const { rows } = await sql`
            SELECT * 
            FROM presensi_pengajar
            WHERE tanggal = ${currentDay}
            AND bulan = ${currentMonth}
            AND tahun = ${currentYear}
        `;
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
