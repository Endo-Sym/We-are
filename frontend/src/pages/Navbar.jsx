import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/Usercontext';
import { CiLogout } from "react-icons/ci";
import logo from '/assets/images/logo.svg';
import menuicon from '/assets/images/menuicon.svg';
import searchicon from '/assets/images/searchicon.png';
import LogoutModal from './LogoutModal'; // Ensure this path is correct

export default function Home({ toggleNavbar, showSidebar }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
        }
    }, [location.state, setUser]);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        setLogoutModalOpen(false);
        navigate('/signin');
    };

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    if (location.pathname === '/signin' || location.pathname === '/signup') {
        return null;
    }

    return (
        <div className="font-nunito relative z-50">
            <section className="fixed top-0 h-[60px] w-full bg-primary-pink bg-opacity-[16%] backdrop-blur-sm">
                <div className="grid grid-cols-[20%_auto_20%] gap-2 h-full max-w-full mx-6">
                    <div className="flex items-center gap-8 col-span-1">
                        <svg onClick={toggleNavbar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 38" className="size-10 min-w-10 group cursor-pointer" fill="none">
                            <path stroke="#fff" strokeLinecap="round" strokeWidth="5" d="M3 3h43.255M3 19h43.255M3 35h43.255" className="group-hover:stroke-primary-pink transition-colors" />
                        </svg>
                        <a href="/">
                            <img className="size-10 min-w-10" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="flex items-center justify-center w-full relative col-span-1 max-md:w-[80%] justify-self-center">
                        <img src={searchicon} alt="" className="absolute size-6 left-3" />
                        <input className="border-2 border-primary-pink bg-black text-white caret-primary-pink placeholder-primary-pink placeholder-opacity-60 w-full h-10 pl-9 rounded-full text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                    </div>
                    <div className="flex items-center justify-end gap-3 text-white col-span-1">
                        <CiLogout onClick={handleLogoutClick} className="cursor-pointer" />
                        {user ? (
                            <>
                                <a className="text-right" href="/profile">{user.name ?? user.username}</a>
                                <img src={user.imgUrl} alt="User"  className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                            </>
                        ) : (
                            <a href="/signin" className="flex items-center justify-end gap-3 text-white col-span-1">
                                Sign In
                            </a>
                        )}
                    </div>
                </div>
            </section>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onRequestClose={closeLogoutModal}
                message="Do you really want to log out?"
                onConfirm={handleLogout}
            />
        </div>
    );
}
