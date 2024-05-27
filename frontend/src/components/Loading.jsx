import React from 'react'

const Loading = ({ isLoading }) => {
return (
    <>
        {isLoading &&
            <div className={`w-full h-full fixed overflow-hidden z-10 bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed flex flex-col gap-4 justify-center items-center `}>
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-pink">
                </div>
                <p className="text-primary-pink text-[20px] font-normal font-nunito">Loading...</p>
            </div>
        }
    </>
)}

export default Loading