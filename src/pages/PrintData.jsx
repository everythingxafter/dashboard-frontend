import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import TableSelection, { SelectColumnFilter } from "../components/TableSelection.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Margin, usePDF } from "react-to-pdf";


function PrintData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [pageSize, setPageSize] = useState(100); // Initial page size


    useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            const time = new Date().toLocaleTimeString();
            setTime(time);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const { toPDF, targetRef } = usePDF({
        filename: "usepdf-example.pdf",
        page: { margin: Margin.SMALL, orientation: "landscape" },
    });


    useEffect(() => {
        const token = localStorage.getItem("Authorization");
        if (token) {
            axios
                .get("http://localhost:3000/customers/read", {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    const sortedData = response.data.customers.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                    setData(sortedData);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        } else {
            console.error("No token available.");
            setIsLoading(false);
        }
    }, []);

    const token = localStorage.getItem("Authorization");
    const decodedToken = jwt_decode(token);

    const columns = React.useMemo(
        () => [
            {
                Header: "Select",
                accessor: "selection",
                Cell: ({ row }) => {
                    const handleRowSelection = () => {
                        const selectedRowIndex = selectedRows.findIndex(
                            (selectedRow) => selectedRow.id === row.original.id
                        );
                        if (selectedRowIndex === -1) {
                            setSelectedRows([...selectedRows, row.original]);
                        } else {
                            const updatedSelectedRows = [...selectedRows];
                            updatedSelectedRows.splice(selectedRowIndex, 1);
                            setSelectedRows(updatedSelectedRows);
                        }
                    };

                    const isChecked =
                        selectedRows.findIndex(
                            (selectedRow) => selectedRow.id === row.original.id
                        ) !== -1;

                    return (
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleRowSelection}
                        />
                    );
                },
            },
            {
                Header: "Customer Name",
                accessor: "customerName"
            },
            {
                Header: "Group Estate Name",
                accessor: "name"
            },
            {
                Header: "Estate",
                accessor: "estate"
            },
            {
                Header: "Region",
                accessor: "region",
            },
            {
                Header: "Price / Ton",
                accessor: "price",
                // eslint-disable-next-line react/prop-types
                Cell: ({ value }) => (
                    <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
                ),
            },
            {
                Header: "Service",
                accessor: "service",
                Filter: SelectColumnFilter,
                filter: "includes"
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
            {
                Header: "Keterangan",
                accessor: "keterangan",
            },
            // Define your other columns here as needed
        ],
        [selectedRows]
    );

    const columnsPrint = React.useMemo(
        () => [
            {
                Header: "Customer Name",
                accessor: "customerName"
            },
            {
                Header: "Group Estate Name",
                accessor: "name"
            },
            {
                Header: "Estate",
                accessor: "estate"
            },
            {
                Header: "Region",
                accessor: "region",
            },
            {
                Header: "Price / Ton",
                accessor: "price",
                // eslint-disable-next-line react/prop-types
                Cell: ({ value }) => (
                    <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
                ),
            },
            {
                Header: "Service",
                accessor: "service",
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
            {
                Header: "Keterangan",
                accessor: "keterangan",
            },
            // Define your other columns here as needed
        ],
        []
    );

    const handleLogSelectedData = () => {
        // Log the selected data
        console.log("Selected Rows:", selectedRows);
    };

    return (
        <div className="pt-5">
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-xl my-3">List Customer</h1>
                    <button onClick={toPDF}>Print Selected Data</button>
                    <button onClick={handleLogSelectedData}>log Selected Data</button>
                    <label>
                        Page Size:
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </label>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table columns={columns} data={data} setPageSize={25} />
                )}
            </div>
            <div className="mt-10" ref={targetRef}>
                <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                    <div className="text-center">
                        <h1 className="text-xl my-3">List Customer</h1>
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <TableSelection columns={columnsPrint} data={selectedRows} setPageSize={pageSize} />
                    )}
                    <div className="text-zinc-600 mx-4 mt-6 mb-4">
                        <p className="text-xs italic">Dibuat Tanggal : {time}</p>
                        <p className="text-xs italic">Dibuat Oleh : {decodedToken.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrintData;
