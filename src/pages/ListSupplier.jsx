import React, { useCallback } from "react";
import Table, { SelectColumnFilter } from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import ReactModal from 'react-modal';

function ListSupplier() {
    const getData = () => [

        {
            "id": 11,
            "supplierName": "PT. Maju Jaya",
            "supplierService": "PBM Bongkar",
            "destination1": "SURYA 3 Estate",
            "price": 260000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 12,
            "supplierName": "PT. Lancar Jaya",
            "supplierService": "PBM Muat",
            "destination1": "MILL 2 Estate",
            "price": 210000,
            "keterangan": "All in trucking + buruh",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 13,
            "supplierName": "CV. Semua Bisa",
            "supplierService": "Trucking",
            "destination1": "Gresik - Kelampai",
            "price": 340000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 14,
            "supplierName": "PT. Perahu layar",
            "supplierService": "Kapal",
            "destination1": "Gudang Makmur",
            "price": 270000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 15,
            "supplierName": "CV. Cepat",
            "supplierService": "Trucking",
            "destination1": "Cikarang Distribution Center",
            "price": 180000,
            "keterangan": "All in trucking + buruh",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 16,
            "supplierName": "PT. Jasa Lengkap",
            "supplierService": "PBM Bongkar",
            "destination1": "JABABEKA 9 Harbor",
            "price": 310000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 17,
            "supplierName": "PT. Angkasa Indah",
            "supplierService": "PBM Muat",
            "destination1": "Mitra Karawang Terminal",
            "price": 230000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 18,
            "supplierName": "PT. Logistik Makmur",
            "supplierService": "Kapal",
            "destination1": "Tanjung Priok Port",
            "price": 350000,
            "keterangan": "All in trucking + buruh",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 19,
            "supplierName": "CV. Penta",
            "supplierService": "Trucking",
            "destination1": "Cirebon Wharf",
            "price": 250000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 20,
            "supplierName": "PT. Lautan Jasa",
            "supplierService": "Kapal",
            "destination1": "Makassar Harbor",
            "price": 290000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 21,
            "supplierName": "CV. Prima Cepat",
            "supplierService": "Trucking",
            "destination1": "Surabaya Distribution Center",
            "price": 200000,
            "keterangan": "All in trucking + buruh",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 22,
            "supplierName": "PT. Mega Logistik",
            "supplierService": "PBM Bongkar",
            "destination1": "JAKARTA 10 Harbor",
            "price": 280000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 23,
            "supplierName": "PT. Terang Abadi",
            "supplierService": "PBM Muat",
            "destination1": "KIMA Industrial Estate",
            "price": 220000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 24,
            "supplierName": "CV. Logistik Cepat",
            "supplierService": "Trucking",
            "destination1": "Pati Logistics Hub",
            "price": 190000,
            "keterangan": "All in trucking + buruh",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 25,
            "supplierName": "PT. Cahaya Laut",
            "supplierService": "Kapal",
            "destination1": "Bitung Port",
            "price": 320000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 26,
            "supplierName": "PT. Berkah Abadi",
            "supplierService": "PBM Bongkar",
            "destination1": "Cirebon Wharf",
            "price": 260000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 27,
            "supplierName": "CV. Sejatera",
            "supplierService": "Trucking",
            "destination1": "Mitra Karawang Terminal",
            "price": 230000,
            "keterangan": "All in trucking + buruh",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 28,
            "supplierName": "PT. Samudra Logistik",
            "supplierService": "Kapal",
            "destination1": "JAKARTA 10 Harbor",
            "price": 300000,
            "keterangan": "OA Kapal + buruh",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 29,
            "supplierName": "CV. Nusantara",
            "supplierService": "Trucking",
            "destination1": "SURYA 3 Estate",
            "price": 210000,
            "keterangan": "Harga sudah termasuk jetty",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 30,
            "supplierName": "PT. Pelita Jaya",
            "supplierService": "PBM Muat",
            "destination1": "JABABEKA 9 Harbor",
            "price": 280000,
            "keterangan": "All in trucking + buruh",
            "createDate": "27 February 2023",
            "editedAt": "27 February 2023",
            "createBy": "Maya"
        }
    ];

    const data = React.useMemo(() => getData(), []);

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

    const columns = React.useMemo(
        () => [
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
                accessor: "destination1"
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
                accessor: "createDate",
            },
            {
                Header: "Di buat",
                accessor: "createBy",
            },
            {
                Header: "Action",
                accessor: "id", // You can use any unique identifier here
                // eslint-disable-next-line react/prop-types
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            // eslint-disable-next-line react/prop-types
                            key={`edit_${row.id}`}
                            // eslint-disable-next-line react/prop-types
                            onClick={() => handleEdit(row.original.id)} // Implement your edit logic here
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                            // eslint-disable-next-line react/prop-types
                            key={`delete_${row.id}`}
                            // eslint-disable-next-line react/prop-types
                            onClick={() => handleDelete(row.original.id)} // Implement your delete logic here
                            className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                ),
            },

        ],
        [handleEdit, handleDelete] // Include the memoized functions in the dependency array
    );




    return (
        <div className="pt-5">
            <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-xl my-3">List Supplier</h1>
                </div>
                <Table columns={columns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default ListSupplier