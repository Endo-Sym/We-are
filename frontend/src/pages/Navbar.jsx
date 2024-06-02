import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/Usercontext';
import { CiLogout } from "react-icons/ci";
import logo from '/assets/images/logo.svg';
import searchicon from '/assets/images/searchicon.png';
import LogoutModal from './LogoutModal'; // Ensure this path is correct
import axios from 'axios';

export default function Navbar({ toggleNavbar }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [profileData, setProfileData] = useState({ imgUrl: '' });

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
        }
    }, [location.state, setUser]);

    const handleLogout = () => {
        axios.get('/logout')
            .then(() => {
                setUser(null);
                setLogoutModalOpen(false);
                navigate('/signin');
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    const handleLogoutClick = () => {
        setLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchQuery}`);
    };

    useEffect(() => {
        if (user && user._id) {
            async function fetchData() {
                console.log("hey! :", user);
                const response = await axios.get(`/profile/${user._id}`);
                console.log("set profile: ", response.data);
                setProfileData(response.data);
            }
            fetchData();
        }
    }, [user]);

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
                        <Link to={"/"}>
                            <img className="size-10 min-w-10" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center w-full relative col-span-1 max-md:w-[80%] justify-self-center">
                        <img src={searchicon} alt="Search Icon" className="absolute size-6 left-3" />
                        <form onSubmit={handleSearch} className="w-full">
                            <input
                                className="border-2 border-primary-pink bg-black text-white caret-primary-pink placeholder-primary-pink placeholder-opacity-60 w-full h-10 pl-9 rounded-full text-sm focus:outline-none"
                                type="search"
                                name="search"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="flex items-center justify-end gap-3 text-white col-span-1">
                        {user ? (
                            <>
                                <CiLogout onClick={handleLogoutClick} className="cursor-pointer" />
                                <Link to={"/profile"} className="text-right hover:underline">{user.name ?? user.username}</Link>
                                <img src={profileData.imgUrl} alt="Profile" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
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
