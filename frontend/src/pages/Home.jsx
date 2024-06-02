import { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import Createpost from '../components/Createpost';
import iconstar_ from '/assets/images/iconstar_.svg';
import icon_comment from '/assets/images/icon_comment.svg';
import Share from '/assets/images/Share.svg';
import { FaCirclePlus } from "react-icons/fa6";
import { UserContext } from '../../context/Usercontext';
import Comment from '../components/Comment';
import axios from 'axios';

export default function Home({ showSidebar, searchTerm }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [tags, setTags] = useState([
        "books",
        "learning",
        "history",
        "food",
        "movie",
        "gaming",
        "memes",
        "art",
        "technology"
    ]);

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
                    const fetchPostUser = await axios.get(`/profile/${fetchPostData[i].postedBy}`);
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
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                let combinedData = [];
                const fetchPost = await axios.get(`/post/search?query=${searchTerm}`);
                const fetchPostData = fetchPost.data;
                console.log(fetchPostData);

                for (let i = 0; i < fetchPostData.length; i++) {
                    const fetchPostUser = await axios.get(`/profile/${fetchPostData[i].postedBy}`);
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
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [searchTerm]);

    const toggleStar = (postId) => {
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            const postIndex = updatedPosts.findIndex(post => post.postData._id === postId);
            updatedPosts[postIndex].postData.likes += 1;
            return updatedPosts;
        });
    };

    const toggleShare = (postId) => {
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            const postIndex = updatedPosts.findIndex(post => post.postData._id === postId);
            updatedPosts[postIndex].postData.shares += 1;
            return updatedPosts;
        });
    };

    const toggleComment = (postId) => {
        setExpandedPosts(prevExpandedPosts => ({
            ...prevExpandedPosts,
            [postId]: !prevExpandedPosts[postId]
        }));
    };

    const handleNewComment = (postId, comment) => {
        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(post => {
                if (post.postData._id === postId) {
                    return {
                        ...post,
                        postData: {
                            ...post.postData,
                            comments: [...post.postData.comments, comment]
                        }
                    };
                }
                return post;
            });
            return updatedPosts;
        });
    };

    const handleTagClick = async (tag) => {
        try {
            const res = await axios.get(`/post/${tag}`);
            console.log("Get tag post successfully: ", res.data);
        } catch (error) {
            console.error('Error fetching posts from tag:', error);
        }
    };

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
            <Loading isLoading={isLoading} />
            <div className={`flex bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed fixed font-nunito text-white pt-[60px] ${showSidebar ? "pl-[12.5rem]" : "pl-[5.5rem]"} h-full w-full`}>
                <div className="relative flex flex-1 overflow-y-auto">
                    <section className="flex fixed w-[35%] py-8 px-4 overflow-hidden z-10">
                        <div className="h-full min-w-[60%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4 flex flex-col">
                            <h1 className="text-[40px] text-center relative z-30 max-w-full">Universes</h1>
                            <div className="flex flex-col gap-3">
                                {tags.map((tag, index) => (
                                    <div key={index} className="text-xl border border-primary-pink w-fit rounded-[20px] p-2 hover:cursor-pointer" onClick={() => handleTagClick(tag)}>#{tag}</div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-col gap-4 justify-start left-[40%] absolute right-0 w-[60%] py-8 px-4 overflow-y-auto overflow-hidden">
                        {posts.map((post, index) => (
                            <div key={index} className="flex justify-end w-[60%] border-2 border-primary-pink rounded-[30px] bg-black bg-opacity-60 backdrop-blur-md p-4">
                                <div className="w-full h-full">
                                    <div className="bg-primary-dark rounded-lg w-full h-full flex flex-col justify-between">
                                        <div>
                                            {post.postData.tags && <p className="text-2xl text-primary-pink font-semibold">#{post.postData.tags}</p>}
                                            <div className="flex items-center gap-2 mt-3">
                                                <img src={post.user.imgUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                                                <p className="text-left">{post.user.name ?? post.user.username}</p>
                                                <p className="bg-purple-600 px-2 py-1 text-xs rounded-full">{post.user.type}</p>
                                                <div className="flex-grow"></div>
                                                <p className="text-center">{getDate(post)}</p>
                                            </div>
                                            <h2 className="text-2xl break-words my-2">{post.postData.heading}</h2>
                                                <p className="text-md break-words">{post.postData.description}</p>
                                                {post.postData.imgUrl && (
                                                    <img 
                                                        src={post.postData.imgUrl} 
                                                        className="mx-auto max max-h-50 object"
                                                        style={{ width: '60', height: '60', maxWidth: '100%', maxHeight: '100%' }}
                                                        alt="Post" 
                                                    />
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex flex-row gap-1">
                                                <a href="#" className="w-14 h-10 min-w-10 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center" onClick={() => toggleStar(post.postData._id)}>
                                                    <img className="size-7 min-w-10" src={iconstar_} alt="star" />
                                                    <div className="text-lg">{post.postData.likes}</div>
                                                </a>
                                                <a href="#" className="w-14 h-10 min-w-10 transition duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center" onClick={() => toggleComment(post.postData._id)}>
                                                    <img className="size-6 min-w-10" src={icon_comment} alt="comment" />
                                                    <div className="text-lg">{post.postData.comments.length}</div>
                                                </a>
                                             
                                            </div>
                                            <div>
                                                {post.postData.comments.map((comment, index) => (
                                                    <div key={index} className="mt-2 bg-gray-800 p-2 rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <img src={comment.userImg} alt="Comment User" className="size-6 rounded-full" />
                                                            <p className="text-sm">{comment.username}</p>
                                                        </div>
                                                        <p className="ml-8">{comment.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {expandedPosts[post.postData._id] && (
                                                <Comment
                                                    user={user}
                                                    postId={post.postData._id}
                                                    onComment={(newComment) => handleNewComment(post.postData._id, newComment)}
                                                />
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
                        <FaCirclePlus size={30} />
                    </button>
                    {isModalOpen && <Createpost onClose={handleCloseModal} />}
                </div>
            </div>
        </>
    );
}
