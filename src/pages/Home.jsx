import { useNavigate } from 'react-router-dom';

export default function Home(){
    let navigate = useNavigate(); 
    const routeChange = (e) =>{ 
        let path = e.target.name; 
        navigate(path);
    }

    return(
        <>
            <button name="/signin" onClick={(e) => routeChange(e)}>Sign-in</button>
            <button name="/signup" onClick={(e) => routeChange(e)}>Sign-up</button>
        </>
    )
}