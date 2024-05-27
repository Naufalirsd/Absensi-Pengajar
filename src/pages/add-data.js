import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Form = styled.form`
    max-width: 400px;
    margin: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
`;

export default function AddData() {
    const router = useRouter();

    const handleAdd = (event) => {
        event.preventDefault();
        const id_karyawan = event.target.id_karyawan.value;
        const jam_datang = event.target.jam_datang.value;
        const keterangan = event.target.keterangan.value;

        fetch("/api/insertData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_karyawan: id_karyawan,
                jam_datang: jam_datang,
                keterangan: keterangan,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push("/");
            })
            .catch((err) => {
                alert("hubungi saya", err.message);
            });
    };

    return (
        <Container>
            <h1 style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Tambah Data Absensi</h1>
            <Form onSubmit={handleAdd}>
                <FormGroup>
                    <Label>Nama:</Label>
                    <Input name="id_karyawan" required />
                </FormGroup>
                <FormGroup>
                    <Label>Jam Datang:</Label>
                    <Input
                        name="jam_datang"
                        defaultValue={
                            new Date().getHours() +
                            ":" +
                            String(new Date().getMinutes()).padStart(2, "0")
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Keterangan:</Label>
                    <Input name="keterangan" required />
                </FormGroup>
                <Button type="submit">Add Data</Button>
            </Form>
        </Container>
    );
}
