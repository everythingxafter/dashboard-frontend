import React, { useCallback } from "react";
import Table from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import ReactModal from 'react-modal';

function ListGudang() {
    const getData = () => [
        {
            "id": 11,
            "warehouseName": "Gudang Simpan",
            "factoryName": "PT. Pupuk Berkah",
            "warehouseAddress": "JL. Roomo No. 378, RT 001 RW 001, Ds. Roomo, Mayar, Gresik",
            "contactPersonName": "Ibu Lucy",
            "contactPersonNumber": "081312344322",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 12,
            "warehouseName": "Gudang Suka Jaya",
            "factoryName": "PT. Indah Sejahtera",
            "warehouseAddress": "JL. Harapan No. 123, RT 002 RW 002, Ds. Harapan, Makmur, Surabaya",
            "contactPersonName": "Pak Suka",
            "contactPersonNumber": "089567125542",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 13,
            "warehouseName": "Gudang Terang",
            "factoryName": "PT. Cahaya Makmur",
            "warehouseAddress": "JL. Terang No. 45, RT 003 RW 001, Ds. Terang, Bahagia, Malang",
            "contactPersonName": "Pak Cahyo",
            "contactPersonNumber": "082276119732",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 14,
            "warehouseName": "Gudang Emas",
            "factoryName": "PT. Emas Gemilang",
            "warehouseAddress": "JL. Emas No. 89, RT 001 RW 002, Ds. Emas, Makmur, Jakarta",
            "contactPersonName": "Ibu Gemilang",
            "contactPersonNumber": "082256582122",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 15,
            "warehouseName": "Gudang Bina",
            "factoryName": "PT. Bina Bersama",
            "warehouseAddress": "JL. Bina No. 10, RT 002 RW 001, Ds. Bina, Sejahtera, Bandung",
            "contactPersonName": "Pak Bina",
            "contactPersonNumber": "085721134567",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 16,
            "warehouseName": "Gudang Mutiara",
            "factoryName": "PT. Permata Sari",
            "warehouseAddress": "JL. Permata No. 5, RT 001 RW 003, Ds. Permata, Harmoni, Medan",
            "contactPersonName": "Ibu Sari",
            "contactPersonNumber": "081234567890",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 17,
            "warehouseName": "Gudang Sinar",
            "factoryName": "PT. Sinar Jaya",
            "warehouseAddress": "JL. Sinar No. 25, RT 003 RW 001, Ds. Sinar, Sejahtera, Surabaya",
            "contactPersonName": "Pak Sinar",
            "contactPersonNumber": "087612345678",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 18,
            "warehouseName": "Gudang Berseri",
            "factoryName": "PT. Berseri Makmur",
            "warehouseAddress": "JL. Berseri No. 15, RT 001 RW 002, Ds. Berseri, Bersatu, Yogyakarta",
            "contactPersonName": "Pak Berseri",
            "contactPersonNumber": "089876543210",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 19,
            "warehouseName": "Gudang Kemuning",
            "factoryName": "PT. Kemuning Harmoni",
            "warehouseAddress": "JL. Kemuning No. 30, RT 002 RW 001, Ds. Kemuning, Harmoni, Bandung",
            "contactPersonName": "Ibu Harmoni",
            "contactPersonNumber": "081234567890",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 20,
            "warehouseName": "Gudang Berjaya",
            "factoryName": "PT. Berjaya Makmur",
            "warehouseAddress": "JL. Berjaya No. 8, RT 001 RW 001, Ds. Berjaya, Sejahtera, Jakarta",
            "contactPersonName": "Pak Makmur",
            "contactPersonNumber": "087654321098",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 21,
            "warehouseName": "Gudang Surya",
            "factoryName": "PT. Surya Abadi",
            "warehouseAddress": "JL. Surya No. 18, RT 001 RW 002, Ds. Surya, Abadi, Surabaya",
            "contactPersonName": "Pak Abadi",
            "contactPersonNumber": "081298765432",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 22,
            "warehouseName": "Gudang Hijau",
            "factoryName": "PT. Hijau Makmur",
            "warehouseAddress": "JL. Hijau No. 21, RT 002 RW 001, Ds. Hijau, Makmur, Medan",
            "contactPersonName": "Pak Hijau",
            "contactPersonNumber": "089765432109",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 23,
            "warehouseName": "Gudang Pertiwi",
            "factoryName": "PT. Pertiwi Sejahtera",
            "warehouseAddress": "JL. Pertiwi No. 28, RT 001 RW 003, Ds. Pertiwi, Sejahtera, Bandung",
            "contactPersonName": "Ibu Pertiwi",
            "contactPersonNumber": "082187654321",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 24,
            "warehouseName": "Gudang Sukajaya",
            "factoryName": "PT. Sukajaya Harmoni",
            "warehouseAddress": "JL. Sukajaya No. 35, RT 002 RW 001, Ds. Sukajaya, Harmoni, Surabaya",
            "contactPersonName": "Pak Sukajaya",
            "contactPersonNumber": "087856432109",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 25,
            "warehouseName": "Gudang Alam",
            "factoryName": "PT. Alam Sejahtera",
            "warehouseAddress": "JL. Alam No. 12, RT 001 RW 002, Ds. Alam, Sejahtera, Jakarta",
            "contactPersonName": "Pak Alam",
            "contactPersonNumber": "081256789012",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 26,
            "warehouseName": "Gudang Bina Makmur",
            "factoryName": "PT. Bina Makmur Jaya",
            "warehouseAddress": "JL. Bina Makmur No. 9, RT 002 RW 001, Ds. Bina Makmur, Makmur, Bandung",
            "contactPersonName": "Pak Bina Makmur",
            "contactPersonNumber": "082298765432",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 27,
            "warehouseName": "Gudang Maju",
            "factoryName": "PT. Maju Bersama",
            "warehouseAddress": "JL. Maju No. 6, RT 003 RW 001, Ds. Maju, Bersama, Surabaya",
            "contactPersonName": "Pak Maju",
            "contactPersonNumber": "081276543210",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 28,
            "warehouseName": "Gudang Hijau Indah",
            "factoryName": "PT. Hijau Indah Makmur",
            "warehouseAddress": "JL. Hijau Indah No. 14, RT 001 RW 002, Ds. Hijau Indah, Makmur, Medan",
            "contactPersonName": "Pak Hijau Indah",
            "contactPersonNumber": "089876543210",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 29,
            "warehouseName": "Gudang Surya Abadi",
            "factoryName": "PT. Surya Abadi Jaya",
            "warehouseAddress": "JL. Surya Abadi No. 23, RT 001 RW 003, Ds. Surya Abadi, Jaya, Bandung",
            "contactPersonName": "Pak Surya Abadi",
            "contactPersonNumber": "081298765432",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 30,
            "warehouseName": "Gudang Sejahtera",
            "factoryName": "PT. Sejahtera Makmur",
            "warehouseAddress": "JL. Sejahtera No. 3, RT 002 RW 001, Ds. Sejahtera, Makmur, Jakarta",
            "contactPersonName": "Pak Sejahtera",
            "contactPersonNumber": "082187654321",
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
                    <h1 className="text-xl my-3">List Gudang</h1>
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

export default ListGudang