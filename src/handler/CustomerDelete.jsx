import React from 'react'

function CustomerDelete({ id, cusData }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (cusData) {
            setName(cusData.name || '');
        }
    }, [cusData]);

    const handleDelete = () => {
        console.log('Delete user:', id);


        Swal.fire({
            title: 'Confirm Deletion',
            html: `Are you sure you want to delete the user <strong>${cusData.name}</strong>?`,
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
                            title: 'User Deleted',
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