import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '/assets/images/logo.svg'
import menuicon from '/assets/images/menuicon.svg';
import searchicon from '/assets/images/searchicon.png';
// import homeicon from '/assets/images/homeicon.svg';
// import matchicon from '/assets/images/matchicon.svg';
// import personalityDBicon from '/assets/images/personalityDBicon.svg';
// import personalitytesticon from '/assets/images/personalitytesticon.svg';
// import resourceicon from '/assets/images/resourceicon.svg';


export default function Home({ toggleNavbar, showSidebar }){
    let navigate = useNavigate(); 
    const routeChange = (e) =>{ 
        let path = e.target.name; 
        navigate(path);
    }

    const location = useLocation()
        if (location.pathname === '/signin'){
            return null
        }
        if (location.pathname === '/signup'){
            return null
        }

    return(
        // <section className='bg-gray-300 flex gap-6'>
        //     <nav className='bg-[#0e0e0e] min-h-screen w-72 text-grey-100 px-4'>
        //         <div className='py-3 flex justify-end size-10'>
        //             <img src={menuicon}></img>
        //         </div>
                // <div className='flex flex-col text-white mt-4 gap-10 relative'>
                //     <button name="/signin" onClick={(e) => routeChange(e)}>Sign-in</button>
                //     <button name="/signup" onClick={(e) => routeChange(e)}>Sign-up</button>
                //     <button name="/" onClick={(e) => routeChange(e)}>Home</button>
                //     <button name="/match" onClick={(e) => routeChange(e)}>Match</button>
                //     <button name="/message" onClick={(e) => routeChange(e)}>Message</button>
                //     <button name="/profile" onClick={(e) => routeChange(e)}>Profile</button>
                //     <button name="/perdata" onClick={(e) => routeChange(e)}>Personality Database</button>
                //     <button name="/pertest" onClick={(e) => routeChange(e)}>Personality Test</button>
                //     <button name="/resource" onClick={(e) => routeChange(e)}>Resources</button>
                // </div>
        //     </nav>
        //     <a href="/"><img className="w-[60px] h-[50px]" src={logo}/></a>
            // <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
            // type="search" name="search" placeholder="Search"></input>
        // </section>
        <div className="font-nunito">
            <section className="fixed top-0 h-[60px] w-full bg-primary-pink bg-opacity-[16%] backdrop-blur-sm">
                <div className="grid grid-cols-[20%_auto_20%] gap-2 h-full max-w-full mx-6">
                    <div className="flex items-center gap-8 col-span-1">
                        <svg onClick={toggleNavbar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 38" className="size-10 min-w-10 group cursor-pointer" fill="none">
                            <path stroke="#fff" strokeLinecap="round" strokeWidth="5" d="M3 3h43.255M3 19h43.255M3 35h43.255" className="group-hover:stroke-primary-pink transition-colors"/>
                        </svg>
                        <a href="/">
                            <img className="size-10 min-w-10" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="flex items-center justify-center w-full relative col-span-1 max-md:w-[80%] justify-self-center">
                        <img src={searchicon} alt="" className="absolute size-6 left-3"/>
                        <input className="border-2 border-primary-pink bg-black text-white caret-primary-pink placeholder-primary-pink placeholder-opacity-60 w-full h-10 pl-9 rounded-full text-sm focus:outline-none" type="search" name="search" placeholder="Search" />
                    </div>
                    {/* username&profile area */}
                    <div className="flex items-center justify-end gap-3 text-white col-span-1">
                        <p className="text-right">Username</p>
                        <img src="" alt="" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink"/>
                    </div>
                </div>
            </section>
        </div>

    )
}