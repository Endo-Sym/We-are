import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Createpost from '../components/Createpost';
import { FaCirclePlus } from "react-icons/fa6"; 

export default function Home({ showSidebar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="overflow-hidden z-10">
            <Sidebar showSidebar={showSidebar} />
            <div className="flex w-screen h-screen bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
                <div className="top-[60px] h-[100vh] w-[100vw] relative">
                    <section className={`flex fixed h-full w-[40%] min-w-[300px] py-8 px-4`}>
                        <div className={`${showSidebar ? "w-[200px] min-w-[200px]" : "w-[88px] min-w-[88px]"} h-full`}></div>
                        <div className="h-full w-[60%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                            <h1 className="text-[40px] text-center pt-4">Universes</h1>
                            <ul className="space-y-4 mt-8">
                                <li className="text-xl"><a href="#books">#books</a></li>
                                <li className="text-xl"><a href="#learning">#learning</a></li>
                                <li className="text-xl"><a href="#history">#history</a></li>
                                <li className="text-xl"><a href="#food">#food</a></li>
                                <li className="text-xl"><a href="#movie">#movie</a></li>
                                <li className="text-xl"><a href="#gaming">#gaming</a></li>
                                <li className="text-xl"><a href="#memes">#memes</a></li>
                                <li className="text-xl"><a href="#art">#art</a></li>
                                <li className="text-xl"><a href="#technology">#technology</a></li>
                            </ul>
                        </div>
                    </section>
                    <section className={`flex justify-center left-[40%] relative h-full w-[60%] py-8 px-4`}>
                        <div className="flex justify-center h-full w-[70%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                            <div className="w-full">
                                <div className="bg-primary-dark p-4 rounded-lg mb-4">
                                    <h2 className="text-2xl">Question of the day</h2>
                                    <p className="text-md mt-2">"What makes you feel totally alive and free?"</p>
                                    <p className="text-sm mt-2 text-right">- Cactus, ENFP</p>
                                </div>
                                <div className="bg-primary-dark p-4 rounded-lg">
                                    <h2 className="text-2xl">Soulful Romantic</h2>
                                    <p className="text-md mt-2">Love is not about finding the perfect person, but about seeing an imperfect person perfectly.</p>
                                    <p className="text-sm mt-2 text-right">- Crackkktus, INFP</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <button
                        className="flex items-center justify-center bg-purple-500  text-white p-2 rounded-full hover:bg-purple-700 fixed bottom-10 right-10 z-20"
                        onClick={handleOpenModal}
                    >
                        <FaCirclePlus size={30} className="" />
                        
                    </button>
                    {isModalOpen && <Createpost onClose={handleCloseModal} />}
                </div>
            </div>
        </div>
    );
}
