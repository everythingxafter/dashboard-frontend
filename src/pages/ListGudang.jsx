import React, { useCallback, useState, useEffect } from "react";
import Table from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import ReactModal from 'react-modal';
import axios from "axios";
import jwt_decode from 'jwt-decode';


function ListGudang() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('Authorization'); // Retrieve the token from localStorage
        console.log('Token:', token); // Log the token to the console
        if (token) {
            axios.get('http://localhost:3000/warehouses/read', {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    // Sort the data in descending order based on "createdAt"
                    const sortedData = response.data.warehouses.sort((a, b) => {
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

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [selectedItemId, setSelectedItemId] = React.useState(null);
    const [selectedItemName, setSelectedItemName] = React.useState("");
    const [selectedItemEstate, setSelectedItemEstate] = React.useState("");
    const [selectedItemRegion, setSelectedItemRegion] = React.useState("");
    const [selectedItemPrice, setSelectedItemPrice] = React.useState("");
    const [selectedItemKeterangan, setSelectedItemKeterangan] = React.useState("");


    const handleEdit = useCallback((id) => {
        const selectedItem = data.find(item => item.id === id);
        if (selectedItem) {
            setSelectedItemId(selectedItem.id);
            setSelectedItemName(selectedItem.name);
            setSelectedItemEstate(selectedItem.estate);
            setSelectedItemRegion(selectedItem.region);
            setSelectedItemPrice(selectedItem.price);
            setSelectedItemKeterangan(selectedItem.keterangan);
            setIsEditModalOpen(true);
        }
    }, [data]);

    const handleDelete = useCallback((id) => {
        const selectedItem = data.find(item => item.id === id);
        if (selectedItem) {
            setSelectedItemId(selectedItem.id);
            setSelectedItemName(selectedItem.name);
            setSelectedItemEstate(selectedItem.estate);
            setSelectedItemRegion(selectedItem.region);
            setSelectedItemPrice(selectedItem.price);
            setSelectedItemKeterangan(selectedItem.keterangan);
            setIsDeleteModalOpen(true);
        }
    }, [data]);


    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const token = localStorage.getItem('Authorization'); // Retrieve the token from localStorage
    console.log('Token:', token); // Log the token to the console
    const decodedToken = jwt_decode(token);

    const columns = React.useMemo(
        () => [
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

                    // Get day, month, year
                    const day = date.getDate();
                    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
                    const year = date.getFullYear();

                    // Get hour and minute
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
                            <button
                                // eslint-disable-next-line react/prop-types
                                key={`edit_${row.id}`}
                                // eslint-disable-next-line react/prop-types
                                onClick={() => handleEdit(row.original.id)}
                                className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                                // eslint-disable-next-line react/prop-types
                                key={`delete_${row.id}`}
                                // eslint-disable-next-line react/prop-types
                                onClick={() => handleDelete(row.original.id)}
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ),
                } : null,
        ].filter(Boolean), // Remove any null or undefined columns
        [decodedToken.role, handleEdit, handleDelete]);




    return (
        <div className="pt-5">
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-xl my-3">List Gudang</h1>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                )}
                <ReactModal
                    isOpen={isEditModalOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Edit Modal"
                    className="w-full h-full flex justify-center items-center"
                >
                    {/* Your edit modal content */}
                    {/* Edit Modal Content for ID: {selectedItemId} */}
                    <div className="w-1/2 h-2/3 bg-white border border-zinc-200 shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center gap-2">
                        <h1>Apakah anda ingin mengedit ini ?</h1>
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full">
                                <div className="flex flex-col gap-1 mb-4">
                                    <p>Nama :</p>
                                    <input className="py-2 px-3 border rounded-md w-full shadow-md" type="text" value={selectedItemName} />
                                </div>
                                <div className="flex flex-col gap-1 mb-4">
                                    <p>Estate :</p>
                                    <input className="py-2 px-3 border rounded-md w-full shadow-md" type="text" value={selectedItemEstate} />
                                </div>
                                <div className="flex flex-col gap-1 mb-4">
                                    <p>Region :</p>
                                    <input className="py-2 px-3 border rounded-md w-full shadow-md" type="text" value={selectedItemRegion} />
                                </div>
                                <div className="flex flex-col gap-1 mb-4">
                                    <p>Price :</p>
                                    <input className="py-2 px-3 border rounded-md w-full shadow-md" type="text" value={selectedItemPrice} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p>Keterangan :</p>
                                    <input className="py-2 px-3 border rounded-md w-full shadow-md" type="text" value={selectedItemKeterangan} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex gap-5">
                            <button className="py-2 px-4 bg-emerald-500 hover:bg-emerald-700 rounded-md">Simpan</button>
                            <button className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md">Batal</button>
                        </div>
                    </div>
                </ReactModal>
                <ReactModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    contentLabel="Delete Modal"
                >
                    {/* Your delete modal content */}
                    Delete Modal Content for ID: {selectedItemId}
                </ReactModal>

            </div>
        </div>
    )
}

export default ListGudang