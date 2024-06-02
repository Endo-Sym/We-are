import React, { useState, useRef } from 'react';
import usePreviewImg from './Previewingimga';
import axios from 'axios';

const ProfileEdit = ({ profile, onSave, onCancel }) => {
    const [inputs, setInputs] = useState(profile);
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
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
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Image uploaded successfully:', response.data);
            setImgUrl(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="max-w-[600px] w-full h-auto relative bg-black bg-opacity-60 backdrop-blur-sm border rounded-[10px] border-primary-pink shadow">
            <form onSubmit={handleSubmit} className="px-4 py-2">
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
                <div className='flex flex-row items-center gap-2'>
                    <p>Name :</p>
                    <input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Role :</p>
                    <input
                        type="text"
                        name="role"
                        value={inputs.role}
                        onChange={handleChange}
                        placeholder="Role"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Status :</p>
                    <input
                        type="text"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        placeholder="Status"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Address :</p>
                    <input
                        type="text"
                        name="address"
                        value={inputs.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Gender :</p>
                    <input
                        type="text"
                        name="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        placeholder="Gender"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>ID We Are :</p>
                    <input
                        type="text"
                        name="idWeAre"
                        value={inputs.idWeAre}
                        onChange={handleChange}
                        placeholder="ID We Are"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Looking For :</p>
                    <input
                        type="text"
                        name="lookingFor"
                        value={inputs.lookingFor}
                        onChange={handleChange}
                        placeholder="Looking For"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Type :</p>
                    <input
                        type="text"
                        name="type"
                        value={inputs.type}
                        onChange={handleChange}
                        placeholder="Type16"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p>Interests :</p>
                    <input
                        type="text"
                        name="interests"
                        value={inputs.interests}
                        onChange={handleChange}
                        placeholder="Interests"
                        className="w-auto h-10 px-4 my-2 rounded border border-gray-300 focus:outline-none focus:border-fuchsia-500 text-black"
                    />
                </div>
       

                {/* Action Buttons */}
                <div className="flex justify-between gap-5 mt-4">
                    <button
                        type="submit"
                        className="flex-1 h-10 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 focus:outline-none"
                    >
                        Save
                    </button>
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
