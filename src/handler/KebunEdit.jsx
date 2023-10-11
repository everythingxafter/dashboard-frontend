import React, { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import axios from 'axios'

function KebunEdit({ id, farmData }) {
    const token = localStorage.getItem('Authorization');
    const [farmName, setFarmName] = useState('');
    const [estate, setEstate] = useState('');
    const [farmAddress, setFarmAddress] = useState('')
    const [dockName, setDockName] = useState('')
    const [contactPersonName, setContactPersonName] = useState('')
    const [contactPersonNumber, setContactPersonNumber] = useState('')

    useEffect(() => {
        if (farmData) {
            setFarmName(farmData.farmName || '');
            setEstate(farmData.estate || '');
            setFarmAddress(farmData.farmAddress || '')
            setDockName(farmData.dockName || '')
            setContactPersonName(farmData.contactPersonName || '')
            setContactPersonNumber(farmData.contactPersonNumber || '')
        }
    }, [farmData]);

    const dataPreview = `
    <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nama Kebun :</label>
        <input id="swal-input1" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="farmName" value="${farmName}" placeholder="Nama Kebun" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Estate :</label>
        <input id="swal-input2" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="estate" value="${estate}" placeholder="Estate" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Alamat Kebun :</label>
        <input id="swal-input3" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="farmAddress" value="${farmAddress}" placeholder="Alamat Kebun" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Dermaga Sandar :</label>
        <input id="swal-input4" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="dockName" value="${dockName}" placeholder="Dermaga Sandar" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Contact Person :</label>
        <input id="swal-input5" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="contactPersonName" value="${contactPersonName}" placeholder="Nama Contact Person" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nomer Telfon :</label>
        <input id="swal-input6" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="contactPersonNumber" value="${contactPersonNumber}" placeholder="Nomer Telfon" />
    </div>
    </div>
    `

    const handleClick = () => {
        Swal.fire({
            title: 'Edit Kebun',
            html: dataPreview,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            preConfirm: () => {
                const updatedFarmName = document.getElementById('swal-input1').value;
                const updatedEstate = document.getElementById('swal-input2').value;
                const updatedFarmAddress = document.getElementById('swal-input3').value;
                const updatedDockName = document.getElementById('swal-input4').value;
                const updatedContactPersonName = document.getElementById('swal-input5').value;
                const updatedContactPersonNumber = document.getElementById('swal-input6').value;

                if (!updatedFarmName || !updatedEstate || !updatedFarmAddress || !updatedDockName || !updatedContactPersonName || !updatedContactPersonNumber) {
                    Swal.showValidationMessage(
                        `Please complete the form`
                    )
                } else {
                    const updatedData = {
                        farmName: updatedFarmName,
                        estate: updatedEstate,
                        farmAddress: updatedFarmAddress,
                        dockName: updatedDockName,
                        contactPersonName: updatedContactPersonName,
                        contactPersonNumber: updatedContactPersonNumber,
                    }
                    axios.put(`http://localhost:3000/farms/update/${id}`, updatedData, {
                        headers: {
                            Authorization: `${token}`
                        }
                    }).then((response) => {
                        if (response.data.updatedFarm) {
                            Swal.fire({
                                title: 'Farm Updated !',
                                text: response.data.message,
                                icon: 'success',
                                didClose: () => {
                                    window.location.reload();
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed to update farm',
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

export default KebunEdit