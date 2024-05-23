// delete-all-presensi-pengajar.js
require("dotenv").config({ path: ".env.development.local" });
const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        DELETE FROM presensi_pengajar
        RETURNING *
        `;
        console.log("Data deleted:", rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
