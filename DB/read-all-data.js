// read-all-presensi-pengajar.js
require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        SELECT * FROM presensi_pengajar
        `;
        console.log("All data:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
