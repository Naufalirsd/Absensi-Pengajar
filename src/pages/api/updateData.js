const { sql } = require("@vercel/postgres");

export default async function updateData(req, res) {
    try {
        if (req.method !== "PUT") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const {
            id,
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
            !id ||
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
            UPDATE presensi_pengajar 
            SET hari = ${hari},
                tanggal = ${tanggal},
                bulan = ${bulan},
                tahun = ${tahun},
                id_pengajar = ${id_pengajar},
                nama = ${nama},
                jam_datang = ${jam_datang},
                jam_pulang = ${jam_pulang},
                keterangan = ${keterangan}
            WHERE id = ${id}
            RETURNING *
        `;

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}
