const { sql } = require("@vercel/postgres");

export default async function getDataToday(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const { rows } = await sql`
            SELECT * 
            FROM presensi_pengajar
            WHERE tanggal = ${currentDay}
            AND bulan = ${currentMonth}
            AND tahun = ${currentYear}
        `;

        res.status(200).json({ data: rows });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
