import { Link } from 'react-router-dom';

function SideNavbar() {
    return (
        <aside className='fixed top-0 h-full z-50 p-2 px-7 flex flex-col bg-white border border-r-slate-300'>
            <div className='p-5 text-lg text-green-700'>
                <p>Navbar</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <Link to='/'>Home</Link>
                </div>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <Link to='/calculator'>Kalkulator Harga</Link>
                </div>
                <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                    <Link to='/accountcenter'>Pusat Akun</Link>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div className='py-2 px-4 text-center border-b-2 border-b-slate-400'>
                        <p>List</p>
                    </div>
                    <div >
                        <Link
                            className='py-2 px-4 block rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'
                            to='/listcustomer'>Customer</Link>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/listgudang'>Gudang</Link>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/listkebun'>Kebun</Link>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/listsupplier'>Supplier</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div className='py-2 px-4 text-center border-b-2 border-b-slate-400'>
                        <p>Tambah</p>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/tambahcustomer'>Customer</Link>
                    </div>
                    <div className=' rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link className='py-2 px-4' to='/tambahgudang'>Gudang</Link>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/tambahkebun'>Kebun</Link>
                    </div>
                    <div className='py-2 px-4 rounded-md hover:bg-slate-400 hover:shadow-md cursor-pointer'>
                        <Link to='/tambahsupplier'>Supplier</Link>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default SideNavbar