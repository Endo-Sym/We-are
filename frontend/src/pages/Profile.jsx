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
        lookingFor: 'Friends',
        type16: 'ENFP',
        interests: ['#sport', '#art', '#movie', '#food', '#technology'],
        followers: 5,
        love: 20,
        profileImage: profilePic,
    });

    const handleSave = (editedProfile) => {
        setProfileData(prevProfile => ({
            ...editedProfile,
            followers: prevProfile.followers,
            love: prevProfile.love,
        }));
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
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
            <Sidebar showSidebar={true} />
            <div className="w-3/4 h-3/4 relative bg-transparent flex flex-col items-center justify-center p-2">
                {!isEditing ? (
                    <>
                        <div className="relative mb-4 flex flex-col items-center">
                            <div className="w-60 h-60 mb-4 relative rounded-[50px] border-4 border-fuchsia-500 overflow-hidden">
                                <img 
                                    src={profileData.profileImage} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-16 h-16 mb-4 absolute top-[-20px] left-[-20px] border-4 border-fuchsia-500 rounded-full overflow-hidden">
                                <img
                                    src={profileData.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-white text-center flex flex-col items-center mb-4">
                            <h1 className="text-3xl font-bold">{profileData.name}</h1>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">school</span>{profileData.role}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">update</span>{profileData.status}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">place</span>{profileData.address}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">favorite</span>{profileData.idWeAre}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">star</span>{profileData.gender}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">search</span>{profileData.lookingFor}</p>
                            <p className="flex items-center text-lg"><span className="material-icons mr-2">psychology</span>{profileData.type16}</p>
                            <div className="flex flex-wrap justify-center mt-2">
                                {profileData.interests.map((interest, index) => (
                                    <span key={index} className="bg-fuchsia-500 rounded-full px-3 py-1 text-sm m-1">{interest}</span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={handleEditClick}
                            className="absolute w-40 h-15 top-4 right-4 px-4 py-2 border-fuchsia-500 bg-fuchsia-500 text-white rounded-[50px] hover:bg-fuchsia-600"
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
                {!isEditing && (
                    <>
                        <div className="flex justify-around w-full mt-4 px-8">
                            <div className="text-center w-40 h-15 px-4 py-2 border-fuchsia-500 bg-fuchsia-500 text-white rounded-[15px] hover:bg-fuchsia-600">
                                <span className="material-icons">group</span>
                                <p>{profileData.followers} Followers</p>
                            </div>
                            <div className="text-center w-40 h-15 px-4 py-2 border-fuchsia-500 bg-fuchsia-500 text-white rounded-[15px] hover:bg-fuchsia-600">
                                <span className="material-icons">favorite</span>
                                <p>{profileData.love} Love</p>
                            </div>
                        </div>
                        <div className="w-3/4 text-center mt-8 text-xl bg-fuchsia-500 h-50">
                            <p>Caption</p>
                            <p className="italic">love is love</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
