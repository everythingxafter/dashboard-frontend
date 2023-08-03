import Navbar from './Navbar'
import SideNavbar from './SideNavbar'

const Layout = ({ children }) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <SideNavbar />
                <div className='grow ml-52'>
                    <Navbar />
                    <div className='bg-slate-100 h-full w-full'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout
