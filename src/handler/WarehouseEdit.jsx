import React, { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import axios from 'axios'

function WarehouseEdit({ id, warehouseData }) {
    const token = localStorage.getItem('Authorization');
    const [warehouseName, setWarehouseName] = useState('');
    const [factoryName, setFactoryName] = useState('');
    const [warehouseAddress, setWarehouseAddress] = useState('')
    const [contactPersonName, setContactPersonName] = useState('')
    const [contactPersonNumber, setContactPersonNumber] = useState('')

    useEffect(() => {
        if (warehouseData) {
            setWarehouseName(warehouseData.warehouseName || '');
            setFactoryName(warehouseData.factoryName || '');
            setWarehouseAddress(warehouseData.warehouseAddress || '')
            setContactPersonName(warehouseData.contactPersonName || '')
            setContactPersonNumber(warehouseData.contactPersonNumber || '')
        }
    }, [warehouseData]);

    const dataPreview = `
    <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nama Gudang :</label>
        <input id="swal-input1" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="warehouseName" value="${warehouseName}" placeholder="Nama Gudang" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nama Pabrik :</label>
        <input id="swal-input2" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="factoryName" value="${factoryName}" placeholder="Nama Pabrik" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Alamat Gudang :</label>
        <input id="swal-input3" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="warehouseAddress" value="${warehouseAddress}" placeholder="Alamat Gudang" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Contact Person :</label>
        <input id="swal-input4" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="contactPersonName" value="${contactPersonName}" placeholder="Nama Contact Person" />
    </div>
    <div class="flex flex-col gap-1 mb-2">
        <label class="text-left font-medium">Nomer Telfon :</label>
        <input id="swal-input5" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" name="contactPersonNumber" value="${contactPersonNumber}" placeholder="Nomer Telfon" />
    </div>
    </div>
    `
    const handleClick = () => {
        Swal.fire({
            title: 'Edit Gudang',
            html: dataPreview,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            preConfirm: () => {
                const warehouseName = Swal.getPopup().querySelector('#swal-input1').value
                const factoryName = Swal.getPopup().querySelector('#swal-input2').value
                const warehouseAddress = Swal.getPopup().querySelector('#swal-input3').value
                const contactPersonName = Swal.getPopup().querySelector('#swal-input4').value
                const contactPersonNumber = Swal.getPopup().querySelector('#swal-input5').value
                if (!warehouseName || !factoryName || !warehouseAddress || !contactPersonName || !contactPersonNumber) {
                    Swal.showValidationMessage(`Please fill all the required fields`)
                } else {
                    const updatedData = {
                        warehouseName: warehouseName,
                        factoryName: factoryName,
                        warehouseAddress: warehouseAddress,
                        contactPersonName: contactPersonName,
                        contactPersonNumber: contactPersonNumber
                    }
                    axios.put(`http://localhost:3000/warehouses/update/${id}`, updatedData, {
                        headers: {
                            Authorization: `${token}`
                        }
                    }).then((res) => {
                        if (res.data.updatedWarehouse) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Data berhasil diubah',
                                icon: 'success',
                                confirmButtonText: 'Ok',
                                didClose: () => {
                                    window.location.reload();
                                }
                            })
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: res.data.message,
                                icon: 'error',
                                confirmButtonText: 'Ok',
                            })
                        }
                    }).catch((err) => {
                        Swal.fire({
                            title: 'Error!',
                            text: err.message,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        })
                    })
                }
            },
        })
    }

    return (
        <PencilIcon className="w-5 h-5 text-green-700 cursor-pointer" onClick={handleClick} />
    )
}

export default WarehouseEdit