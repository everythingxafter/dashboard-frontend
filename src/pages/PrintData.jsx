import React, { useEffect, useState } from "react";
import Table, { SelectColumnFilter } from "../components/Table.jsx";
import TableSelection from "../components/TableSelection.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Margin, usePDF } from "react-to-pdf";
import { PrinterIcon } from '@heroicons/react/solid';


function PrintData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [selectedCategory, setSelectedCategory] = useState('');

    const token = localStorage.getItem("Authorization");
    const decodedToken = jwt_decode(token);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
            const formattedDate = date.toLocaleString('id-ID', options);
            setTime(formattedDate);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const { toPDF, targetRef } = usePDF({
        filename: `list-${selectedCategory + +new Date()}.pdf`,
        page: { margin: Margin.SMALL, orientation: "landscape" },
    });

    const handleCategoryChange = (newCategory) => {
        setSelectedCategory(newCategory);
        setSelectedRows([]);

        if (token) {
            setIsLoading(true);
            axios
                .get(`http://localhost:3000/${newCategory.toLowerCase()}/read`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    const sortedData = response.data[newCategory.toLowerCase()].sort((a, b) => {
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
    };

    const generateColumns = (category) => {
        if (category === "Customers") {
            return [
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
            ];
        } else if (category === "Suppliers") {
            return [
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
                    Header: "Nama Supplier",
                    accessor: "supplierName"
                },
                {
                    Header: "Service Supplier",
                    accessor: "supplierService",
                    Filter: SelectColumnFilter,
                    filter: "includes"
                },
                {
                    Header: "Alamat Tujuan",
                    accessor: "destination"
                },
                {
                    Header: "Harga Service",
                    accessor: "price",
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ value }) => (
                        <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
                    ),
                },
                {
                    Header: "Keterangan",
                    accessor: "keterangan",
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
            ];
        } else if (category === "Farms") {
            return [
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
            ];
        } else if (category === "Warehouses") {
            return [
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
                    Header: "Nama Gudang",
                    accessor: "warehouseName"
                },
                {
                    Header: "Nama Pabrik",
                    accessor: "factoryName"
                },
                {
                    Header: "Alamat Gudang",
                    accessor: "warehouseAddress",
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
            ];
        }
    };

    const generateColumnsPrint = (category) => {
        if (category === "Customers") {
            return [
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
            ];
        } else if (category === "Suppliers") {
            return [
                {
                    Header: "Nama Supplier",
                    accessor: "supplierName"
                },
                {
                    Header: "Service Supplier",
                    accessor: "supplierService",
                },
                {
                    Header: "Alamat Tujuan",
                    accessor: "destination"
                },
                {
                    Header: "Harga Service",
                    accessor: "price",
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ value }) => (
                        <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
                    ),
                },
                {
                    Header: "Keterangan",
                    accessor: "keterangan",
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
            ];
        } else if (category === "Farms") {
            return [
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
            ];
        } else if (category === "Warehouses") {
            return [
                {
                    Header: "Nama Gudang",
                    accessor: "warehouseName"
                },
                {
                    Header: "Nama Pabrik",
                    accessor: "factoryName"
                },
                {
                    Header: "Alamat Gudang",
                    accessor: "warehouseAddress",
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
            ];
        }
    };

    const columns = generateColumns(selectedCategory);
    const columnsPrint = generateColumnsPrint(selectedCategory);

    return (
        <div className="pt-5 bg-slate-100" >
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    {selectedCategory === '' ? (
                        <p className="text-2xl my-4">Pilih table data yang ingin di print</p>
                    ) : selectedCategory === 'Customers' ? (
                        <p className="text-2xl my-4">List Customer</p>
                    ) : selectedCategory === 'Suppliers' ? (
                        <p className="text-2xl my-4">List Supplier</p>
                    ) : selectedCategory === 'Farms' ? (
                        <p className="text-2xl my-4">List Kebun</p>
                    ) : selectedCategory === 'Warehouses' ? (
                        <p className="text-2xl my-4">List Gudang</p>
                    ) : null
                    }
                    <div className="flex gap-10 justify-center">
                        <div className="flex py-2 px-4 cursor-pointer rounded-xl shadow-md hover:bg-slate-400 hover:shadow-xl" onClick={toPDF}>
                            <PrinterIcon className="w-5 h-5 mr-2" />
                            <p className="text-sm">
                                Print Selected Data
                            </p>
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="py-2 px-4 rounded-xl shadow-md hover:shadow-xl"
                        >
                            <option value="" className="py-2 px-4" >Select data</option>
                            <option value="Customers" className="py-2 px-4">Customer</option>
                            <option value="Suppliers" className="py-2 px-4">Supplier</option>
                            <option value="Farms" className="py-2 px-4">Kebun</option>
                            <option value="Warehouses" className="py-2 px-4">Gudang</option>
                        </select>
                    </div>
                </div>
                {selectedCategory === '' ? (
                    <div className="text-center p-10 bg-slate-300 my-5">
                        <p className="text-2xl">Silahkan pilih list Table dahulu</p>
                    </div>
                ) : isLoading ? (
                    <div className="text-center p-10 my-5">
                        <p className="text-2xl">Loading . . .</p>
                    </div>
                ) : (
                    <Table columns={columns} data={data} />
                )}
            </div>
            <div className="mt-10" ref={targetRef}>
                <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                    <div className="text-center">
                        {selectedCategory === '' ? (
                            <p className="text-base my-4">Pilih data di atas terlebih dahulu</p>
                        ) : selectedCategory === 'Customers' ? (
                            <p className="text-2xl mt-2 mb-6">List Customer</p>
                        ) : selectedCategory === 'Suppliers' ? (
                            <p className="text-2xl mt-2 mb-6">List Supplier</p>
                        ) : selectedCategory === 'Farms' ? (
                            <p className="text-2xl mt-2 mb-6">List Kebun</p>
                        ) : selectedCategory === 'Warehouses' ? (
                            <p className="text-2xl mt-2 mb-6">List Gudang</p>
                        ) : null
                        }
                    </div>
                    {selectedCategory === '' ? (
                        <div className="text-center p-10 bg-slate-300 my-5">
                            <p className="text-2xl">Silahkan pilih list Table dahulu</p>
                        </div>
                    ) : isLoading ? (
                        <div className="text-center p-10 my-5">
                            <p className="text-2xl">Loading . . .</p>
                        </div>
                    ) : (
                        <TableSelection columns={columnsPrint} data={selectedRows} />
                    )}
                    <div className="text-zinc-600 mx-4 mt-6 mb-4">
                        <p className="text-xs italic">Dibuat Tanggal : {time}</p>
                        <p className="text-xs italic">Dibuat Oleh : {decodedToken.name}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PrintData;
