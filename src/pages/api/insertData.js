const { sql } = require("@vercel/postgres");

export default async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const {
            hari,
            tanggal,
            bulan,
            tahun,
            id_pengajar,
            nama,
            jam_datang,
            jam_pulang,
            keterangan,
        } = req.body;

        if (
            !hari ||
            !tanggal ||
            !bulan ||
            !tahun ||
            !id_pengajar ||
            !nama ||
            !jam_datang ||
            !jam_pulang
        ) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        const { rows } = await sql`
            INSERT INTO presensi_pengajar (hari, tanggal, bulan, tahun, id_pengajar, nama, jam_datang, jam_pulang, keterangan)
            VALUES (${hari}, ${tanggal}, ${bulan}, ${tahun}, ${id_pengajar}, ${nama}, ${jam_datang}, ${jam_pulang}, ${keterangan})
            RETURNING *
        `;

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
