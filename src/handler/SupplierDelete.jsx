import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

function SupplierDelete({ id, supData }) {
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

    const handleDelete = () => {

        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Supplier Name:</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${supData.supplierName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Service:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${supData.supplierService}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Destination:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${supData.destination}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Price:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${supData.price}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Keterangan:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${supData.keterangan}</td>
        </tr>
        </table>
        </div>
        `;

        Swal.fire({
            title: 'Are you sure delete Supplier ?',
            html: dataPreview,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/suppliers/delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then(() => {
                        Swal.fire({
                            title: 'Success',
                            text: 'Supplier deleted',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            window.location.reload();
                        })
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete supplier',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    })
            }
        })

    }

    return (
        <TrashIcon className="w-5 h-5 text-red-700 cursor-pointer" onClick={handleDelete} />
    )
}

export default SupplierDelete