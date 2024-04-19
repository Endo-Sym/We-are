// import { useNavigate } from 'react-router-dom';

// export default function Home(){
//     let navigate = useNavigate(); 
//     const routeChange = (e) =>{ 
//         let path = e.target.name; 
//         navigate(path);
//     }

//     return(
//         <nav className='flex flex-col justify-start'>
//             <button name="/signin" onClick={(e) => routeChange(e)}>Sign-in</button>
//             <button name="/signup" onClick={(e) => routeChange(e)}>Sign-up</button>
//             <button name="/" onClick={(e) => routeChange(e)}>Home</button>
//             <button name="/match" onClick={(e) => routeChange(e)}>Match</button>
//             <button name="/match" onClick={(e) => routeChange(e)}>Match</button>
//         </nav>
//     )
// }

import Sidebar from '../components/Sidebar';


export default function Home({ showSidebar }){
    return(
        <div className="overflow-hidden z-10">
            <Sidebar showSidebar={showSidebar}/>
            <div className="flex w-screen h-screen bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
                <div className="top-[60px] h-[100vh] w-[100vw] relative">
                    <section className={`flex fixed h-full w-[40%] min-w-[300px] py-8 px-4`}>
                        {/* sidebar clone */}
                        <div className={`${showSidebar ? "w-[200px] min-w-[200px]" : "w-[88px] min-w-[88px]"} h-full`}></div>
                        <div className="h-full w-[60%] left= border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md">
                            <h1 className="text-[40px] text-center pt-4">Universe</h1>
                        </div>
                    </section>
                    <section className={`flex justify-center left-[40%] relative h-full w-[60%] py-8 px-4`}>
                        <div className="flex justify-center h-full w-[70%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md">
                            <h1 className="text-[40px] text-center pt-4">Universe</h1>
                        </div>
                    </section>

                </div>
            </div>


            {/* <div className="w-full h-screen flex flex-col items-center justify-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
                <section>Universe</section>
            </div> */}
        </div>

    )
}