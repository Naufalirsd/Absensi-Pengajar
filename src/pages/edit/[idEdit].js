import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #495057;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    width: 100%;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 10px;
`;

const BackButton = styled.button`
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 10px;
`;

export default function EditPage() {
    const router = useRouter();
    const { idEdit } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data[0]);
            })
            .catch((err) => {
                alert("Error: ", err.message);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const id_karyawan = event.target.id_karyawan.value;
        const jam_datang = event.target.jam_datang.value;
        const jam_pulang = event.target.jam_pulang.value;
        const hari = parseInt(event.target.hari.value);
        const bulan = parseInt(event.target.bulan.value);
        const tahun = parseInt(event.target.tahun.value);

        fetch(`/api/updateAdmin?id=${idEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                id_karyawan: id_karyawan,
                jam_datang: jam_datang,
                jam_pulang: jam_pulang,
                hari: hari,
                bulan: bulan,
                tahun: tahun,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Success");
                router.push("/admin");
            })
            .catch((err) => {
                alert("Error: ", err.message);
            });
    };

    return (
        <Container>
            <Header>Halaman Edit</Header>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && (
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Nama:</Label>
                        <Input
                            name="id_karyawan"
                            required
                            defaultValue={dataDetail.id_karyawan}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Jam Datang:</Label>
                        <Input
                            name="jam_datang"
                            type="text"
                            defaultValue={dataDetail.jam_datang}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Jam Pulang:</Label>
                        <Input
                            name="jam_pulang"
                            type="text"
                            defaultValue={dataDetail.jam_pulang}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Tanggal:</Label>
                        <Input
                            name="hari"
                            required
                            placeholder="Hari"
                            defaultValue={dataDetail.hari}
                        />
                        <Input
                            name="bulan"
                            required
                            placeholder="Bulan"
                            defaultValue={dataDetail.bulan}
                        />
                        <Input
                            name="tahun"
                            required
                            placeholder="Tahun"
                            defaultValue={dataDetail.tahun}
                        />
                    </FormGroup>
                    <Button type="submit">Edit</Button>
                    <BackButton
                        type="button"
                        onClick={() => router.push("/admin")}>
                        Kembali
                    </BackButton>
                </Form>
            )}
        </Container>
    );
}
