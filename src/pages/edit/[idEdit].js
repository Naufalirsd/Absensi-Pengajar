import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
    margin-bottom: 15px;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
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

export default function EditData() {
    const router = useRouter();
    const { idEdit } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data ? data.data : null);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const hari = event.target.hari.value;
        const tanggal = parseInt(event.target.tanggal.value);
        const bulan = parseInt(event.target.bulan.value);
        const tahun = parseInt(event.target.tahun.value);
        const id_pengajar = parseInt(event.target.id_pengajar.value);
        const nama = event.target.nama.value;
        const jam_datang = event.target.jam_datang.value;
        const jam_pulang = event.target.jam_pulang.value;
        const keterangan = event.target.keterangan.value;

        fetch(`/api/updateData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                hari: hari,
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
                id_pengajar: id_pengajar,
                nama: nama,
                jam_datang: jam_datang,
                jam_pulang: jam_pulang,
                keterangan: keterangan,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push(`/`);
            })
            .catch((err) => {
                console.error("Error updating data:", err);
                alert("Error: " + err.message);
            });
    };

    return (
        <Container>
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail && (
                <div>
                    <Header>Edit Data Presensi Pengajar</Header>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Hari:</Label>
                            <Input name="hari" defaultValue={dataDetail.hari} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tanggal:</Label>
                            <Input
                                name="tanggal"
                                type="number"
                                defaultValue={dataDetail.tanggal}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Bulan:</Label>
                            <Input
                                name="bulan"
                                type="number"
                                defaultValue={dataDetail.bulan}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tahun:</Label>
                            <Input
                                name="tahun"
                                type="number"
                                defaultValue={dataDetail.tahun}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>ID Pengajar:</Label>
                            <Input
                                name="id_pengajar"
                                type="number"
                                defaultValue={dataDetail.id_pengajar}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Nama:</Label>
                            <Input name="nama" defaultValue={dataDetail.nama} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Jam Datang:</Label>
                            <Input
                                name="jam_datang"
                                defaultValue={dataDetail.jam_datang}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Jam Pulang:</Label>
                            <Input
                                name="jam_pulang"
                                defaultValue={dataDetail.jam_pulang}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Keterangan:</Label>
                            <Input
                                name="keterangan"
                                defaultValue={dataDetail.keterangan}
                            />
                        </FormGroup>
                        <SubmitButton type="submit">Update Data</SubmitButton>
                        <button
                            onClick={() => {
                                router.push(`/`);
                            }}>
                            Kembali
                        </button>
                    </Form>
                </div>
            )}
        </Container>
    );
}
