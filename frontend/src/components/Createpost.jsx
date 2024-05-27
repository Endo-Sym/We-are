import React, { useState, useContext } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import usePreviewImg from './Previewingimga';
import { UserContext } from '../../context/Usercontext'; 
import axios from 'axios';

function Createpost({ onClose }) {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState("");

    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const { user } = useContext(UserContext); 

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleHeadingChange = (event) => {
        setHeading(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePost = async () => {

        const newPost = {
            postedBy: user._id,
            tags: tag,
            heading: heading,
            description: description,
            imgUrl: imgUrl,
            likes: 0,
            comments: [],
            shares: 0
        };

        console.log(newPost);
        try {
            const response = await axios.post('/post/posts', newPost);
            console.log(response.data);
        } catch (err) {
            console.error('Error creating post:', err);
        }
        
        // addPost([response.data, ...posts]);
        // addPost(newPost);
        onClose();
    };

    return (
        <div className="w-full h-full bg-black bg-opacity-20 z-50 fixed overflow-y-hidden">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative border-2 border-primary-pink rounded-[20px] bg-black bg-opacity-80 backdrop-blur-lg w-96 max-h-[90vh] p-6 text-white overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white">
                        <IoMdClose size={24} />
                    </button>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span>Post to:</span>
                            <input 
                                type="text" 
                                value={tag} 
                                onChange={handleTagChange} 
                                placeholder="#tag" 
                                className="bg-purple-600 px-3 py-1 rounded-full text-black"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={user.imgUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                            <p className="text-left">{user.name ?? user.username}</p>
                        </div>
                        <textarea
                            className="w-full p-0 bg-transparent text-white placeholder-gray-400 text-2xl focus:outline-none"
                            value={heading}
                            onChange={handleHeadingChange}
                            maxLength="100"
                            placeholder="Heading" 
                        />
                        <textarea
                            className="w-full p-2 bg-gray-700 border-2 border-primary-pink rounded-lg text-white placeholder-gray-400"
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength="500"
                            placeholder="Description"
                        />
                        <div className="flex items-center">
                            <label className="cursor-pointer flex items-center justify-end">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                />
                                <MdAddPhotoAlternate size={30} className="text-purple-500" />
                            </label>
                        </div>
                        {imgUrl && (
                            <div className="mb-4">
                                <img src={imgUrl} alt="Preview" className="w-full max-h-30 rounded-lg" />
                            </div>
                        )}
                        <div className="flex justify-center">
                            <button onClick={handlePost} className="bg-white hover:bg-purple-600 text-black p-2 font-bold border-2 border-primary-pink rounded-[30px] w-40">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Createpost;
