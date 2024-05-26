import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Createpost from '../components/Createpost';
import icon__star_ from '/assets/images/icon__star_.svg';
import icon_comment from '/assets/images/icon_comment.svg';
import Share from '/assets/images/Share.svg';
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';

export default function Home({ showSidebar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const toggleStar = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId
                    ? { ...post, likes: post.isStarred ? post.likes - 1 : post.likes + 1, isStarred: !post.isStarred }
                    : post
            )
        );
    };

    const toggleComment = (postId) => {
    };

    const toggleShare = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId
                    ? { ...post, shares: post.shares + 1 }
                    : post
            )
        );
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
            <div className="top-[60px] relative flex-grow overflow-y-auto">
                <Sidebar showSidebar={showSidebar} />
                <section className={`flex fixed h-full w-[40%] min-w-[300px] py-8 px-4 overflow-y-auto z-10`}>
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
                <section className={`flex justify-center left-[40%] relative w-[60%] py-8 px-4 overflow-y-auto`}>
                    <div className="flex justify-center h-full w-[70%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                        <div className="w-full">
                            {posts.map(post => (
                                <div key={post._id} className="bg-primary-dark p-4 rounded-lg mb-4">
                                    <div className="flex items-center gap-2">
                                        <img src={post.user.imageUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                        <p className="text-left">{post.user.name ?? post.user.username}</p>
                                        <p className="bg-purple-600 px-2 py-1 text-xs rounded-full"> {post.user.userType}</p>
                                        <div className="flex-grow"></div>
                                        <p className="text-center">{new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <h2 className="text-2xl">{post.heading}</h2>
                                    <p className="text-md mt-2">{post.description}</p>
                                    {post.imgUrl && (
                                        <img src={post.imgUrl} className="max-w-50 max-h-50" alt="Post" />
                                    )}
                                    <div>
                                        <a href="#" className="inline-block size-7 min-w-10 ml-auto p-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={() => toggleStar(post._id)}>
                                            <img className="size-7 min-w-10" src={icon__star_} alt="star" />
                                            <span className="text-lg">{post.likes}</span>
                                        </a>
                                        <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={() => toggleComment(post._id)}>
                                            <img className="size-7 min-w-10" src={icon_comment} alt="comment" />
                                            <span className="text-lg">{post.comments}</span>
                                        </a>
                                        <a href="#" className="inline-block size-7 min-w-10 p-2 transition duration-300 ease-in-out transform hover:scale-105" onClick={() => toggleShare(post._id)}>
                                            <img className="size-7 min-w-10" src={Share} alt="share" />
                                            <span className="text-lg">{post.shares}</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <button
                    className="flex items-center justify-center bg-purple-500 text-white p-2 rounded-full hover:bg-purple-700 fixed bottom-10 right-10 z-20"
                    onClick={handleOpenModal}
                >
                    <FaCirclePlus size={30} className="" />
                </button>
                {isModalOpen && <Createpost onClose={handleCloseModal} addPost={addPost} />}
            </div>
        </div>
    );
}
