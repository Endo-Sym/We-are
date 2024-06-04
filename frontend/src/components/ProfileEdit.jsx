import React, { useState, useRef } from 'react';
import usePreviewImg from './Previewingimga';
import axios from 'axios';

const ProfileEdit = ({ profile, onSave, onCancel }) => {
    const [inputs, setInputs] = useState(profile);
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const [isUploading, setIsUploading] = useState(false);
    const imageRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "interests"){
            const interests = value.split(',');
            setInputs({ ...inputs, [name]: interests });
        } else {
            setInputs({ ...inputs, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        console.log("before send: ", inputs, imgUrl);
        e.preventDefault();
        try {
            const response = await axios.put(`/profile`, { ...inputs, imgUrl: imgUrl });
            console.log("after send: ", response);
            onSave(response.data);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'imfstvzq');

        try {
            setIsUploading(true);
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Image uploaded successfully:', response.data);
            setImgUrl(response.data.secure_url);
            setIsUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="max-w-[800px] w-full h-auto relative bg-black bg-opacity-60 backdrop-blur-sm border rounded-[10px] border-primary-pink shadow">
            <form onSubmit={handleSubmit} className="px-4 py-4">
                <label className="mb-4">
                    <img
                        src={profile.imgUrl}
                        alt="Profile"
                        className="w-[200px] h-full rounded-[30px] object-cover cursor-pointer"
                    />
                    <input 
                        type="file" 
                        onChange={(e) => {handleImageChange(e); handleImageUpload(e);}} 
                        className="hidden" 
                        ref={imageRef}
                    />Change image
                </label>
                {/* Profile Inputs */}
                <div className='flex flex-wrap justify-center'>
                    <div className='w-full lg:w-1/2 p-2'>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Name</p>
                            <input
                                type="text"
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Gender</p>
                            <input
                                type="text"
                                name="gender"
                                value={inputs.gender}
                                onChange={handleChange}
                                placeholder="Gender"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Status</p>
                            <input
                                type="text"
                                name="status"
                                value={inputs.status}
                                onChange={handleChange}
                                placeholder="Status"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Country</p>
                            <input
                                type="text"
                                name="country"
                                value={inputs.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Type</p>
                            <input
                                type="text"
                                name="type"
                                value={inputs.type}
                                onChange={handleChange}
                                placeholder="Type"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className="w-24">Interests</p>
                            <input
                                type="text"
                                name="interests"
                                value={inputs.interests}
                                onChange={handleChange}
                                placeholder="Interests"
                                className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                            />
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 p-2 flex flex-col justify-between'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p className="w-24">Looking For</p>
                                <input
                                    type="text"
                                    name="lookingFor"
                                    value={inputs.lookingFor}
                                    onChange={handleChange}
                                    placeholder="Looking For"
                                    className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className="w-24">Date Gender</p>
                                <input
                                    type="text"
                                    name="dateGender"
                                    value={inputs.dateGender}
                                    onChange={handleChange}
                                    placeholder="Date gender"
                                    className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                                />
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className="w-24">Friend Gender</p>
                                <input
                                    type="text"
                                    name="friendGender"
                                    value={inputs.friendGender}
                                    onChange={handleChange}
                                    placeholder="Friend gender"
                                    className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center gap-2'>
                                <p className="w-24">Contact</p>
                                <input
                                    type="text"
                                    name="contact"
                                    value={inputs.contact}
                                    onChange={handleChange}
                                    placeholder="Contact"
                                    className="flex-1 h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-5 mt-4">
                    {isUploading ? (
                        <button
                            type="button"
                            className="flex-1 h-10 bg-gray-400 text-white rounded-lg focus:outline-none"
                        >
                            Uploading...
                        </button>
                    
                    ) : (<button
                        type="submit"
                        className="flex-1 h-10 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 focus:outline-none"
                    >
                        Save
                    </button>)}
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 h-10 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
export default ProfileEdit;