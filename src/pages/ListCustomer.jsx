import React, { useCallback } from "react";
import Table, { SelectColumnFilter } from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import ReactModal from 'react-modal';

function ListCustomer() {
    const getData = () => [
        {
            id: '1',
            customerName: "PT. Maju Jaya",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Port to Port',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '2',
            customerName: "PT. Koloni Radja",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SERANAU',
            region: 'Gresik - Sampit',
            price: 715000,
            status: 'Port to Port',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '3',
            customerName: "PT. Visi Misi Djaya",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'BUKIT LIMAS',
            region: 'Gresik - Sampit',
            price: 720000,
            status: 'Port to Port',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '4',
            customerName: "PT. Murah Meriah",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'BUKIT LINANG',
            region: 'Gresik - Sampit',
            price: 730000,
            status: 'Port to Port',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '5',
            customerName: "PT. Selangkah Kedepan",
            name: 'PT. Maju Aneka Sawi',
            estate: 'TANAH MAS',
            region: 'Gresik - Sampit',
            price: 635000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Iqbal',
            keterangan: '-',
        },
        {
            id: '6',
            customerName: "PT. Jaya Makmur",
            name: 'PT. Maju Aneka Sawi',
            estate: 'SARIMAS.1',
            region: 'Gresik - Sampit',
            price: 730000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Iqbal',
            keterangan: '-',
        },
        {
            id: '7',
            customerName: "PT. Sukses Makmur",
            name: 'PT. Maju Aneka Sawi',
            estate: 'SARIMAS.2',
            region: 'Gresik - Sampit',
            price: 730000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Iqbal',
            keterangan: '-',
        },
        {
            id: '8',
            customerName: "PT. Inti Sukses",
            name: 'PT. Maju Aneka Sawi',
            estate: 'Bakung mas',
            region: 'Gresik - Sampit',
            price: 760000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Iqbal',
            keterangan: '-',
        },
        {
            id: '9',
            customerName: "PT. San Marino",
            name: 'PT. Globalindo Alam Perkasa',
            estate: 'ALAM SAHARA',
            region: 'Gresik - Sampit',
            price: 690000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Bagong',
            keterangan: '-',
        },
        {
            id: '10',
            customerName: "PT. Jaya Abadi",
            name: 'PT. Globalindo Alam Perkasa',
            estate: 'ALAM SUTERA',
            region: 'Gresik - Sampit',
            price: 761000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Bagong',
            keterangan: '-',
        },
        {
            id: '11',
            customerName: "PT. Kasil Terus",
            name: 'PT. Globalindo Alam Perkasa',
            estate: 'ALAM GHOIB',
            region: 'Gresik - Sampit',
            price: 510000,
            status: 'Port to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Bagong',
            keterangan: '-',
        },
        {
            id: '12',
            customerName: "PT. Sukses Terus",
            name: 'PT. Globalindo Alam Perkasa',
            estate: 'SERUSA',
            region: 'Gresik - Sampit',
            price: 960000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Bagong',
            keterangan: '-',
        },
        {
            id: '13',
            customerName: "PT. Surya Jelita",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '14',
            customerName: "PT. Gudang Garam",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '15',
            customerName: "PT. Kucing Manja",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '16',
            customerName: "PT. Kucing Nakal",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '17',
            customerName: "PT. Sukses Selalu",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '18',
            customerName: "PT. Maju Mundur",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '19',
            customerName: "PT. Harapan Ayah",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
        },
        {
            id: '20',
            customerName: "PT. Harapan Ibu",
            name: 'PT. Sukajadi Sawit Mekar',
            estate: 'SEBABI',
            region: 'Gresik - Sampit',
            price: 710000,
            status: 'Door to Door',
            createDate: '21 February 2023',
            editedAt: '21 February 2023',
            createBy: 'Maya',
            keterangan: '-',
            keterangan1: 'ini keterangan 2',
        },
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
                Header: "Nama Customer",
                accessor: "customerName"
            },
            {
                Header: "Name",
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
                Cell: ({ value }) => (
                    <span>{`Rp. ${value.toLocaleString('id-ID')},-`}</span>
                ),
            },
            {
                Header: "Status",
                accessor: "status",
                Filter: SelectColumnFilter,
                filter: "includes"
            },
            {
                Header: "Tanggal",
                accessor: "createDate",
            },
            {
                Header: "Keterangan",
                accessor: "keterangan",
            },
            {
                Header: "Di buat",
                accessor: "createBy",
            },
            {
                Header: "Action",
                accessor: "id", // You can use any unique identifier here
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(row.original.id)} // Implement your edit logic here
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
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
                    <h1 className="text-xl my-3">List Customer</h1>
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

export default ListCustomer