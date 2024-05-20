import Sidebar from '../components/Sidebar';

export default function Resource({ showSidebar }){
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-poppins">
            <Sidebar showSidebar={showSidebar}/>
            <section className={`flex justify-center relative h-full w-[100%] py-8 px-4`}>
                <div className="flex justify-center h-full w-[70%] border-1 border-primary-pink rounded-[30px] shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md mt-20">
                    <h1 className="text-[30px] text-white text-center pt-5">We Are Resources</h1>
                </div>
            </section>
        </div>
    )
}