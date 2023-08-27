import React, { useCallback } from "react";
import Table from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import ReactModal from 'react-modal';

function ListKebun() {
    const getData = () => [
        {
            "id": 11,
            "farmName": "Kebun Cargil",
            "estate": "MILL 2 Estate",
            "farmAddress": "Desa Ratu Elok, Kecamatan Manis Mata, Kab. Ketapang, Kalimantan Barat",
            "dockName": "Pelabuhan Jaya",
            "contactPersonName": "Pak Bayu",
            "contactPersonNumber": "081312344322",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 12,
            "farmName": "Manis Mata",
            "estate": "HOPE Estate",
            "farmAddress": "Desa Raja Baik, Kecamatan Manis Mulut, Kab. Jimbaran, Bali",
            "dockName": "Pelabuhan Arto Moro",
            "contactPersonName": "Pak Wahyu",
            "contactPersonNumber": "089567125542",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 13,
            "farmName": "Subur Selalu",
            "estate": "LIGHT Estate",
            "farmAddress": "Desa Subur, Kec. Jinawa, Kab. Gerah, Sumatra Utara",
            "dockName": "Pelabuhan Tandur",
            "contactPersonName": "Pak Waluyo",
            "contactPersonNumber": "082276119732",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 14,
            "farmName": "Raja Abadi",
            "estate": "KING Estate",
            "farmAddress": "Desa Raja Sejahtera, Kec. Port, Kab. Para Raja, Sulawesi Tenggara",
            "dockName": "Pelabuhan Emas Permata",
            "contactPersonName": "Pak Rafi",
            "contactPersonNumber": "082256582122",
            "createDate": "21 February 2023",
            "editedAt": "21 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 15,
            "farmName": "Budi Makmur",
            "estate": "GROW Estate",
            "farmAddress": "Desa Sejahtera, Kec. Mawar, Kab. Perdana, Kalimantan Timur",
            "dockName": "Pelabuhan Harmoni",
            "contactPersonName": "Pak Budi",
            "contactPersonNumber": "085721134567",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 16,
            "farmName": "Cahaya Indah",
            "estate": "SUN Estate",
            "farmAddress": "Desa Terang, Kec. Surya, Kab. Serang, Banten",
            "dockName": "Pelabuhan Terang",
            "contactPersonName": "Pak Cahyo",
            "contactPersonNumber": "081234567890",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 17,
            "farmName": "Mutiara Selatan",
            "estate": "PEARL Estate",
            "farmAddress": "Desa Permata, Kec. Pantai, Kab. Permata, Sumatra Selatan",
            "dockName": "Pelabuhan Mutiara",
            "contactPersonName": "Pak Mutiara",
            "contactPersonNumber": "087612345678",
            "createDate": "22 February 2023",
            "editedAt": "22 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 18,
            "farmName": "Bersama Jaya",
            "estate": "UNITY Estate",
            "farmAddress": "Desa Harmoni, Kec. Bersatu, Kab. Satu, Papua",
            "dockName": "Pelabuhan Satu",
            "contactPersonName": "Pak Budi",
            "contactPersonNumber": "089876543210",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 19,
            "farmName": "Maju Makmur",
            "estate": "PROSPER Estate",
            "farmAddress": "Desa Maju, Kec. Maju, Kab. Maju, Jawa Tengah",
            "dockName": "Pelabuhan Maju",
            "contactPersonName": "Pak Maju",
            "contactPersonNumber": "081234567890",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 20,
            "farmName": "Bumi Indah",
            "estate": "EARTH Estate",
            "farmAddress": "Desa Bumi, Kec. Indah, Kab. Bumi, Sulawesi Utara",
            "dockName": "Pelabuhan Bumi",
            "contactPersonName": "Pak Bumi",
            "contactPersonNumber": "087654321098",
            "createDate": "23 February 2023",
            "editedAt": "23 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 21,
            "farmName": "Sinar Mentari",
            "estate": "SUNRISE Estate",
            "farmAddress": "Desa Terang, Kec. Sinar, Kab. Mentari, Maluku Utara",
            "dockName": "Pelabuhan Sinar",
            "contactPersonName": "Pak Sinar",
            "contactPersonNumber": "081298765432",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 22,
            "farmName": "Berseri Seri",
            "estate": "SHINE Estate",
            "farmAddress": "Desa Bersinar, Kec. Berseri, Kab. Bersinar, Jambi",
            "dockName": "Pelabuhan Berseri",
            "contactPersonName": "Pak Berseri",
            "contactPersonNumber": "089765432109",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 23,
            "farmName": "Kemuning Hijau",
            "estate": "GREEN Estate",
            "farmAddress": "Desa Hijau, Kec. Kemuning, Kab. Hijau, Jawa Barat",
            "dockName": "Pelabuhan Hijau",
            "contactPersonName": "Pak Hijau",
            "contactPersonNumber": "082187654321",
            "createDate": "24 February 2023",
            "editedAt": "24 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 24,
            "farmName": "Suka Jaya",
            "estate": "JOY Estate",
            "farmAddress": "Desa Sukajaya, Kec. Suka, Kab. Jaya, Lampung",
            "dockName": "Pelabuhan Suka",
            "contactPersonName": "Pak Suka",
            "contactPersonNumber": "087856432109",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 25,
            "farmName": "Harmoni Alam",
            "estate": "NATURE Estate",
            "farmAddress": "Desa Harmoni, Kec. Alam, Kab. Harmoni, Aceh",
            "dockName": "Pelabuhan Alam",
            "contactPersonName": "Pak Alam",
            "contactPersonNumber": "081256789012",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 26,
            "farmName": "Bina Makmur",
            "estate": "DEVELOP Estate",
            "farmAddress": "Desa Binaharapan, Kec. Binamaju, Kab. Makmur, Sulawesi Selatan",
            "dockName": "Pelabuhan Bina",
            "contactPersonName": "Pak Bina",
            "contactPersonNumber": "082298765432",
            "createDate": "25 February 2023",
            "editedAt": "25 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 27,
            "farmName": "Maju Terus",
            "estate": "PROGRESS Estate",
            "farmAddress": "Desa Majuberjaya, Kec. Maju, Kab. Terus, Papua Barat",
            "dockName": "Pelabuhan Terus",
            "contactPersonName": "Pak Maju",
            "contactPersonNumber": "081276543210",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Iqbal"
        },
        {
            "id": 28,
            "farmName": "Pertiwi Hijau",
            "estate": "GREEN Earth Estate",
            "farmAddress": "Desa Pertiwi, Kec. Hijau, Kab. Pertiwi, Sumatra Barat",
            "dockName": "Pelabuhan Pertiwi",
            "contactPersonName": "Pak Pertiwi",
            "contactPersonNumber": "089876543210",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Maya"
        },
        {
            "id": 29,
            "farmName": "Surya Lestari",
            "estate": "ETERNAL SUN Estate",
            "farmAddress": "Desa Surya, Kec. Abadi, Kab. Lestari, Kalimantan Selatan",
            "dockName": "Pelabuhan Surya",
            "contactPersonName": "Pak Surya",
            "contactPersonNumber": "081298765432",
            "createDate": "26 February 2023",
            "editedAt": "26 February 2023",
            "createBy": "Ahmad"
        },
        {
            "id": 30,
            "farmName": "Berjaya Sejahtera",
            "estate": "THRIVING Estate",
            "farmAddress": "Desa Berjaya, Kec. Sejahtera, Kab. Berjaya, Sulawesi Barat",
            "dockName": "Pelabuhan Berjaya",
            "contactPersonName": "Pak Berjaya",
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
                    <h1 className="text-xl my-3">List Kebun</h1>
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

export default ListKebun