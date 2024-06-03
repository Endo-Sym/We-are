import Sidebar from '../components/Sidebar';

export default function Resource({ showSidebar }){
    return(
        <>
            <Sidebar showSidebar={showSidebar}/>
            <div className={`flex bg-cartoon bg-cover bg-fixed fixed font-nunito text-white pt-[60px] ${showSidebar ? "pl-[12.5rem]" : "pl-[5.5rem]"} h-full w-full`}>
                <section className={`flex justify-center h-full w-full py-8 px-4`}>
                    <div className="flex justify-center h-full w-[70%] border-1 border-primary-pink rounded-[30px] shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md mt-20">
                        <h1 className="text-[30px] text-white text-center pt-5">We Are Resources</h1>
                    </div>
                </section>
            </div>
        </>
    )
}