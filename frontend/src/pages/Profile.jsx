// Profile.jsx
import React, { useState } from 'react';
import ProfileEdit from '../components/ProfileEdit';
import Sidebar from '../components/Sidebar';
import profilePic from '../../assets/images/profile-pic.svg';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Cactus',
        role: 'Student',
        status: 'In progress',
        address: 'Bangmod, Bangkok TH',
        gender: 'ENFP',
        idWeAre: '20',
        lookingFor: '',
        type16: '',
        interests: '',
        followers: 5,
        love: 20,
        profileImage: profilePic, // Use the profile picture from the assets
    });

    const handleSave = (editedProfile) => {
        setProfileData(editedProfile);
        setIsEditing(false); // Exit edit mode
    };

    const handleEditClick = () => {
        setIsEditing(true); // Enter edit mode
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData({ ...profileData, profileImage: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
            <Sidebar showSidebar={true} /> {/* Adjust showSidebar prop as needed */}
            <div className="w-3/4 h-3/4 relative bg-transparent flex flex-col items-center justify-center p-4">
                {!isEditing ? (
                    <>
                        {/* Large profile image */}
                        <div className="relative mb-4 flex flex-col items-center">
                            <div className="w-72 h-72 mb-4 relative">
                                <img 
                                    src={profileData.profileImage} 
                                    alt="Profile" 
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            </div>
                            {/* Small circular profile image */}
                            <div className="w-16 h-16 mb-4 absolute top-4 left-4">
                                <img
                                    src={profileData.profileImage}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-white"
                                />
                            </div>
                        </div>
                        {/* Profile details */}
                        <div className="text-white text-left flex flex-col items-start mb-4">
                            <h1 className="text-3xl font-bold">{profileData.name}</h1>
                            <p className="flex items-center"><span className="material-icons">school</span>{profileData.role}</p>
                            <p className="flex items-center"><span className="material-icons">update</span>{profileData.status}</p>
                            <p className="flex items-center"><span className="material-icons">place</span>{profileData.address}</p>
                            <p className="flex items-center"><span className="material-icons">favorite</span>{profileData.idWeAre}</p>
                            <p className="flex items-center"><span className="material-icons">star</span>{profileData.gender}</p>
                        </div>
                        {/* Edit Button */}
                        <button
                            onClick={handleEditClick}
                            className="absolute top-4 right-4 px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600"
                        >
                            Edit
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <label className="w-24 h-24 mb-4">
                            <img
                                src={profileData.profileImage}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover cursor-pointer"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        <ProfileEdit profile={profileData} onSave={handleSave} onCancel={() => setIsEditing(false)} />
                    </div>
                )}
                <div className="flex justify-between w-full mt-4 px-8">
                    <div className="text-center">
                        <span className="material-icons">group</span>
                        <p>{profileData.followers} Followers</p>
                    </div>
                    <div className="text-center">
                        <span className="material-icons">favorite</span>
                        <p>{profileData.love} Love</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
