import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '/assets/images/logo.png'
import menuicon from '/assets/images/menuicon.png';


export default function Home(){
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
        <section className='bg-gray-300 flex gap-6'>
            <nav className='bg-[#0e0e0e] min-h-screen w-72 text-grey-100 px-4'>
                <div className='py-3 flex justify-end size-10'>
                    <img src={menuicon}></img>
                </div>
                <div className='flex flex-col  text-white mt-4 gap-4 relative'>
                    <button name="/signin" onClick={(e) => routeChange(e)}>Sign-in</button>
                    <button name="/signup" onClick={(e) => routeChange(e)}>Sign-up</button>
                    <button name="/" onClick={(e) => routeChange(e)}>Home</button>
                    <button name="/match" onClick={(e) => routeChange(e)}>Match</button>
                    <button name="/message" onClick={(e) => routeChange(e)}>Message</button>
                    <button name="/profile" onClick={(e) => routeChange(e)}>Profile</button>
                    <button name="/perdata" onClick={(e) => routeChange(e)}>Personality Database</button>
                    <button name="/pertest" onClick={(e) => routeChange(e)}>Personality Test</button>
                    <button name="/resource" onClick={(e) => routeChange(e)}>Resources</button>
                </div>
            </nav>
            <img className="w-[60px] h-[50px]" src={logo}/>
            <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
            type="search" name="search" placeholder="Search"></input>

        </section>
    )
}