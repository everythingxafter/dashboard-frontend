import React, { useState, useEffect } from "react";
import Table from "../components/Table"
import axios from "axios";
import jwt_decode from 'jwt-decode';
import KebunEdit from "../handler/KebunEdit";
import KebunDelete from "../handler/KebunDelete";

function ListKebun() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        if (token) {
            axios.get('http://localhost:3000/farms/read', {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(response => {

                    const sortedData = response.data.farms.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                    setData(sortedData);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        } else {
            console.error("No token available.");
            setIsLoading(false);
        }
    }, []);

    const token = localStorage.getItem('Authorization');
    const decodedToken = jwt_decode(token);

    const columns = React.useMemo(
        () => [
            {
                Header: "Nama Kebun",
                accessor: "farmName"
            },
            {
                Header: "Estate",
                accessor: "estate"
            },
            {
                Header: "Alamat Kebun",
                accessor: "farmAddress",
            },
            {
                Header: "Dermaga Sandar",
                accessor: "dockName",
            },
            {
                Header: "Contact Person",
                accessor: "contactPersonName",
            },
            {
                Header: "No. Telp",
                accessor: "contactPersonNumber",
            },
            {
                Header: "Tanggal",
                accessor: "createdAt",
                // eslint-disable-next-line react/prop-types
                Cell: ({ value }) => {
                    const date = new Date(value);

                    const day = date.getDate();
                    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
                    const year = date.getFullYear();

                    const hour = date.getHours().toString().padStart(2, '0');
                    const minute = date.getMinutes().toString().padStart(2, '0');

                    const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
                    return <span>{formattedDate}</span>;
                },
            },
            decodedToken.role !== 'member' ?
                {
                    Header: "Di buat",
                    accessor: "createBy",
                } : null,
            decodedToken.role !== 'member' ?
                {
                    Header: "Action",
                    accessor: "id",
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ row }) => (
                        <div className="flex gap-2">
                            <KebunEdit id={row.original.id} farmData={row.original} />
                            <KebunDelete id={row.original.id} farmData={row.original} />
                        </div>
                    ),
                } : null,
        ].filter(Boolean),
        [decodedToken.role]
    );




    return (
        <div className="pt-5">
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-xl my-3">List Kebun</h1>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table columns={columns} data={data} />
                )}
            </div>
        </div>
    )
}

export default ListKebun