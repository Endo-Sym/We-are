import { useContext } from "react"
import { UserContext } from "../../context/Usercontext"
export default function Home(){
    const {user} = useContext(UserContext)
    return(
        <div className="w-full h-[100vh] flex items-center justify-center border-black bg-[url('./assets/images/home-bg.jpg')] bg-cover font-poppins">
        <h1>Hello Profile</h1>
        {!!user &&(<h2>{user.name}!</h2>)}
        </div>
    )
}