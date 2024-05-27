import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Createpost from '../components/Createpost';
import icon__star_ from '/assets/images/icon__star_.svg';
import icon_comment from '/assets/images/icon_comment.svg';
import Share from '/assets/images/Share.svg';
import { FaCirclePlus } from "react-icons/fa6";
import { UserContext } from '../../context/Usercontext';
import { MdSend } from "react-icons/md";
import axios from 'axios';

export default function Home({ showSidebar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedPosts, setExpandedPosts] = useState({});



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                let combinedData = [];

                const fetchPost = await axios.get('/post/fetch');
                const fetchPostData = fetchPost.data;

                for (let i = 0; i < fetchPostData.length; i++) {
                    const fetchPostUser = await axios.get(`/profile/${fetchPostData[0].postedBy}`);
                    const fetchPostUserData = fetchPostUser.data;

                    combinedData.push({
                        postData: fetchPostData[i],
                        user: fetchPostUserData
                    });
                }

                setPosts(combinedData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const toggleStar = (postId) => {
        const postIndex = posts.findIndex(post => post.postData._id === postId);
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[postIndex] = {
                ...updatedPosts[postIndex],
                postData: {
                    ...updatedPosts[postIndex].postData,
                    likes: updatedPosts[postIndex].postData.likes + 1
                }
            };
            return updatedPosts;
        });
    }

    const toggleShare = (postId) => {
        const postIndex = posts.findIndex(post => post.postData._id === postId);
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[postIndex] = {
                ...updatedPosts[postIndex],
                postData: {
                    ...updatedPosts[postIndex].postData,
                    shares: updatedPosts[postIndex].postData.shares + 1
                }
            };
            return updatedPosts;
        });
    }

    const toggleComment = (postId) => {
        setExpandedPosts(prevExpandedPosts => ({
            ...prevExpandedPosts,
            [postId]: !prevExpandedPosts[postId]
        }));
    }

    const handleTagClick = async (tag) => {
        try {
            const res = await axios.get(`/post/${tag}`);
            console.log("Get tag post successfully: ", res.data);
        } catch (error) {
            console.error('Error fetching posts from tag:', error);
        }
    }

    const [tags, setTags] = useState([
        "#books",
        "#learning",
        "#history",
        "#food",
        "#movie",
        "#gaming",
        "#memes",
        "#art",
        "#technology"
    ]);

    const getDate = (e) => {
        const rawTimestamp = e.postData.createdAt;
        const date = new Date(rawTimestamp);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);

        return formattedDate;
    };

    return (
        <>
            <Sidebar showSidebar={showSidebar} />
            {isLoading &&
                <div className={`w-full h-full fixed overflow-hidden z-10 bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed flex flex-col gap-4 justify-center items-center `}>
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-pink">
                    </div>
                    <p className="text-primary-pink text-[20px] font-normal font-nunito">Loading...</p>
                </div>
            }
            <div className={`flex bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed fixed font-nunito text-white pt-[60px] ${showSidebar ? "pl-[12.5rem]" : "pl-[5.5rem]"} h-full w-full`}>
                <div className="relative flex flex-1 overflow-y-auto">
                    <section className={`flex fixed w-[35%] py-8 px-4 overflow-hidden z-10`}>
                        <div className="h-full min-w-[60%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4 flex flex-col">
                            <h1 className="text-[40px] text-center relative z-20 max-w-full">Universes</h1>
                            <div className="flex flex-col gap-3">
                                {tags.map((tag, index) => (
                                    <div key={index} className="text-xl border border-primary-pink w-fit rounded-[20px] p-2 hover:cursor-pointer" onClick={() => handleTagClick(tag)}>{tag}</div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className={`flex flex-col gap-4 justify-start left-[40%] relative w-[60%] py-8 px-4 overflow-y-auto overflow-hidden`}>
                        {posts.map((post, index) => (
                            <div key={index} className={`flex justify-center w-[70%] ${expandedPosts[post.postData._id] ? 'min-h-[24rem]' : 'min-h-[16rem]'} border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4`}>
                                <div className="w-full h-full">
                                    <div className="bg-primary-dark rounded-lg w-full h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <img src={post.user.imgUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                                <p className="text-left">{post.user.name ?? post.user.username}</p>
                                                <p className="bg-purple-600 px-2 py-1 text-xs rounded-full">{post.user.userType}</p>
                                                <div className="flex-grow"></div>
                                                <p className="text-center">{getDate(post)}</p>
                                            </div>
                                            <h2 className="text-2xl break-words my-2">{post.postData.heading}</h2>
                                            <p className="text-md break-words">{post.postData.description}</p>
                                            {post.postData.imgUrl && (
                                                <img src={post.postData.imgUrl} className="max-w-50 max-h-50" alt="Post" />
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex flex-row gap-1">
                                                <a href="#" className="w-14 h-10 min-w-10 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center" onClick={() => toggleStar(post.postData._id)}>
                                                    <img className="size-7 min-w-10" src={icon__star_} alt="star" />
                                                    <div className="text-lg">{post.postData.likes}</div>
                                                </a>
                                                <a href="#" className="w-14 h-10 min-w-10 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center" onClick={() => toggleComment(post.postData._id)}>
                                                    <img className="size-6 min-w-10" src={icon_comment} alt="comment" />
                                                    <div className="text-lg">{post.postData.comments}</div>
                                                </a>
                                                <a href="#" className="w-14 h-10 min-w-10 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center" onClick={() => toggleShare(post.postData._id)}>
                                                    <img className="size-6 min-w-10" src={Share} alt="share" />
                                                    <div className="text-lg">{post.postData.shares}</div>
                                                </a>
                                            </div>
                                            <div></div>
                                            {expandedPosts[post.postData._id] && (
                                             <div className="mt-2">
                                            <div className="mt-4 flex flex-col ">
                                            <div className="flex items-center gap-2 mb-2">
                                            <img src={user.imgUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                            <p className="text-left">{user.name ?? user.username}</p>
                                            </div>
                                            <div className=" flex flex-col relative">
                                            <textarea
                                                 className="w-full h-24 p-2 border border-primary-pink rounded-[20px] bg-primary-dark text-white mb-2 bg-black"
                                                 placeholder={`Write a comment as ${user.name ?? user.username}...`}>

                                                 </textarea>
                                                <button   className="absolute bottom-3 right-3 bg-primary-pink text-black px-4 py-3 rounded-[30px] hover:bg-pink-500">
                                            <MdSend size={20} />
                                            
                                            </button>
                                            </div>
                                            </div>
                                            </div>
                                                )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                    <button
                        className="flex items-center justify-center bg-purple-500 text-white p-2 rounded-full hover:bg-purple-700 fixed bottom-10 right-10 z-20"
                        onClick={handleOpenModal}
                    >
                        <FaCirclePlus size={30} className="" />
                    </button>
                    {isModalOpen && <Createpost onClose={handleCloseModal} />}
                </div>
            </div>
        </>
    );
}
