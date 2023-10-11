import React, { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import axios from 'axios'

function SupplierEdit({ id, supData }) {
    const token = localStorage.getItem('Authorization');
    const [supplierName, setSupplierName] = useState('');
    const [supplierService, setSupplierService] = useState('');
    const [destination, setDestination] = useState('')
    const [price, setPrice] = useState('')
    const [keterangan, setKeterangan] = useState('')

    useEffect(() => {
        if (supData) {
            setSupplierName(supData.supplierName || '');
            setSupplierService(supData.supplierService || '');
            setDestination(supData.destination || '')
            setPrice(supData.price || '')
            setKeterangan(supData.keterangan || '')
        }
    }, [supData]);

    const dataPreview = `
    <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nama Supplier :</label>
        <input id="swal-input1" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="supplierName" value="${supplierName}" placeholder="Supplier Name" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Service :</label>
        <select id="swal-input2" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="supplierService"
        >
        <option value="">Select a supplier service</option>
        <option value="PBM Bongkar" ${supplierService === 'PBM Bongkar' ? 'selected' : ''}>PBM Bongkar</option>
        <option value="PBM Muat" ${supplierService === 'PBM Muat' ? 'selected' : ''}>PBM Muat</option>
        <option value="Trucking" ${supplierService === 'Trucking' ? 'selected' : ''}>Trucking</option>
        <option value="Kapal" ${supplierService === 'Kapal' ? 'selected' : ''}>Kapal</option>
        </select>
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Destination :</label>
        <input id="swal-input3" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="destination" value="${destination}" placeholder="Destination" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Price / Ton :</label>
        <input id="swal-input4" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="price" value="${price}" placeholder="Harga Per Ton" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Keterangan :</label>
        <input id="swal-input5" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="keterangan" value="${keterangan}" placeholder="Keterangan" />
    </div>
    </div>
    `

    const handleClick = () => {
        Swal.fire({
            title: 'Edit Supplier',
            html: dataPreview,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            preConfirm: () => {
                const updateSupplierName = document.getElementById('swal-input1').value;
                const updateSupplierService = document.getElementById('swal-input2').value;
                const updateDestination = document.getElementById('swal-input3').value;
                const updatePrice = document.getElementById('swal-input4').value;
                const updateKeterangan = document.getElementById('swal-input5').value;

                if (!updateSupplierName || !updateSupplierService || !updateDestination || !updatePrice || !updateKeterangan) {
                    Swal.showValidationMessage(`Please fill all the required fields`)
                } else {
                    const updatedData = {
                        supplierName: updateSupplierName,
                        supplierService: updateSupplierService,
                        destination: updateDestination,
                        price: updatePrice,
                        keterangan: updateKeterangan
                    }

                    axios.put(`http://localhost:3000/suppliers/update/${id}`, updatedData, {
                        headers: {
                            Authorization: `${token}`
                        }
                    }).then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Supplier has been updated',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            window.location.reload();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to update supplier',
                                text: 'Something went wrong!'
                            })
                        }
                    }).catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err
                        })
                    })
                }
            }
        })
    }

    return (
        <PencilIcon className="w-5 h-5 text-green-700 cursor-pointer" onClick={handleClick} />
    )
}

export default SupplierEdit