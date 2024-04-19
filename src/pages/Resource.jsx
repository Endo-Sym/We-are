import Sidebar from '../components/Sidebar';

export default function Resource({ showSidebar }){
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-poppins">
            <Sidebar showSidebar={showSidebar}/>
            {/* <h1 className="text-white">Hello Home</h1>
            <div className="min-w-[50px] min-h-[500px] bg-red-600"></div>
            <div className="min-w-[50px] min-h-[500px] bg-red-400"></div> 
            <div className="min-w-[50px] min-h-[500px] bg-red-200"></div>  */}
        </div>
    )
}