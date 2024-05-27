import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Header = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin: 10px;
`;

const DataContainer = styled.div`
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
`;

const ActionButtons = styled.div`
    display: flex;
    margin-top: 10px;
`;

const ActionButton = styled.button`
    background-color: ${(props) => props.color || "#007bff"};
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
    margin-left: 5px;
`;

export default function Home() {
    const router = useRouter();
    const [showAllData, setShowAllData] = useState();

    useEffect(() => {
        fetch(`/api/getDataToday`)
            .then((res) => res.json())
            .then((data) => {
                let sortById = data.data;
                sortById = sortById.sort((a, b) => a.id - b.id);
                setShowAllData(sortById);
            });
    }, []);

    const handleUpdate = (id) => {
        fetch(`/api/updateData?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jam_pulang:
                    new Date().getHours() +
                    ":" +
                    String(new Date().getMinutes()).padStart(2, "0"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Sampai Jumpa");
                router.reload();
            })
            .catch((err) => {
                alert("Error: ", err.message);
            });
    };

    return (
        <Container>
            <Header>Absensi Karyawan</Header>
            <Button
                onClick={() => {
                    router.push(`/add-data`);
                }}>
                Tambah Absensi
            </Button>
            <div>
                {showAllData ? (
                    showAllData.map((data, index) => (
                        <DataContainer key={index}>
                            <p>
                                <strong>ID:</strong> {data.id}
                                <br />
                                <strong>Nama:</strong> {data.id_karyawan}
                                <br />
                                <strong>Jam Datang:</strong> {data.jam_datang}
                                <br />
                                <strong>Jam Pulang:</strong> {data.jam_pulang}
                            </p>
                            <ActionButtons>
                                {!data.jam_pulang && (
                                    <ActionButton
                                        onClick={() => {
                                            handleUpdate(data.id);
                                        }}>
                                        Pulang
                                    </ActionButton>
                                )}
                                <ActionButton
                                    color="#28a745"
                                    onClick={() => {
                                        router.push(`/detail/${data.id}`);
                                    }}>
                                    Detail
                                </ActionButton>
                                <ActionButton
                                    color="#ffc107"
                                    onClick={() => {
                                        router.push(`/edit/${data.id}`);
                                    }}>
                                    Edit
                                </ActionButton>
                            </ActionButtons>
                        </DataContainer>
                    ))
                ) : (
                    <p>Loading....</p>
                )}
            </div>
        </Container>
    );
}
