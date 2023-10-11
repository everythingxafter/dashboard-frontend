import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

function WarehouseDelete({ id, warehouseData }) {
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

    const handleDelete = () => {
        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Warehouse Name:</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${warehouseData.warehouseName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Factory Name:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${warehouseData.factoryName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Warehouse Address:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${warehouseData.warehouseAddress}</td>
        </tr>
        <tr style="width: 100%;">
            <th style="text-align: right; min-width: 100%;">Contact Person Name:</th>
            <td style="text-align: left; padding-left: 12px; min-width: 100%;">${warehouseData.contactPersonName}</td>
        </tr>
        <tr style="width: 100%;">
            <th style="text-align: right; min-width: 100%;">Contact Person Number:</th>
            <td style="text-align: left; padding-left: 12px; min-width: 100%;">${warehouseData.contactPersonNumber}</td>
        </tr>
        </table>
        </div>
        `;

        Swal.fire({
            title: 'Are you sure delete warehouse ?',
            html: dataPreview,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/warehouses/delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then((res) => {
                        Swal.fire({
                            title: 'Success',
                            text: res.data.message,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                        }).then(() => {
                            window.location.reload();
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: 'Error',
                            text: err.response.data.message,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        })
                    })
            }
        })

    }

    return (
        <TrashIcon className="w-5 h-5 text-red-700 cursor-pointer" onClick={handleDelete} />
    )
}

export default WarehouseDelete