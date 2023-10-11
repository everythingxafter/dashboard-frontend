import { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

const AccountDelete = ({ id, userData }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
        }
    }, [userData]);

    const handleDelete = () => {

        Swal.fire({
            title: 'Confirm Deletion',
            html: `Are you sure you want to delete the user <strong>${userData.name}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('Authorization');
                axios.delete(`http://localhost:3000/users/delete/${id}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                    .then((response) => {
                        Swal.fire({
                            title: 'User Deleted',
                            text: response.data.message,
                            icon: 'success',
                            didClose: () => {
                                window.location.reload();
                            }
                        });
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Failed to delete user', 'error');
                    });
            }
        });
    };

    return (
        <TrashIcon className="w-5 h-5 text-red-700 cursor-pointer" onClick={handleDelete} />
    );
};

export default AccountDelete