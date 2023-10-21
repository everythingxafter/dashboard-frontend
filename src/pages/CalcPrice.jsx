import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDoubleDownIcon } from '@heroicons/react/solid';
import CurrencyInput from 'react-currency-input-field';

function CalcPrice() {
    const [pbmBongkarSuppliers, setPbmBongkarSuppliers] = useState([]);
    const [pbmMuatSuppliers, setPbmMuatSuppliers] = useState([]);
    const [truckingSuppliers, setTruckingSuppliers] = useState([]);
    const [kapalSuppliers, setKapalSuppliers] = useState([]);
    const [selectedSupplierBongkar, setSelectedSupplierBongkar] = useState(null);
    const [selectedSupplierMuat, setSelectedSupplierMuat] = useState(null);
    const [selectedSupplierTrucking, setSelectedSupplierTrucking] = useState(null);
    const [selectedSupplierKapal, setSelectedSupplierKapal] = useState(null);
    const [queryPBMBongkar, setQueryPBMBongkar] = useState('');
    const [queryPBMMuat, setQueryPBMMuat] = useState('');
    const [queryTrucking, setQueryTrucking] = useState('');
    const [queryKapal, setQueryKapal] = useState('');
    const [variablePriceOne, setVariablePriceOne] = useState(0);
    const [variablePriceTwo, setVariablePriceTwo] = useState(0);


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
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const pbmMuatSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'PBM Muat'
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const truckingSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'Trucking'
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                const kapalSuppliers = response.data.suppliers.filter(
                    supplier => supplier.supplierService === 'Kapal'
                ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

    const filterPBMBongkar = queryPBMBongkar === ''
        ? pbmBongkarSuppliers
        : pbmBongkarSuppliers.filter(pbmBongkarSuppliers => pbmBongkarSuppliers.supplierName.toLowerCase().includes(queryPBMBongkar.toLowerCase()));

    const filterPBMMuat = queryPBMMuat === ''
        ? pbmMuatSuppliers
        : pbmMuatSuppliers.filter(pbmMuatSuppliers => pbmMuatSuppliers.supplierName.toLowerCase().includes(queryPBMMuat.toLowerCase()));

    const filterTrucking = queryTrucking === ''
        ? truckingSuppliers
        : truckingSuppliers.filter(truckingSuppliers => truckingSuppliers.supplierName.toLowerCase().includes(queryTrucking.toLowerCase()));

    const filterKapal = queryKapal === ''
        ? kapalSuppliers
        : kapalSuppliers.filter(kapalSuppliers => kapalSuppliers.supplierName.toLowerCase().includes(queryKapal.toLowerCase()));

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-EN').format(price);
    }

    const formatDate = (date) => {
        const timestamp = Date.parse(date);
        if (isNaN(timestamp)) {
            return '';
        }
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(timestamp);
        return formattedDate;
    }

    const [inputCount, setInputCount] = useState(0);
    const [inputValues, setInputValues] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const handleAddInput = () => {
        setInputCount(inputCount + 1);
        calculateTotalValue();
    };

    const handleInputChange = (e, index) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value;
        setInputValues(newInputValues);
        calculateTotalValue();
    };

    const calculateTotalValue = () => {
        const selectedSupplierPrices = {
            bongkar: selectedSupplierBongkar ? selectedSupplierBongkar.price : 0,
            muat: selectedSupplierMuat ? selectedSupplierMuat.price : 0,
            trucking: selectedSupplierTrucking ? selectedSupplierTrucking.price : 0,
            kapal: selectedSupplierKapal ? selectedSupplierKapal.price : 0,
        };

        const inputTotal = inputValues.reduce((acc, value) => acc + parseFloat(value) || 0, 0);

        const total =
            Object.values(selectedSupplierPrices).reduce((acc, price) => acc + price, 0) + inputTotal;

        setTotalValue(total);
    };

    const bongkarPrice = selectedSupplierBongkar && selectedSupplierBongkar.price || '0';
    const muatPrice = selectedSupplierMuat && selectedSupplierMuat.price || '0';
    const truckingPrice = selectedSupplierTrucking && selectedSupplierTrucking.price || '0';
    const kapalPrice = selectedSupplierKapal && selectedSupplierKapal.price || '0';
    // const variablePriceOnePrice = parseInt(variablePriceOne.replace(/\./g, ''), 10);
    // const variablePriceTwoPrice = parseInt(variablePriceTwo.replace(/\./g, ''), 10);

    // const bongkarPriceFormat = parseFloat(bongkarPrice.replace(/\./g, ''));

    const total = (
        parseFloat(bongkarPrice) +
        parseFloat(muatPrice) +
        parseFloat(truckingPrice) +
        parseFloat(kapalPrice) +
        parseFloat(variablePriceOne) +
        parseFloat(variablePriceTwo)
    );

    const formattedTotalNumber = Number(total).toLocaleString('id-ID');
    console.log(formattedTotalNumber);

    const grandTotal = total * 1.15

    const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
    const formattedGrandTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(grandTotal);


    return (
        <section className="flex flex-col bg-slate-100">
            <div className="px-5 bg-white rounded-lg shadow-md w-4/5 mx-auto mt-2 p-10 mb-10">
                <div className='border-b pb-4'>
                    <h1 className='font-medium text-center text-lg'>Kalkulator Harga</h1>
                </div>
                <div className='border-b pb-4 mt-2'>
                    <div className='py-2 mx-2'>
                        <h1 className='font-medium'>PBM Bongkar Suppliers</h1>
                        <p className='text-xs text-slate-600'>Select PBM Bongkar Supplier :</p>
                    </div>
                    <Combobox value={selectedSupplierBongkar} onChange={setSelectedSupplierBongkar}>
                        <div className="absolute w-1/4 mb-8 cursor-default overflow-hidden rounded-lg hover:border-0 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                onChange={(e) => setQueryPBMBongkar(e.target.value)}
                                displayValue={(selectedSupplierBongkar) => selectedSupplierBongkar?.supplierName}
                                placeholder="Select a Supplier"
                            />
                            <Combobox.Button className="absolute inset-y-2 right-0 flex pr-2">
                                <ChevronDoubleDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryPBMBongkar('')}
                            >
                                <Combobox.Options className="static max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filterPBMBongkar.length === 0 && queryPBMBongkar !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filterPBMBongkar.map((supplier) => (
                                            <Combobox.Option
                                                key={supplier.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={supplier}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {supplier.supplierName}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                    <div className='pt-12'>
                        <div className='flex flex-col'>
                            <div className='flex w-full'>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px] flex flex-col justify-center'>
                                    <p className='text-xs text-slate-800 italic'>Supplier name :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierBongkar && (selectedSupplierBongkar ? selectedSupplierBongkar.supplierName : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px] flex flex-col justify-center'>
                                    <p className='text-xs text-slate-800 italic'>Destination :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierBongkar && (selectedSupplierBongkar ? selectedSupplierBongkar.destination : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4 flex flex-col justify-center'>
                                    <p className='text-xs text-slate-800 italic'>Keterangan :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierBongkar && (selectedSupplierBongkar ? selectedSupplierBongkar.keterangan : "-")}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex p-1 w-1/2'>
                                    <p className='text-xs text-slate-600 italic'>Dibuat : <span>{formatDate(selectedSupplierBongkar && (selectedSupplierBongkar ? selectedSupplierBongkar.createdAt : "-"))}</span> </p>
                                </div>
                                <div className="flex w-full gap-4 justify-end items-center">
                                    <label htmlFor="Price" className='font-semibold'>Price :</label>
                                    {/* <input
                                        className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        value={formatPrice(selectedSupplierBongkar && (selectedSupplierBongkar ? selectedSupplierBongkar.price : '0'))}
                                        placeholder="Price"
                                        onChange={(e) => {
                                            const newPrice = e.target.value;
                                            formatPrice(newPrice);
                                            console.log(newPrice);
                                            setSelectedSupplierBongkar(prevState => ({
                                                ...prevState,
                                                price: newPrice
                                            }));

                                        }}
                                    /> */}
                                    <CurrencyInput
                                        id="price-bongkar"
                                        name="price-bongkar"
                                        className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={bongkarPrice}
                                        onValueChange={(value) => {
                                            setSelectedSupplierBongkar(prevState => ({
                                                ...prevState,
                                                price: value
                                            }))
                                        }}
                                        prefix="IDR "
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b pb-4 mt-2'>
                    <div className='py-2 mx-2'>
                        <h1 className='font-medium'>PBM Muat Suppliers</h1>
                        <p className='text-xs text-slate-600'>Select PBM Muat Supplier :</p>
                    </div>
                    <Combobox value={selectedSupplierMuat} onChange={setSelectedSupplierMuat}>
                        <div className="absolute w-1/4 mb-8 cursor-default overflow-hidden rounded-lg hover:border-0 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                onChange={(e) => setQueryPBMMuat(e.target.value)}
                                displayValue={(selectedSupplierMuat) => selectedSupplierMuat?.supplierName}
                                placeholder="Select a Supplier"
                            />
                            <Combobox.Button className="absolute inset-y-2 right-0 flex pr-2">
                                <ChevronDoubleDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryPBMMuat('')}
                            >
                                <Combobox.Options className="static max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filterPBMMuat.length === 0 && queryPBMMuat !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filterPBMMuat.map((supplier) => (
                                            <Combobox.Option
                                                key={supplier.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={supplier}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {supplier.supplierName}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                    <div className='pt-12'>
                        <div className='flex flex-col'>
                            <div className='flex w-full'>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Supplier name :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierMuat && (selectedSupplierMuat ? selectedSupplierMuat.supplierName : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Destination :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierMuat && (selectedSupplierMuat ? selectedSupplierMuat.destination : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4'>
                                    <p className='text-xs text-slate-800 italic'>Keterangan :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierMuat && (selectedSupplierMuat ? selectedSupplierMuat.keterangan : "-")}</p>
                                </div>

                            </div>
                            <div className='flex'>
                                <div className='flex my-2 p-1 w-1/2'>
                                    <p className='text-xs text-slate-600 italic'>Dibuat : <span>{formatDate(selectedSupplierMuat && (selectedSupplierMuat ? selectedSupplierMuat.createdAt : "-"))}</span> </p>
                                </div>
                                <div className="flex w-full gap-4 justify-end items-center">
                                    <label htmlFor="Price" className='font-semibold'>Price :</label>
                                    {/* <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={formatPrice(selectedSupplierMuat && (selectedSupplierMuat ? selectedSupplierMuat.price : null))} placeholder="Price" /> */}
                                    <CurrencyInput
                                        id="price-muat"
                                        name="price-muat"
                                        className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={muatPrice}
                                        onValueChange={(value) => {
                                            setSelectedSupplierMuat(prevState => ({
                                                ...prevState,
                                                price: value
                                            }))
                                            return value;
                                        }}
                                        prefix="IDR "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b pb-4 mt-2'>
                    <div className='py-2 mx-2'>
                        <h1 className='font-medium'>Trucking Suppliers</h1>
                        <p className='text-xs text-slate-600'>Select Trucking Supplier :</p>
                    </div>
                    <Combobox value={selectedSupplierTrucking} onChange={setSelectedSupplierTrucking}>
                        <div className="absolute w-1/4 mb-8 cursor-default overflow-hidden rounded-lg hover:border-0 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                onChange={(e) => setQueryTrucking(e.target.value)}
                                displayValue={(selectedSupplierTrucking) => selectedSupplierTrucking?.supplierName}
                                placeholder="Select a Supplier"
                            />
                            <Combobox.Button className="absolute inset-y-2 right-0 flex pr-2">
                                <ChevronDoubleDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryTrucking('')}
                            >
                                <Combobox.Options className="static max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filterTrucking.length === 0 && queryTrucking !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filterTrucking.map((supplier) => (
                                            <Combobox.Option
                                                key={supplier.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={supplier}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {supplier.supplierName}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                    <div className='pt-12'>
                        <div className='flex flex-col'>
                            <div className='flex w-full'>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Supplier name :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierTrucking && (selectedSupplierTrucking ? selectedSupplierTrucking.supplierName : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Destination :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierTrucking && (selectedSupplierTrucking ? selectedSupplierTrucking.destination : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4'>
                                    <p className='text-xs text-slate-800 italic'>Keterangan :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierTrucking && (selectedSupplierTrucking ? selectedSupplierTrucking.keterangan : "-")}</p>
                                </div>

                            </div>
                            <div className='flex'>
                                <div className='flex my-2 p-1 w-1/2'>
                                    <p className='text-xs text-slate-600 italic'>Dibuat : <span>{formatDate(selectedSupplierTrucking && (selectedSupplierTrucking ? selectedSupplierTrucking.createdAt : "-"))}</span> </p>
                                </div>
                                <div className="flex w-full gap-4 justify-end items-center">
                                    <label htmlFor="Price" className='font-semibold'>Price :</label>
                                    {/* <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={formatPrice(selectedSupplierTrucking && (selectedSupplierTrucking ? selectedSupplierTrucking.price : null))} placeholder="Price" /> */}
                                    <CurrencyInput
                                        id="price-trucking"
                                        name="price-trucking"
                                        className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={truckingPrice}
                                        onValueChange={(value) => {
                                            setSelectedSupplierTrucking(prevState => ({
                                                ...prevState,
                                                price: value
                                            }))
                                            return value;
                                        }}
                                        prefix="IDR "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b pb-4 mt-2'>
                    <div className='py-2 mx-2'>
                        <h1 className='font-medium'>Kapal Suppliers</h1>
                        <p className='text-xs text-slate-600'>Select Kapal Supplier :</p>
                    </div>
                    <Combobox value={selectedSupplierKapal} onChange={setSelectedSupplierKapal}>
                        <div className="absolute w-1/4 mb-8 cursor-default overflow-hidden rounded-lg hover:border-0 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 rounded-lg focus:ring-red-600 focus-visible:ring-red-700 focus:ring-0"
                                onChange={(e) => setQueryKapal(e.target.value)}
                                displayValue={(selectedSupplierKapal) => selectedSupplierKapal?.supplierName}
                                placeholder="Select a Supplier"
                            />
                            <Combobox.Button className="absolute inset-y-2 right-0 flex pr-2">
                                <ChevronDoubleDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryKapal('')}
                            >
                                <Combobox.Options className="static max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filterKapal.length === 0 && queryKapal !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filterKapal.map((supplier) => (
                                            <Combobox.Option
                                                key={supplier.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={supplier}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {supplier.supplierName}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
                    <div className='pt-12'>
                        <div className='flex flex-col'>
                            <div className='flex w-full'>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Supplier name :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierKapal && (selectedSupplierKapal ? selectedSupplierKapal.supplierName : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4 border-slate-400 border-r-[1px]'>
                                    <p className='text-xs text-slate-800 italic'>Destination :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierKapal && (selectedSupplierKapal ? selectedSupplierKapal.destination : "-")}</p>
                                </div>
                                <div className='my-2 p-1 w-1/4'>
                                    <p className='text-xs text-slate-800 italic'>Keterangan :</p>
                                    <p className='font-medium text-sm'>{selectedSupplierKapal && (selectedSupplierKapal ? selectedSupplierKapal.keterangan : "-")}</p>
                                </div>

                            </div>
                            <div className='flex'>
                                <div className='flex my-2 p-1 w-1/2'>
                                    <p className='text-xs text-slate-600 italic'>Dibuat : <span>{formatDate(selectedSupplierKapal && (selectedSupplierKapal ? selectedSupplierKapal.createdAt : "-"))}</span> </p>
                                </div>
                                <div className="flex w-full gap-4 justify-end items-center">
                                    <label htmlFor="Price" className='font-semibold'>Price :</label>
                                    {/* <input className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={formatPrice(selectedSupplierKapal && (selectedSupplierKapal ? selectedSupplierKapal.price : null))} placeholder="Price" /> */}
                                    <CurrencyInput
                                        id="price-kapal"
                                        name="price-kapal"
                                        className="shadow-md appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={kapalPrice}
                                        onValueChange={(value) => {
                                            setSelectedSupplierKapal(prevState => ({
                                                ...prevState,
                                                price: value
                                            }))
                                            return value;
                                        }}
                                        prefix="IDR "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* // i wanna make a two input, the first input is text and the second is Number
                // the first input is for the name of the supplier and the second is for the price */}
                <div className='flex flex-col items-end w-full gap-5 mt-4'>
                    <div className='gap-2 flex flex-col'>
                        <label htmlFor="price" className='font-semibold'>Tambahan Biaya 1 :</label>
                        <CurrencyInput
                            id="price-variable-one"
                            name="price-variable-one"
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={variablePriceOne}
                            onValueChange={(value) => {
                                setVariablePriceOne(value)
                                console.log(variablePriceOne);
                            }}
                            prefix="IDR "
                        />
                    </div>
                    <div className='gap-2 flex flex-col'>
                        <label htmlFor="price" className='font-semibold'>Tambahan Biaya 2 :</label>
                        <CurrencyInput
                            id="price-variable-two"
                            name="price-variable-two"
                            className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={variablePriceTwo}
                            onValueChange={(value) => {
                                setVariablePriceTwo(value)
                            }}
                            prefix="IDR "
                        />
                    </div>
                </div>

                <div className='flex w-full justify-end'>
                    <div className='mt-2 p-1 w-1/3 flex justify-end items-center'>
                        <div className='pr-2'>
                            <p className='text-md text-slate-600 italic'>Price :</p>
                        </div>
                        <div>
                            <p className='font-medium text-md text-slate-600'>
                                {/* {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                    (selectedSupplierBongkar && selectedSupplierBongkar.price || 0) +
                                    (selectedSupplierMuat && selectedSupplierMuat.price || 0) +
                                    (selectedSupplierTrucking && selectedSupplierTrucking.price || 0) +
                                    (selectedSupplierKapal && selectedSupplierKapal.price || 0)
                                )} */}
                                {formattedTotal}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-end'>
                    <div className='mt-2 p-1 w-1/3 flex justify-end items-center'>
                        <div className='pr-2 flex flex-col'>
                            <p className='text-lg text-slate-800 italic'>Total Price :</p>
                            <p className='text-sm text-slate-500 italic'>(Harga x 1.15)</p>
                        </div>
                        <div>
                            <p className='font-medium text-lg'>
                                {/* {new Intl.NumberFormat('id-ID').format(
                                    ((selectedSupplierBongkar && selectedSupplierBongkar.price || null) +
                                        (selectedSupplierMuat && selectedSupplierMuat.price || null) +
                                        (selectedSupplierTrucking && selectedSupplierTrucking.price || null) +
                                        (selectedSupplierKapal && selectedSupplierKapal.price || null)) * 1.15
                                )} */}
                                {formattedGrandTotal}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CalcPrice