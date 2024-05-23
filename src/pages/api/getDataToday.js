const { sql } = require("@vercel/postgres");

export default async function getDataToday(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { rows } = await sql`
            SELECT * 
            FROM presensi_pengajar
            WHERE tanggal = EXTRACT(DAY FROM CURRENT_DATE)
            AND bulan = TO_CHAR(CURRENT_DATE, 'Month')
            AND tahun = EXTRACT(YEAR FROM CURRENT_DATE)
        `;

        res.status(200).json({ message: "Success", data: rows });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
