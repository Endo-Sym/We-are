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


export default function Home(){
    return(
        <div className="w-full h-[100vh] flex items-center justify-center border-black bg-[url('./assets/images/home-bg.jpg')] bg-cover font-poppins">
        <h1>Hello Home</h1>
        </div>
    )
}