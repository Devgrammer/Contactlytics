import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom';
import { FcContacts, FcAreaChart } from 'react-icons/fc';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div className="layout-container flex flex-row w-100 h-screen   ">
                <div className="  fixed top-16 left-0 left-pane-menu " style={{maxWidth:'6vw', minWidth:'5rem'}}><SideBar /></div>
                <div className=" fixed top-24  left-28  right-pane-menu overflow-x-hidden overflow-y-scroll h-screen" style={{maxWidth:'96vw', }} >{children}</div>
            </div>
        </>
    )
};

const handleClick = (path: string) => {

}


const SideBar: React.FC = () => {
    const sideBarData = [
        {
            id: 1,
            icon: <FcContacts size={40} />,
            path: '/',
            name: 'Contact'
        },
        {
            id: 2,
            icon: <FcAreaChart size={40} />,
            path: '/chart-and-map',
            name: 'Charts And Maps'
        },


    ]
    return (
        <div className="sidebar-container box-border  h-screen p-2 flex flex-col gap-y-8 content-center bg-indigo-600">
            {
                sideBarData.map((data) => {
                    return (
                        <Link to={data.path}>
                            <div className="sidebar-item-container  p-2 border-2  rounded-md border-indigo-500 hover:bg-indigo-400">
                                <div className="icons flex justify-center">{data.icon}</div>
                                <div className="sidebar-item-name text-xs font-semibold text-white  text-center"> {data.name}</div>

                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

const NavBar: React.FC = () => {
    return (
        <div className="nav-bar-container fixed top-0 mb-20 h-16 w-full bg-indigo-500 text-xl font-bold text-white flex items-center p-4">
            Contact  Management
        </div>
    )
}

export default Layout;