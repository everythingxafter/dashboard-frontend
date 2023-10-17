import React, { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import axios from 'axios'

function CustomerEdit({ id, cusData }) {
    const token = localStorage.getItem('Authorization');
    const [customerName, setCustomerName] = useState('');
    const [name, setName] = useState('');
    const [estate, setEstate] = useState('');
    const [region, setRegion] = useState('')
    const [price, setPrice] = useState('')
    const [service, serService] = useState('')
    const [keterangan, setKeterangan] = useState('')

    useEffect(() => {
        if (cusData) {
            setCustomerName(cusData.customerName || '');
            setName(cusData.name || '');
            setEstate(cusData.estate || '')
            setRegion(cusData.region || '')
            setPrice(cusData.price || '')
            serService(cusData.service || '')
            setKeterangan(cusData.keterangan || '')
        }
    }, [cusData]);

    const dataPreview = `
    <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Customer Name :</label>
        <input id="swal-input1" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="customerName" value="${customerName}" placeholder="Customer Name" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Group Estate Name :</label>
        <input id="swal-input2" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="name" value="${name}" placeholder="Nama PT." />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Estate :</label>
        <input id="swal-input3" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="estate" value="${estate}" placeholder="Nama Estate" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Region :</label>
        <input id="swal-input4" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="region" value="${region}" placeholder="Region" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Price / Ton :</label>
        <input id="swal-input5" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        type="text" name="price" value="${price}" placeholder="Harga Per Ton" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Service:</label>
        <select
            class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="service" id="swal-input6"
        >
            <option value="">Select a service</option>
            <option value="Port to Port" ${service === 'Port to Port' ? 'selected' : ''}>Port to Port</option>
            <option value="Door to Door" ${service === 'Door to Door' ? 'selected' : ''}>Door to Door</option>
            <option value="Port to Door" ${service === 'Port to Door' ? 'selected' : ''}>Port to Door</option>
        </select>
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Keterangan :</label>
        <input id="swal-input7" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="keterangan" value="${keterangan}" placeholder="Keterangan" />
    </div>
    </div>
    `;

    const handleClick = () => {
        Swal.fire({
            title: 'Edit Customer',
            html: dataPreview,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            preConfirm: () => {
                const updatedCustomerName = document.getElementById('swal-input1').value;
                const updatedName = document.getElementById('swal-input2').value;
                const updatedEstate = document.getElementById('swal-input3').value;
                const updatedRegion = document.getElementById('swal-input4').value;
                const updatedPrice = document.getElementById('swal-input5').value;
                const updatedService = document.getElementById('swal-input6').value;
                const updatedKeterangan = document.getElementById('swal-input7').value;


                if (!updatedCustomerName || !updatedName || !updatedEstate || !updatedRegion || !updatedPrice || !updatedService) {
                    Swal.showValidationMessage('Please fill all fields');
                } else {
                    const updatedData = {
                        customerName: updatedCustomerName,
                        name: updatedName,
                        estate: updatedEstate,
                        region: updatedRegion,
                        price: updatedPrice,
                        service: updatedService,
                        keterangan: updatedKeterangan
                    };

                    axios.put(`http://localhost:3000/customers/update/${id}`, updatedData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    }).then(response => {
                        if (response.data.updatedCustomer) {
                            Swal.fire({
                                title: 'Customer Updated !',
                                text: response.data.message,
                                icon: 'success',
                                didClose: () => {
                                    window.location.reload();
                                }
                            });
                        } else {
                            Swal.fire('Error', 'Failed to update customer', 'error');
                        }
                    }).catch(error => {
                        Swal.fire('Error', 'Failed to update customer', 'error');
                        console.error('Error updating customer:', error);
                    });
                }
            }
        })
    };
    return (
        <PencilIcon className="w-5 h-5 text-green-700 cursor-pointer" onClick={handleClick} />
    )
}

export default CustomerEdit