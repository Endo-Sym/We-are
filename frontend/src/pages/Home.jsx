import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Createpost from '../components/Createpost';
import icon__star_ from '/assets/images/icon__star_.svg';
import icon_comment from '/assets/images/icon_comment.svg';
import Share from '/assets/images/Share.svg';

import { FaCirclePlus } from "react-icons/fa6";

export default function Home({ showSidebar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starCount, setStarCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [isStarred, setIsStarred] = useState(false);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const toggleStar = () => {
        if (!isStarred) {
            setStarCount(prevCount => prevCount + 1);
        } else {
            setStarCount(prevCount => prevCount - 1);
        }
        setIsStarred(!isStarred);
    };

    const toggleComment = () => {
        setCommentCount(prevCount => prevCount + 1);
    };

    const toggleShare = () => {
        setShareCount(prevCount => prevCount + 1);
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
            <div className="top-[60px] relative flex-grow overflow-y-auto ">
                <Sidebar showSidebar={showSidebar}  />
                <section className={`flex fixed h-full w-[40%] min-w-[300px] py-8 px-4 overflow-y-auto z-10 `}>
                    <div className={`${showSidebar ? "w-[200px] min-w-[200px]" : "w-[88px] min-w-[88px]"} h-full`}></div>
                    <div className="h-full w-[60%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4  ">
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
                <section className={`flex justify-center left-[40%] relative  w-[60%] py-8 px-4 overflow-y-auto`}>
                    <div className="flex justify-center h-full w-[70%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                        <div className="w-full">
                            <div></div>
                            <div className="bg-primary-dark p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2">
                                    <img src="" alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                    <p className="text-left">user</p>
                                    <p className="bg-purple-600 px-2 py-1 text-xs rounded-full"> INTP</p>
                                    <div className="flex-grow"></div>
                                    <p className="text-center">13/02/24</p>
                                </div>
                                <h2 className="text-2xl">Question of the day</h2>
                                <p className="text-md mt-2">"What makes you feel totally alive and free?"</p>
                                <div>
                                <img src="https://images.pexels.com/photos/23169741/pexels-photo-23169741/free-photo-of-a-green-plant-growing-on-a-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
     className="w-50 h-50 max-w-50 max-h-50"
     alt="Image" />
                                    <a href="#" className="inline-block size-7 min-w-10 ml-auto p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleStar}>
                                        <img className="size-7 min-w-10" src={icon__star_} alt="star" />
                                        <span className="text-lg">{starCount}</span>
                                    </a>
                                    <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleComment}>
                                        <img className="size-7 min-w-10" src={icon_comment} alt="comment" />
                                        <span className="text-lg">{commentCount}</span>
                                    </a>
                                    <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleShare}>
                                        <img className="size-7 min-w-10" src={Share} alt="share" />
                                        <span className="text-lg">{shareCount}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`flex justify-center left-[40%] relative  w-[60%] py-8 px-4 overflow-y-auto`}>
                    <div className="flex justify-center h-full w-[70%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                        <div className="w-full">
                            <div></div>
                            <div className="bg-primary-dark p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2">
                                    <img src="" alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                    <p className="text-left">user</p>
                                    
                                    <p className="bg-purple-600 px-2 py-1 text-xs rounded-full"> INFP</p>
                                    <div className="flex-grow"></div>
                                    <p className="text-center">13/02/24</p>

                                </div>
                                <h2 className="text-2xl"> Crackkktus</h2>
                                <p className="text-md mt-2">"Love is not about finding the perfect person, but about seeing an imperfect person perfectly"</p>
                                
                                <div>
                                <img src=""
                                className="w-50 h-50 max-w-50 max-h-50"
                                alt="Image" />
                                    <a href="#" className="inline-block size-7 min-w-10 ml-auto p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleStar}>
                                        <img className="size-7 min-w-10" src={icon__star_} alt="star" />
                                        <span className="text-lg">{starCount}</span>
                                    </a>
                                    <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleComment}>
                                        <img className="size-7 min-w-10" src={icon_comment} alt="comment" />
                                        <span className="text-lg">{commentCount}</span>
                                    </a>
                                    <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform  hover:scale-105" onClick={toggleShare}>
                                        <img className="size-7 min-w-10" src={Share} alt="share" />
                                        <span className="text-lg">{shareCount}</span>
                                    </a>
                                </div>
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
    );
}