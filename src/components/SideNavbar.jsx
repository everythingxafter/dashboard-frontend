
function SideNavbar() {
    return (
        <aside className='fixed top-0 h-full z-50 p-2 px-7 flex flex-col bg-white border border-r-slate-300'>
            <div className='p-5 text-lg text-green-700'>
                <p>Navbar</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <p>Home</p>
                </div>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <p>Kalkulator Harga</p>
                </div>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <p>Pusat Akun</p>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div className='py-2 px-4 text-center border-b-2 border-b-slate-400'>
                        <p>List</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Customer</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Gudang</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Kebun</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Supplier</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div className='py-2 px-4 text-center border-b-2 border-b-slate-400'>
                        <p>Tambah</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Customer</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Gudang</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Kebun</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <p>Supplier</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideNavbar