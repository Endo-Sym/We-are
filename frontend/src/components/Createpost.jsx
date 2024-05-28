import React, { useState, useContext, useRef } from 'react';
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
    const imageRef = useRef();

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleHeadingChange = (event) => {
        setHeading(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'imfstvzq');
    
        try {
            const response = await axios.post('http://localhost:8000/post/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Image uploaded successfully:', response.data);
            setImgUrl(response.data.secure_url);
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };
    
    const handlePost = async () => {
        if (imageRef.current.files.length > 0) {
            try {
                const uploadedImage = await handleImageUpload(imageRef.current.files[0]);
                setImgUrl(uploadedImage.secure_url);
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

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

        try {
            const response = await axios.post('http://localhost:8000/post/posts', newPost, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log('Post created successfully:', response.data);
    
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (err) {
            console.error('Error creating post:', err.response ? err.response.data : err.message);
        }
    
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
                            placeholder="Header" 
                        />
                        <textarea
                            className="w-full p-2 bg-gray-700 border-2 border-primary-pink rounded-lg text-white placeholder-gray-400"
                            value={description}
                            onChange={handleDescriptionChange}
                            maxLength="500"
                            placeholder="decsription"
                        />
                        <div className="flex items-center">
                            <label className="cursor-pointer flex items-center justify-end">
                                <input 
                                    type="file" 
                                    onChange={(e) => {handleImageChange(e); handleImageUpload(e.target.files[0]);}} 
                                    className="hidden" 
                                    ref={imageRef}
                                />
                                <MdAddPhotoAlternate size={30} className="text-purple-500" 
                                onClick={() => imageRef.current.click()}
                                />
                            </label>
                        </div>
                        {imgUrl && (
                            <div className="mmb-4 flex items-start justify-between">
                                <img src={imgUrl} alt="Preview" className="w-full max-h-30 rounded-lg" />
                                <IoMdClose 
                                    size={24} 
                                    className=" top-2 right-2 text-white cursor-pointer" 
                                    onClick={() => setImgUrl("")} />
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
