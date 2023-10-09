import { useState, useEffect, useMemo } from 'react';
import Table from "../components/Table"
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AccountEdit from '../handler/AccountEdit';
import AccountDelete from '../handler/AccountDelete';

function AccountCenter() {
    const token = localStorage.getItem('Authorization'); // Retrieve the token from localStorage
    console.log('Token:', token); // Log the token to the console
    const decodedToken = jwt_decode(token);
    console.log('Decoded Token:', decodedToken); // Log the decoded token to the console
    ///list data
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const response = await axios.get('http://localhost:3000/users/read', {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });
                    // Sort the data in descending order based on "createdAt"
                    const sortedData = response.data.users.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                    setData(sortedData);
                    setIsLoading(false);
                } else {
                    console.error("No token available.");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const columns = useMemo(
        () => [
            {
                Header: "Username",
                accessor: "username"
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Role",
                accessor: "role"
            },
            {
                Header: "Tanggal",
                accessor: "createdAt",
                // eslint-disable-next-line react/prop-types
                Cell: ({ value }) => {
                    const date = new Date(value);

                    // Get day, month, year
                    const day = date.getDate();
                    const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
                    const year = date.getFullYear();

                    // Get hour and minute
                    const hour = date.getHours().toString().padStart(2, '0');
                    const minute = date.getMinutes().toString().padStart(2, '0');

                    const formattedDate = `${day} ${month} ${year} - ${hour}.${minute}`;
                    return <span>{formattedDate}</span>;
                },
            },
            decodedToken.role !== 'member' ?
                {
                    Header: "Action",
                    accessor: "id",
                    // eslint-disable-next-line react/prop-types
                    Cell: ({ row }) => (
                        <div className="flex gap-2">
                            <AccountEdit userData={row.original} id={row.original.id} />
                            {/* <PencilIcon className="w-5 h-5 text-green-700 cursor-pointer" onClick={() => console.log(`edit ${row.id} `)} /> */}
                            <AccountDelete userData={row.original} id={row.original.id} />
                        </div>
                    ),
                } : null,
        ],
        [decodedToken.role]
    );
    return (
        <div>
            <div className="pt-5">
                <div className="mx-5 bg-white p-3 rounded-xl shadow-md">
                    <div className="text-center">
                        <h1 className="text-xl my-3">List Akun</h1>
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <Table columns={columns} data={data} />
                    )}
                </div>
            </div>

        </div>

    )
}

export default AccountCenter