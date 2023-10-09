import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import axios from 'axios';

const AccountEdit = ({ userData, id }) => {
    const token = localStorage.getItem('Authorization');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('member');

    useEffect(() => {
        if (userData) {
            setUsername(userData.username || '');
            setName(userData.name || '');
            setRole(userData.role || 'member');
        }
    }, [userData]);


    const handleClick = () => {
        Swal.fire({
            title: 'Edit Account',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Username" value="${username}">
                <input id="swal-input2" class="swal2-input" placeholder="Name" value="${name}">
                <input id="swal-input3" class="swal2-input" type="password" placeholder="Password">
                <input id="swal-input4" class="swal2-input" type="password" placeholder="Retype Password">
                <select id="swal-input5" class="swal2-input">
                    <option value="admin" ${role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="member" ${role === 'member' ? 'selected' : ''}>Member</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            preConfirm: () => {
                const updatedUsername = document.getElementById('swal-input1').value;
                const updatedName = document.getElementById('swal-input2').value;
                const updatedPassword = document.getElementById('swal-input3').value;
                const updatedRetypePassword = document.getElementById('swal-input4').value;
                const updatedRole = document.getElementById('swal-input5').value;

                if (!updatedUsername || !updatedName || !updatedPassword || !updatedRetypePassword || !updatedRole) {
                    Swal.showValidationMessage('Please fill all fields');
                } else if (updatedPassword !== updatedRetypePassword) {
                    Swal.showValidationMessage('Passwords do not match');
                } else {
                    const updatedData = {
                        username: updatedUsername,
                        name: updatedName,
                        password: updatedPassword,
                        role: updatedRole
                    };

                    axios.put(`http://localhost:3000/users/update/${id}`, updatedData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    }).then(response => {
                        if (response.data.updatedUser) {
                            Swal.fire('Success', 'User updated successfully!', 'success');
                        } else {
                            Swal.fire('Error', 'Failed to update user', 'error');
                        }
                    }).catch(error => {
                        Swal.fire('Error', 'Failed to update user', 'error');
                        console.error('Error updating user:', error);
                    });
                }
            }
        })
    };

    return (
        <PencilIcon className="w-5 h-5 text-green-700 cursor-pointer" onClick={handleClick} />
    );
};

export default AccountEdit;
