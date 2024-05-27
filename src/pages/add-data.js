import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 16px;
    color: #495057;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
`;

export default function AddData() {
    const [hari, setHari] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [bulan, setBulan] = useState("");
    const [tahun, setTahun] = useState("");
    const [id_pengajar, setIdPengajar] = useState("");
    const [nama, setNama] = useState("");
    const [jam_datang, setJamDatang] = useState("");
    const [jam_pulang, setJamPulang] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            hari: hari,
            tanggal: parseInt(tanggal),
            bulan: parseInt(bulan),
            tahun: parseInt(tahun),
            id_pengajar: parseInt(id_pengajar),
            nama: nama,
            jam_datang: jam_datang,
            jam_pulang: jam_pulang,
            keterangan: keterangan,
        };

        fetch(`/api/insertData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(
                            errorData.message || "Gagal menambah data"
                        );
                    });
                }
                return response.json();
            })
            .then((json) => {
                alert("Data berhasil ditambah");
                router.push("/");
            })
            .catch((err) => {
                console.error("Error saat menambah data:", err.message);
                alert("Error: " + err.message);
            });
    };

    return (
        <Container>
            <Header>Tambah Data Presensi Pengajar</Header>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Hari:</Label>
                    <Input
                        type="text"
                        value={hari}
                        onChange={(e) => setHari(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tanggal:</Label>
                    <Input
                        type="number"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Bulan:</Label>
                    <Input
                        type="number"
                        value={bulan}
                        onChange={(e) => setBulan(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tahun:</Label>
                    <Input
                        type="number"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>ID Pengajar:</Label>
                    <Input
                        type="number"
                        value={id_pengajar}
                        onChange={(e) => setIdPengajar(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Nama:</Label>
                    <Input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Jam Datang:</Label>
                    <Input
                        type="text"
                        value={jam_datang}
                        onChange={(e) => setJamDatang(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Jam Pulang:</Label>
                    <Input
                        type="text"
                        value={jam_pulang}
                        onChange={(e) => setJamPulang(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Keterangan:</Label>
                    <Input
                        type="text"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit">Tambah Data</SubmitButton>
            </Form>
        </Container>
    );
}
