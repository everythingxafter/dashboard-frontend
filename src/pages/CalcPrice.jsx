import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Listbox } from '@headlessui/react';

function CalcPrice() {
    const [pbmBongkarSuppliers, setPbmBongkarSuppliers] = useState([]);
    const [pbmMuatSuppliers, setPbmMuatSuppliers] = useState([]);
    const [truckingSuppliers, setTruckingSuppliers] = useState([]);
    const [kapalSuppliers, setKapalSuppliers] = useState([]);
    const [selectedSupplierBongkar, setSelectedSupplierBongkar] = useState(null);
    const [selectedSupplierMuat, setSelectedSupplierMuat] = useState(null);
    const [selectedSupplierTrucking, setSelectedSupplierTrucking] = useState(null);
    const [selectedSupplierKapal, setSelectedSupplierKapal] = useState(null);


    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const token = localStorage.getItem('Authorization');
                const response = await axios.get('http://localhost:3000/suppliers/read', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                const pbmBongkarSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'PBM Bongkar'
                );

                const pbmMuatSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'PBM Muat'
                );

                const truckingSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'Trucking'
                );

                const kapalSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'Kapal'
                );

                setPbmBongkarSuppliers(pbmBongkarSuppliers);
                setPbmMuatSuppliers(pbmMuatSuppliers);
                setTruckingSuppliers(truckingSuppliers);
                setKapalSuppliers(kapalSuppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);


    return (
        <section className="flex flex-col">
            <div className="px-5 bg-white rounded-lg shadow-md w-4/5 mx-auto mt-10 p-10">
                <div>
                    <div className='border-slate-200 border-b-[1px] pb-2 mb-4'>
                        <h1>PBM Bongkar Suppliers</h1>
                        <Listbox as="div" className="my-2">
                            <Listbox.Label className="block text-gray-700 mb-2 text-sm">Select PBM Bongkar Supplier:</Listbox.Label>
                            <Listbox.Button
                                as="button"
                                className="px-1 py-2 w-1/3 bg-white text-gray-900 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            >
                                {selectedSupplierBongkar ? selectedSupplierBongkar.supplierName : 'Select a Supplier'}
                            </Listbox.Button>
                            <Listbox.Options as="ul" className="w-1/3 mt-2 py-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                {pbmBongkarSuppliers.map(supplier => (
                                    <Listbox.Option key={supplier.id} value={supplier}>
                                        {({ active, selected }) => (
                                            <li
                                                className={`cursor-pointer select-none py-2 px-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`}
                                                onClick={() => setSelectedSupplierBongkar(supplier)}
                                            >
                                                {supplier.supplierName}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                        {selectedSupplierBongkar && (
                            <div className='flex flex-col'>
                                <div className='flex w-full'>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-x-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Supplier name :</p>
                                        <p className='font-medium'>{selectedSupplierBongkar ? selectedSupplierBongkar.supplierName : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Destination :</p>
                                        <p className='font-medium'>{selectedSupplierBongkar ? selectedSupplierBongkar.destination : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Keterangan :</p>
                                        <p className='font-medium'>{selectedSupplierBongkar ? selectedSupplierBongkar.keterangan : "-"}</p>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <div className='flex my-2 p-1 w-1/2'>
                                        <p className='text-xs text-slate-600 italic'>Dibuat : <span>{selectedSupplierBongkar ? selectedSupplierBongkar.createdAt : "-"}</span> </p>
                                    </div>
                                    <div className="flex w-full gap-4 justify-end items-center">
                                        <label htmlFor="Price" className='font-semibold'>Price :</label>
                                        <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={selectedSupplierBongkar.price} placeholder="Price" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='border-slate-200 border-b-[1px] pb-2 mb-4'>
                        <h1>PBM Muat Suppliers</h1>
                        <Listbox as="div" className="my-2">
                            <Listbox.Label className="block text-gray-700 mb-2 text-sm">Select PBM Muat Supplier:</Listbox.Label>
                            <Listbox.Button
                                as="button"
                                className="px-1 py-2 w-1/3 bg-white text-gray-900 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            >
                                {selectedSupplierMuat ? selectedSupplierMuat.supplierName : 'Select a Supplier'}
                            </Listbox.Button>
                            <Listbox.Options as="ul" className="w-1/3 mt-2 py-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                {pbmMuatSuppliers.map(supplier => (
                                    <Listbox.Option key={supplier.id} value={supplier}>
                                        {({ active, selected }) => (
                                            <li
                                                className={`cursor-pointer select-none py-2 px-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`}
                                                onClick={() => setSelectedSupplierMuat(supplier)}
                                            >
                                                {supplier.supplierName}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                        {selectedSupplierMuat && (
                            <div className='flex flex-col'>
                                <div className='flex w-full'>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-x-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Supplier name :</p>
                                        <p className='font-medium'>{selectedSupplierMuat ? selectedSupplierMuat.supplierName : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Destination :</p>
                                        <p className='font-medium'>{selectedSupplierMuat ? selectedSupplierMuat.destination : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Keterangan :</p>
                                        <p className='font-medium'>{selectedSupplierMuat ? selectedSupplierMuat.keterangan : "-"}</p>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <div className='flex my-2 p-1 w-1/2'>
                                        <p className='text-xs text-slate-600 italic'>Dibuat : <span>{selectedSupplierMuat ? selectedSupplierMuat.createdAt : "-"}</span> </p>
                                    </div>
                                    <div className="flex w-full gap-4 justify-end items-center">
                                        <label htmlFor="Price" className='font-semibold'>Price :</label>
                                        <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={selectedSupplierMuat.price} placeholder="Price" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='border-slate-200 border-b-[1px] pb-2 mb-4'>
                        <h1>Trucking Suppliers</h1>
                        <Listbox as="div" className="my-2">
                            <Listbox.Label className="block text-gray-700 mb-2 text-sm">Select Trucking Supplier:</Listbox.Label>
                            <Listbox.Button
                                as="button"
                                className="px-1 py-2 w-1/3 bg-white text-gray-900 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            >
                                {selectedSupplierTrucking ? selectedSupplierTrucking.supplierName : 'Select a Supplier'}
                            </Listbox.Button>
                            <Listbox.Options as="ul" className="w-1/3 mt-2 py-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                {truckingSuppliers.map(supplier => (
                                    <Listbox.Option key={supplier.id} value={supplier}>
                                        {({ active, selected }) => (
                                            <li
                                                className={`cursor-pointer select-none py-2 px-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`}
                                                onClick={() => setSelectedSupplierTrucking(supplier)}
                                            >
                                                {supplier.supplierName}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                        {selectedSupplierTrucking && (
                            <div className='flex flex-col'>
                                <div className='flex w-full'>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-x-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Supplier name :</p>
                                        <p className='font-medium'>{selectedSupplierTrucking ? selectedSupplierTrucking.supplierName : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Destination :</p>
                                        <p className='font-medium'>{selectedSupplierTrucking ? selectedSupplierTrucking.destination : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Keterangan :</p>
                                        <p className='font-medium'>{selectedSupplierTrucking ? selectedSupplierTrucking.keterangan : "-"}</p>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <div className='flex my-2 p-1 w-1/2'>
                                        <p className='text-xs text-slate-600 italic'>Dibuat : <span>{selectedSupplierTrucking ? selectedSupplierTrucking.createdAt : "-"}</span> </p>
                                    </div>
                                    <div className="flex w-full gap-4 justify-end items-center">
                                        <label htmlFor="Price" className='font-semibold'>Price :</label>
                                        <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={selectedSupplierTrucking.price} placeholder="Price" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='border-slate-200 border-b-[1px] pb-2 mb-4'>
                        <h1>Kapal Suppliers</h1>
                        <Listbox as="div" className="my-2">
                            <Listbox.Label className="block text-gray-700 mb-2 text-sm">Select Kapal Supplier:</Listbox.Label>
                            <Listbox.Button
                                as="button"
                                className="px-1 py-2 w-1/3 bg-white text-gray-900 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            >
                                {selectedSupplierKapal ? selectedSupplierKapal.supplierName : 'Select a Supplier'}
                            </Listbox.Button>
                            <Listbox.Options as="ul" className="w-1/3 mt-2 py-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                {kapalSuppliers.map(supplier => (
                                    <Listbox.Option key={supplier.id} value={supplier}>
                                        {({ active, selected }) => (
                                            <li
                                                className={`cursor-pointer select-none py-2 px-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                    } ${selected ? 'font-semibold' : ''}`}
                                                onClick={() => setSelectedSupplierKapal(supplier)}
                                            >
                                                {supplier.supplierName}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                        {selectedSupplierKapal && (
                            <div className='flex flex-col'>
                                <div className='flex w-full'>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-x-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Supplier name :</p>
                                        <p className='font-medium'>{selectedSupplierKapal ? selectedSupplierKapal.supplierName : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Destination :</p>
                                        <p className='font-medium'>{selectedSupplierKapal ? selectedSupplierKapal.destination : "-"}</p>
                                    </div>
                                    <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                        <p className='text-sm text-slate-800 italic'>Keterangan :</p>
                                        <p className='font-medium'>{selectedSupplierKapal ? selectedSupplierKapal.keterangan : "-"}</p>
                                    </div>

                                </div>
                                <div className='flex'>
                                    <div className='flex my-2 p-1 w-1/2'>
                                        <p className='text-xs text-slate-600 italic'>Dibuat : <span>{selectedSupplierKapal ? selectedSupplierKapal.createdAt : "-"}</span> </p>
                                    </div>
                                    <div className="flex w-full gap-4 justify-end items-center">
                                        <label htmlFor="Price" className='font-semibold'>Price :</label>
                                        <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={selectedSupplierKapal.price} placeholder="Price" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CalcPrice