import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import '../index.css'
import Swal from 'sweetalert2';

function SideNavbar() {
    const [listSectionTambah, setListSectionTambah] = useState(true);
    const [listSectionList, setListSectionList] = useState(true);
    const token = localStorage.getItem('Authorization');
    const decodedToken = jwt_decode(token);

    const handleListSectionTambah = () => {
        setListSectionTambah(!listSectionTambah);
    }

    const handleListSectionList = () => {
        setListSectionList(!listSectionList);
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("Authorization");
                navigate("/logout");
            }
        });
    };

    return (
        <aside className='fixed top-0 h-full z-50 p-2 px-7 flex flex-col overflow-y-auto bg-white border border-r-slate-300'>
            <div onClick={handleLogout} className='my-4 py-2 px-4 text-md text-center rounded-md bg-red-500 text-white hover:bg-red-800 hover:shadow-md cursor-pointer'>
                <p>Logout</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <Link
                        className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                        to='/'>Home
                    </Link>
                </div>
                <div>
                    <Link
                        className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                        to='/calculator'>Kalkulator Harga
                    </Link>
                </div>
                {decodedToken.role === 'superadmin' || decodedToken.role === 'admin' ? (
                    <div>
                        <Link
                            className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                            to='/accountcenter'>Pusat Akun
                        </Link>
                    </div>
                ) : null}
                {decodedToken.role === 'superadmin' || decodedToken.role === 'admin' ? (
                    <div>
                        <Link
                            className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                            to='/adduser'>Tambah Akun
                        </Link>
                    </div>
                ) : null}
                <div>
                    <Link
                        className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                        to='/printdata'>Print Data
                    </Link>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div
                        onClick={handleListSectionList}
                        className='flex items-center justify-between py-2 px-4 text-center border-b-2 cursor-pointer bg-slate-200 rounded-lg shadow-md border-b-slate-400 hover:bg-slate-400'>
                        <p className='font-medium'>List</p>
                        {listSectionList ? (
                            <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                        )}
                    </div>
                    <div className={`list-section ${listSectionList ? 'open' : ''}`}>
                        {listSectionList && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/listcustomer'>Customer
                                </Link>
                            </div>
                        )}
                        {listSectionList && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/listsupplier'>Supplier
                                </Link>
                            </div>
                        )}
                        {listSectionList && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/listkebun'>Kebun
                                </Link>
                            </div>
                        )}
                        {listSectionList && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/listgudang'>Gudang
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div
                        onClick={handleListSectionTambah}
                        className='flex items-center justify-between py-2 px-4 text-center border-b-2 cursor-pointer bg-slate-200 rounded-lg shadow-md border-b-slate-400 hover:bg-slate-400'>
                        <p className='font-medium'>Tambah</p>
                        {listSectionTambah ? (
                            <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                        )}
                    </div>
                    <div className={`list-section ${listSectionTambah ? 'open' : ''}`}>
                        {listSectionTambah && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/tambahcustomer'>Customer
                                </Link>
                            </div>
                        )}
                        {listSectionTambah && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/tambahsupplier'>Supplier
                                </Link>
                            </div>
                        )}
                        {listSectionTambah && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/tambahkebun'>Kebun
                                </Link>
                            </div>
                        )}
                        {listSectionTambah && (
                            <div>
                                <Link
                                    className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                                    to='/tambahgudang'>Gudang
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default SideNavbar;
