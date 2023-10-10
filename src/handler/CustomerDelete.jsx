import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

function CustomerDelete({ id, cusData }) {
    const [customerName, setCustomerName] = useState('');
    const [name, setName] = useState('');
    const [estate, setEstate] = useState('');
    const [region, setRegion] = useState('');
    const [price, setPrice] = useState('');
    const [service, setService] = useState('');
    const [keterangan, setKeterangan] = useState('');


    useEffect(() => {
        if (cusData) {
            setCustomerName(cusData.customerName || '');
            setName(cusData.name || '');
            setEstate(cusData.estate || '');
            setRegion(cusData.region || '');
            setPrice(cusData.price || '');
            setService(cusData.service || '');
        }
    }, [cusData]);

    const handleDelete = () => {
        console.log('Delete user:', id);

        const dataPreview = `
        <div class="flex">
        <table style="width: 100%;">
        <tr style="width: 100%;">
          <th style="text-align: right;min-width: 100%;">Customer Name:</th>
          <td style="text-align: left; padding-left: 12px;min-width: 100%;">${cusData.customerName}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Name:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${cusData.name}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Estate:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${cusData.estate}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Region:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${cusData.region}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Price:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${cusData.price}</td>
        </tr>
        <tr style="width: 100%;">
          <th style="text-align: right; min-width: 100%;">Service:</th>
          <td style="text-align: left; padding-left: 12px; min-width: 100%;">${cusData.service}</td>
        </tr>
      </table>
      </div>
        `;

        Swal.fire({
            title: 'Confirm Deletion',
            html: dataPreview,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('Authorization');

                // Make a DELETE request to the backend to delete the user with the authorization token header
                axios
                    .delete(`http://localhost:3000/customers/delete/${id}`, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    })
                    .then((response) => {
                        Swal.fire({
                            title: 'Customer Deleted',
                            text: response.data.message,
                            icon: 'success',
                            didClose: () => {
                                // Reload the page after the success animation and modal are closed
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Failed to delete user', 'error');
                        console.error('Error deleting user:', error);
                        // Handle any errors that occur during deletion if needed
                    });
            }
        });
    };
    return (
        <TrashIcon className="w-5 h-5 text-red-700 cursor-pointer" onClick={handleDelete} />
    )
}

export default CustomerDelete