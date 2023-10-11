import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

function KebunDelete({ id, farmData }) {
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

    const handleDelete = () => {
        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Farm Name:</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${farmData.farmName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Estate:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${farmData.estate}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Farm Address:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${farmData.farmAddress}</td>
        </tr>
        <tr style="width: 100%;">
            <th style="text-align: right; min-width: 100%;">Dock Name:</th>
            <td style="text-align: left; padding-left: 12px; min-width: 100%;">${farmData.dockName}</td>
        </tr>
        <tr style="width: 100%;">
            <th style="text-align: right; min-width: 100%;">Contact Person Name:</th>
            <td style="text-align: left; padding-left: 12px; min-width: 100%;">${farmData.contactPersonName}</td>
        </tr>
        <tr style="width: 100%;">
            <th style="text-align: right; min-width: 100%;">Contact Person Number:</th>
            <td style="text-align: left; padding-left: 12px; min-width: 100%;">${farmData.contactPersonNumber}</td>
        </tr>
        </table>
        </div>
        `;

        Swal.fire({
            title: 'Are you sure dalete farm ?',
            html: dataPreview,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/farms/delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                }).then(() => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Farm deleted',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.reload();
                    })
                })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete farm',
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

export default KebunDelete