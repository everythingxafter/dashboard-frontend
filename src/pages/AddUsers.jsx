import { useState } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        retypePassword: '',
        name: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const token = localStorage.getItem('Authorization');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.retypePassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to add a new user.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Yes, add user!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('Authorization');
                    if (!token) {
                        alert('No token found. Please log in.');
                        return;
                    }

                    const response = await axios.post('http://localhost:3000/users/create', formData, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    });


                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data added successfully!',
                    }).then(() => {
                        navigate('/accountcenter');
                    })

                } catch (error) {
                    console.log(error.response.data);
                }
            }
        });


    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
        if (e.target.value.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
        } else {
            setPasswordError("");
        }
    };

    const handleRetypePasswordChange = (e) => {
        setFormData({ ...formData, retypePassword: e.target.value });
        if (e.target.value !== formData.password) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    return (
        <div className="pt-5">
            <div className="px-5 pt-5 bg-white rounded-lg shadow-md w-2/4 mx-auto mt-10">
                <div className="text-center">
                    <h1 className="text-xl my-3">Tambah User</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name:
                            </label>
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <div className="relative">
                                <input
                                    className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-2 py-1"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="retypePassword">
                                Retype Password:
                            </label>
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                id="retypePassword"
                                value={formData.retypePassword}
                                onChange={handleRetypePasswordChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                                Role:
                            </label>
                            <select
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end py-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUsers;
