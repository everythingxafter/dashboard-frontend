import React, { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import TableSelection from "../components/TableSelection.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Margin, usePDF } from "react-to-pdf";


function PrintData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [selectedCategory, setSelectedCategory] = useState('Customers');

    const token = localStorage.getItem("Authorization");
    const decodedToken = jwt_decode(token);

    useEffect(() => {
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
                .get(`http://localhost:3000/${selectedCategory.toLowerCase()}/read`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    const sortedData = response.data[selectedCategory.toLowerCase()].sort((a, b) => {
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
    }, [selectedCategory]);

    // useEffect(() => {
    //     const token = localStorage.getItem("Authorization");
    //     if (token) {
    //         axios
    //             .get(`http://localhost:3000/${selectedCategory.toLowerCase()}/read`, {
    //                 headers: {
    //                     Authorization: `${token}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 const sortedData = response.data[selectedCategory.toLowerCase()].sort((a, b) => {
    //                     return new Date(b.createdAt) - new Date(a.createdAt);
    //                 });

    //                 setData(sortedData);
    //                 setIsLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching data:", error);
    //                 setIsLoading(false);
    //             });
    //     } else {
    //         console.error("No token available.");
    //         setIsLoading(false);
    //     }
    // }, [selectedCategory]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem("Authorization");
    //         if (token) {
    //             try {
    //                 const response = await axios.get(`http://localhost:3000/${selectedCategory.toLowerCase()}/read`, {
    //                     headers: {
    //                         Authorization: `${token}`,
    //                     },
    //                 });

    //                 const sortedData = response.data[selectedCategory.toLowerCase()].sort((a, b) => {
    //                     return new Date(b.createdAt) - new Date(a.createdAt);
    //                 });

    //                 setData(sortedData);
    //                 setIsLoading(false);
    //             } catch (error) {
    //                 console.error("Error fetching data:", error);
    //                 setIsLoading(false);
    //             }
    //         } else {
    //             console.error("No token available.");
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [selectedCategory]);





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

    // const columns = React.useMemo(() => {
    //     if (selectedCategory === 'Customers') {
    //         return [
    //             {
    //                 Header: "Select",
    //                 accessor: "selection",
    //                 Cell: ({ row }) => {
    //                     const handleRowSelection = () => {
    //                         const selectedRowIndex = selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         );
    //                         if (selectedRowIndex === -1) {
    //                             setSelectedRows([...selectedRows, row.original]);
    //                         } else {
    //                             const updatedSelectedRows = [...selectedRows];
    //                             updatedSelectedRows.splice(selectedRowIndex, 1);
    //                             setSelectedRows(updatedSelectedRows);
    //                         }
    //                     };

    //                     const isChecked =
    //                         selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         ) !== -1;

    //                     return (
    //                         <input
    //                             type="checkbox"
    //                             checked={isChecked}
    //                             onChange={handleRowSelection}
    //                         />
    //                     );
    //                 },
    //             },
    //             {
    //                 Header: "Customer Name",
    //                 accessor: "customerName"
    //             },
    //             {
    //                 Header: "Group Estate Name",
    //                 accessor: "name"
    //             },
    //             {
    //                 Header: "Estate",
    //                 accessor: "estate"
    //             },
    //             {
    //                 Header: "Region",
    //                 accessor: "region",
    //             },
    //             {
    //                 Header: "Price / Ton",
    //                 accessor: "price",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => (
    //                     <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
    //                 ),
    //             },
    //             {
    //                 Header: "Service",
    //                 accessor: "service",
    //                 Filter: SelectColumnFilter,
    //                 filter: "includes"
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //             {
    //                 Header: "Keterangan",
    //                 accessor: "keterangan",
    //             },
    //         ], [selectedRows]
    //     } else if (selectedCategory === 'Supplier') {
    //         return [
    //             {
    //                 Header: "Select",
    //                 accessor: "selection",
    //                 Cell: ({ row }) => {
    //                     const handleRowSelection = () => {
    //                         const selectedRowIndex = selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         );
    //                         if (selectedRowIndex === -1) {
    //                             setSelectedRows([...selectedRows, row.original]);
    //                         } else {
    //                             const updatedSelectedRows = [...selectedRows];
    //                             updatedSelectedRows.splice(selectedRowIndex, 1);
    //                             setSelectedRows(updatedSelectedRows);
    //                         }
    //                     };

    //                     const isChecked =
    //                         selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         ) !== -1;

    //                     return (
    //                         <input
    //                             type="checkbox"
    //                             checked={isChecked}
    //                             onChange={handleRowSelection}
    //                         />
    //                     );
    //                 },
    //             },
    //             {
    //                 Header: "Nama Supplier",
    //                 accessor: "supplierName"
    //             },
    //             {
    //                 Header: "Service Supplier",
    //                 accessor: "supplierService",
    //                 Filter: SelectColumnFilter,
    //                 filter: "includes"
    //             },
    //             {
    //                 Header: "Alamat Tujuan",
    //                 accessor: "destination"
    //             },
    //             {
    //                 Header: "Harga Service",
    //                 accessor: "price",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => (
    //                     <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
    //                 ),
    //             },
    //             {
    //                 Header: "Keterangan",
    //                 accessor: "keterangan",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ], [selectedRows]
    //     } else if (selectedCategory === 'Farms') {
    //         return [
    //             {
    //                 Header: "Select",
    //                 accessor: "selection",
    //                 Cell: ({ row }) => {
    //                     const handleRowSelection = () => {
    //                         const selectedRowIndex = selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         );
    //                         if (selectedRowIndex === -1) {
    //                             setSelectedRows([...selectedRows, row.original]);
    //                         } else {
    //                             const updatedSelectedRows = [...selectedRows];
    //                             updatedSelectedRows.splice(selectedRowIndex, 1);
    //                             setSelectedRows(updatedSelectedRows);
    //                         }
    //                     };

    //                     const isChecked =
    //                         selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         ) !== -1;

    //                     return (
    //                         <input
    //                             type="checkbox"
    //                             checked={isChecked}
    //                             onChange={handleRowSelection}
    //                         />
    //                     );
    //                 },
    //             },
    //             {
    //                 Header: "Nama Kebun",
    //                 accessor: "farmName"
    //             },
    //             {
    //                 Header: "Estate",
    //                 accessor: "estate"
    //             },
    //             {
    //                 Header: "Alamat Kebun",
    //                 accessor: "farmAddress",
    //             },
    //             {
    //                 Header: "Dermaga Sandar",
    //                 accessor: "dockName",
    //             },
    //             {
    //                 Header: "Contact Person",
    //                 accessor: "contactPersonName",
    //             },
    //             {
    //                 Header: "No. Telp",
    //                 accessor: "contactPersonNumber",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ], [selectedRows]
    //     } else if (selectedCategory === 'Warehouses') {
    //         return [
    //             {
    //                 Header: "Select",
    //                 accessor: "selection",
    //                 Cell: ({ row }) => {
    //                     const handleRowSelection = () => {
    //                         const selectedRowIndex = selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         );
    //                         if (selectedRowIndex === -1) {
    //                             setSelectedRows([...selectedRows, row.original]);
    //                         } else {
    //                             const updatedSelectedRows = [...selectedRows];
    //                             updatedSelectedRows.splice(selectedRowIndex, 1);
    //                             setSelectedRows(updatedSelectedRows);
    //                         }
    //                     };

    //                     const isChecked =
    //                         selectedRows.findIndex(
    //                             (selectedRow) => selectedRow.id === row.original.id
    //                         ) !== -1;

    //                     return (
    //                         <input
    //                             type="checkbox"
    //                             checked={isChecked}
    //                             onChange={handleRowSelection}
    //                         />
    //                     );
    //                 },
    //             },
    //             {
    //                 Header: "Nama Gudang",
    //                 accessor: "warehouseName"
    //             },
    //             {
    //                 Header: "Nama Pabrik",
    //                 accessor: "factoryName"
    //             },
    //             {
    //                 Header: "Alamat Gudang",
    //                 accessor: "warehouseAddress",
    //             },
    //             {
    //                 Header: "Contact Person",
    //                 accessor: "contactPersonName",
    //             },
    //             {
    //                 Header: "No. Telp",
    //                 accessor: "contactPersonNumber",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ], [selectedRows]
    //     }
    // }, [selectedCategory, selectedRows]);

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

    // const columnsPrint = React.useMemo(() => {
    //     if (selectedCategory === 'Customer') {
    //         return [
    //             {
    //                 Header: "Customer Name",
    //                 accessor: "customerName"
    //             },
    //             {
    //                 Header: "Group Estate Name",
    //                 accessor: "name"
    //             },
    //             {
    //                 Header: "Estate",
    //                 accessor: "estate"
    //             },
    //             {
    //                 Header: "Region",
    //                 accessor: "region",
    //             },
    //             {
    //                 Header: "Price / Ton",
    //                 accessor: "price",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => (
    //                     <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
    //                 ),
    //             },
    //             {
    //                 Header: "Service",
    //                 accessor: "service",
    //                 Filter: SelectColumnFilter,
    //                 filter: "includes"
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //             {
    //                 Header: "Keterangan",
    //                 accessor: "keterangan",
    //             },
    //         ], [selectedRows]
    //     } else if (selectedCategory === 'Suppliers') {
    //         return [
    //             {
    //                 Header: "Nama Supplier",
    //                 accessor: "supplierName"
    //             },
    //             {
    //                 Header: "Service Supplier",
    //                 accessor: "supplierService",
    //                 Filter: SelectColumnFilter,
    //                 filter: "includes"
    //             },
    //             {
    //                 Header: "Alamat Tujuan",
    //                 accessor: "destination"
    //             },
    //             {
    //                 Header: "Harga Service",
    //                 accessor: "price",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => (
    //                     <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
    //                 ),
    //             },
    //             {
    //                 Header: "Keterangan",
    //                 accessor: "keterangan",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ], [selectedRows]
    //     } else if (selectedCategory === 'Farms') {
    //         return [
    //             {
    //                 Header: "Nama Kebun",
    //                 accessor: "farmName"
    //             },
    //             {
    //                 Header: "Estate",
    //                 accessor: "estate"
    //             },
    //             {
    //                 Header: "Alamat Kebun",
    //                 accessor: "farmAddress",
    //             },
    //             {
    //                 Header: "Dermaga Sandar",
    //                 accessor: "dockName",
    //             },
    //             {
    //                 Header: "Contact Person",
    //                 accessor: "contactPersonName",
    //             },
    //             {
    //                 Header: "No. Telp",
    //                 accessor: "contactPersonNumber",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ];
    //     } else if (selectedCategory === 'Warehouses') {
    //         return [
    //             {
    //                 Header: "Nama Gudang",
    //                 accessor: "warehouseName"
    //             },
    //             {
    //                 Header: "Nama Pabrik",
    //                 accessor: "factoryName"
    //             },
    //             {
    //                 Header: "Alamat Gudang",
    //                 accessor: "warehouseAddress",
    //             },
    //             {
    //                 Header: "Contact Person",
    //                 accessor: "contactPersonName",
    //             },
    //             {
    //                 Header: "No. Telp",
    //                 accessor: "contactPersonNumber",
    //             },
    //             {
    //                 Header: "Tanggal",
    //                 accessor: "createdAt",
    //                 // eslint-disable-next-line react/prop-types
    //                 Cell: ({ value }) => {
    //                     const date = new Date(value);

    //                     const day = date.getDate();
    //                     const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
    //                     const year = date.getFullYear();

    //                     const hour = date.getHours().toString().padStart(2, '0');
    //                     const minute = date.getMinutes().toString().padStart(2, '0');

    //                     const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
    //                     return <span>{formattedDate}</span>;
    //                 },
    //             },
    //         ], [selectedRows]
    //     }
    // }, [selectedCategory, selectedRows]);

    const handleLogSelectedData = () => {
        // Log the selected data
        console.log("Selected Rows:", selectedRows);
    };

    const handleCategoryChange = (newCategory) => {
        setSelectedCategory(newCategory);

    };



    return (
        <div className="pt-5">
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-xl my-3">List Data</h1>
                    <button onClick={toPDF}>Print Selected Data</button>
                    <button onClick={handleLogSelectedData}>Log Selected Data</button>
                    <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Select data</option>
                        <option value="Customers">Customer</option>
                        <option value="Suppliers">Supplier</option>
                        <option value="Farms">Kebun</option>
                        <option value="Warehouses">Gudang</option>
                    </select>
                </div>
                {selectedCategory === '' ? (
                    <p>Select Data</p>
                ) : isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table columns={columns} data={data} />
                )}
            </div>
            <div className="mt-10" ref={targetRef}>
                <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                    <div className="text-center">
                        <h1 className="text-xl my-3">List Customer</h1>
                    </div>
                    {selectedCategory === '' ? (
                        <p>Select Data</p>
                    ) : isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <TableSelection columns={columnsPrint} data={selectedRows} />
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
