import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


//showSidebar is a prop that is passed to Sidebar component from Home component. It is used to toggle the sidebar when the menu icon is clicked.
// "/" = home,
// "/match",
// "/perdata",
// "/pertest",
// "/resource"


export default function Sidebar({ showSidebar }){

    const [pageActive, setPageActive] = useState();

    useEffect(() => {
        setPageActive(location.pathname);
    }, [])

    let navigate = useNavigate(); 
    const routeChange = (e) => { 
        let path = e.currentTarget.id; 
        setPageActive(path);
        navigate(path);
    }

    return(
        <section className={`z-20 fixed left-0 top-[60px] flex flex-col gap-2 py-4 px-4 h-full w-[${showSidebar ? "200px" : "0px"}] bg-black bg-opacity-[50%] backdrop-blur font-nunito text-white font-medium transition-transform duration-100 ease-in-out`}>
            <div id="/" onClick={routeChange} className="flex cursor-pointer group gap-1">
                <div className="flex items-center justify-center h-14 w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 39" className="size-10" fill="none">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M44.049 11.854V33.93c0 1.143-.649 2.07-1.449 2.07H11.693c-.8 0-1.45-.927-1.45-2.07V11.854" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/" ? "stroke-primary-pink" : ""}`}/>
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M3 14.268 27.146 3l24.147 11.268" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/" ? "stroke-primary-pink" : ""}`}/>
                    </svg>
                </div>
                {showSidebar && <button className={`text-left flex-1 group-hover:text-primary-pink transition-colors ${pageActive === "/" ? "text-primary-pink" : ""}`}>Home</button>}
            </div>
            <div id="/match" onClick={routeChange} className="flex cursor-pointer group gap-1">
                <div className="flex items-center justify-center h-14 w-14 relative">
                    {/* <div class="opacity-0 group-hover:opacity-100 duration-300 absolute z-10 left-12 w-full flex justify-center items-center text-6xl text-white font-semibold">Match</div> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 34" className="size-10" fill="none">
                        <g filter="url(#a)">
                            <path stroke="#fff" strokeWidth="5" d="m15.601 6.58-3.655 6.1a1 1 0 0 1-.6.452l-7.678 2.053a1 1 0 0 0-.452 1.67l5.187 5.223a1 1 0 0 1 .267.918l-1.538 7.028a1 1 0 0 0 1.363 1.136l7.578-3.168a1 1 0 0 1 .772 0l7.578 3.168a1 1 0 0 0 1.363-1.136l-1.545-7.056a1 1 0 0 1 .236-.886l4.77-5.259a1 1 0 0 0-.468-1.633l-7.218-2.055a1 1 0 0 1-.584-.447l-3.66-6.109a1 1 0 0 0-1.716 0Z" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/match" ? "stroke-primary-pink" : ""}`}/>
                        </g>
                        <g filter="url(#b)">
                            <path stroke="#fff" strokeWidth="4" d="m40.664 3.45-1.818 3.067a1 1 0 0 1-.599.456L34.34 8.029a1 1 0 0 0-.453 1.666l2.57 2.616a1 1 0 0 1 .265.912l-.74 3.42a1 1 0 0 0 1.366 1.132l3.787-1.6a1 1 0 0 1 .779 0l3.787 1.6a1 1 0 0 0 1.367-1.133l-.747-3.447a1 1 0 0 1 .233-.88l2.38-2.653a1 1 0 0 0-.467-1.628L44.79 6.976a1 1 0 0 1-.584-.45L42.385 3.45a1 1 0 0 0-1.72 0Z" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/match" ? "stroke-primary-pink" : ""}`}/>
                        </g>
                        <defs>
                            <filter id="a" width="39.584" height="38.151" x="-3.576" y="-.407" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_328_241"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_328_241" result="shape"/></filter><filter id="b" width="27.593" height="26.898" x="27.599" y="-3.039" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_328_241"/><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_328_241" result="shape"/></filter>
                        </defs>
                    </svg> 
                </div>
                {showSidebar && <button className={`text-left flex-1 group-hover:text-primary-pink transition-colors ${pageActive === "/match" ? "text-primary-pink" : ""}`}>Match</button>}
            </div>
            <div id="/perdata" onClick={routeChange} className="flex cursor-pointer group gap-1">
                <div className="flex items-center justify-center h-14 w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 38" className="size-8" fill="none">
                        <path stroke="#fff" strokeWidth="4" d="m7.23 36 33.175-1.575 1.094-.11c.14-.014.276-.058.398-.128l.843-.483c.077-.044.148-.099.21-.162l.436-.437a1 1 0 0 0 .198-.283l.322-.69a.999.999 0 0 0 .094-.423v-8.311l-.484-6.61a1 1 0 0 0-.027-.168l-.288-1.157a1.005 1.005 0 0 0-.047-.142l-.065-.158a1 1 0 0 0-.193-.299l-.367-.393-.19-.23a.999.999 0 0 0-.328-.258l-.462-.228M7.229 36H6.16a1 1 0 0 1-.449-.106l-.884-.444a1 1 0 0 1-.353-.296L3.33 33.623a1 1 0 0 1-.198-.558L2 4.888v-.82a1 1 0 0 1 .23-.64l.097-.115.291-.39a1 1 0 0 1 .518-.36l1.642-.487M7.23 36l1.861-1.416a1 1 0 0 0 .282-.334l.678-1.302a1 1 0 0 0 .113-.49l-.473-17.48a1 1 0 0 1 .23-.665l.632-.762c.072-.086.158-.16.254-.218l1.162-.7m0 0 16.833.657 12.747.465m-29.58-1.122-1.953.242a1 1 0 0 0-.326.098l-.693.348a1 1 0 0 0-.54.74l-.07.456a1 1 0 0 0-.012.172l.321 17.272a1 1 0 0 1-.094.442l-.293.63a1 1 0 0 1-.28.356l-.582.467a1 1 0 0 1-.494.212l-.384.051a1 1 0 0 1-.605-.11l-.489-.261a1 1 0 0 1-.342-.302l-.346-.486a1 1 0 0 1-.185-.538L3.407 3.862a1 1 0 0 1 .268-.724l.45-.482.36-.362A1 1 0 0 1 5.194 2h3.18l3.372.129c.04.002.075 0 .115-.002.654-.043 6.899-.374 8.524 2.827m0 0 1.442 1.82a1 1 0 0 0 .713.377c1.952.138 9.897.714 13.452 1.15 4.07.499 4.413 2.199 5.557 5.454M20.385 4.954l-2.635-2.11" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/perdata" ? "stroke-primary-pink" : ""}`}/>
                    </svg> 
                </div>
                {showSidebar && <button className={`text-left flex-1 group-hover:text-primary-pink transition-colors ${pageActive === "/perdata" ? "text-primary-pink" : ""}`}>Personality Database</button>}
            </div>
            <div id="/pertest" onClick={routeChange} className="flex cursor-pointer group gap-1">
                <div className="flex items-center justify-center h-14 w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 58" className="size-10" fill="none"><rect width="33.993" height="15.497" x="3.244" y="11.577" stroke="#fff" strokeWidth="3" rx="2.5" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/pertest" ? "stroke-primary-pink" : ""}`}/>
                        <path stroke="#fff" strokeWidth="3" d="M38.981 19.675c0 9.997-8.35 18.174-18.74 18.174C9.85 37.85 1.5 29.673 1.5 19.675S9.85 1.5 20.24 1.5c10.391 0 18.741 8.177 18.741 18.175Z" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/pertest" ? "stroke-primary-pink" : ""}`}/>
                        <path stroke="#fff" strokeLinecap="round" strokeWidth="3" d="m16.273 38.647-.1 15.772M23.731 38.355l-.1 15.772M16.457 54.637l.099.09a5.141 5.141 0 0 0 7.047-.09v0M11.833 16.803h16.815M14.355 21.848h11.77" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/pertest" ? "stroke-primary-pink" : ""}`}/>
                        <path stroke="#fff" strokeWidth="3" d="M8.47 11.81c7.146-8.039 17.235-7.198 24.382 0m0 14.614c-5.885 9.716-19.338 9.716-24.382 0" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/pertest" ? "stroke-primary-pink" : ""}`}/>
                    </svg> 
                </div>
                {showSidebar && <button className={`text-left flex-1 group-hover:text-primary-pink transition-colors ${pageActive === "/pertest" ? "text-primary-pink" : ""}`}>Personality Test</button>}
            </div>
            {/* <div id="/resource" onClick={routeChange} className="flex cursor-pointer group gap-1">
                <div className="flex items-center justify-center h-14 w-14">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 41" className="size-8" fill="none">
                        <path stroke="#fff" strokeLinecap="round" strokeWidth="4" d="M14 19.25h14M11.375 12.25h19.25M11.375 26.25h19.25" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/resource" ? "stroke-primary-pink" : ""}`}/>
                        <path stroke="#fff" strokeWidth="4" d="M40 20.125c0 9.988-7.63 18.125-18.927 18.125C9.758 38.25 2 30.095 2 20.125S9.758 2 21.073 2C32.37 2 40 10.137 40 20.125Z" className={`group-hover:stroke-primary-pink transition-colors ${pageActive === "/resource" ? "stroke-primary-pink" : ""}`}/>
                    </svg> 
                </div>
                {showSidebar && <button className={`text-left flex-1 group-hover:text-primary-pink transition-colors ${pageActive === "/resource" ? "text-primary-pink" : ""}`}>Resources</button>}
            </div> */}

            {/* <button name="/signin" onClick={routeChange}>Sign-in</button>
            <button name="/signup" onClick={routeChange}>Sign-up</button> */}
            {/* <button name="/message" onClick={routeChange}>Message</button>
            <button name="/profile" onClick={routeChange}>Profile</button> */}
            
            
            
        </section>
    )
}