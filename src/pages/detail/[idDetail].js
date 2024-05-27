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

const DataContainer = styled.div`
    padding: 20px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    background-color: #f8f9fa;
    margin-bottom: 20px;
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

export default function DetailPage() {
    const router = useRouter();
    const { detail } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!detail) return;

        fetch(`/api/getDataDetail?id=${detail}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data[0]);
            })
            .catch((err) => {
                alert("Error: ", err.message);
            });
    }, [detail]);

    return (
        <Container>
            <Header>Detail Absensi</Header>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && (
                <DataContainer>
                    <p>ID Karyawan: {dataDetail.id_karyawan}</p>
                    <p>Jam Datang: {dataDetail.jam_datang}</p>
                    <p>Jam Pulang: {dataDetail.jam_pulang}</p>
                    <p>Keterangan: {dataDetail.keterangan}</p>
                    <p>
                        Tanggal: {dataDetail.hari}/{dataDetail.bulan}/
                        {dataDetail.tahun}
                    </p>
                </DataContainer>
            )}
            <BackButton onClick={() => router.push("/admin")}>
                Kembali
            </BackButton>
        </Container>
    );
}
