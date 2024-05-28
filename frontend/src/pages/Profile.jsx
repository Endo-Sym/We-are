import React, { useState } from 'react';
import ProfileEdit from '../components/ProfileEdit';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import profilePic from '../../assets/images/profile-pic.svg';

const Profile = ({ showSidebar }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Cactus',
        role: 'Student',
        status: 'In progress',
        address: 'Bangmod, Bangkok TH',
        gender: 'Female',
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
        <>
            <Sidebar showSidebar={showSidebar} />
            <Loading isLoading={isLoading}/>
            <div className={`flex bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed fixed font-nunito text-white pt-[60px] ${showSidebar ? "pl-[12.5rem]" : "pl-[5.5rem]"} h-full w-full items-center justify-center`}>
                <div className="h-full w-3/4 relative bg-transparent flex flex-col items-center justify-center p-2">
                    {!isEditing ? 
                    (<div className="flex items-start gap-4">
                        <div className="flex flex-col items-center relative">
                            <div className="relative">
                                <div className="max-w-[30rem] h-[30rem] relative rounded-[50px] border-2 border-fuchsia-500 overflow-hidden">
                                    <img 
                                        src={profileData.profileImage} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute w-full h-[70%] bottom-0 overflow-hidden flex flex-col justify-end p-6">
                                    <div className="max-w-16 min-w-16 max-h-16 min-h-16 border-2 border-fuchsia-500 rounded-full overflow-hidden">
                                        <img
                                            src={profileData.profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">school</span>{profileData.role}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">update</span>{profileData.status}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">place</span>{profileData.address}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">favorite</span>{profileData.idWeAre}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">search</span>{profileData.lookingFor}</p>
                                    <div className="flex justify-start gap-2 mt-2">
                                        <p className={`flex items-center justify-center w-20 text-lg rounded-[18px] ${profileData.gender === "Female" ? "bg-pink-500" : "bg-blue-500"}`}><span className="material-icons p-2">gender</span></p>
                                        <p className={`flex items-center justify-center w-20 text-lg rounded-[18px] bg-primary-pink`}><span className="material-icons p-2">{profileData.type16}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6 mt-5">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-center min-w-[7rem] h-[4rem] px-4 py-2 border-2 border-fuchsia-500 bg-black backdrop-blur-sm bg-opacity-40 text-white rounded-[20px] hover:bg-fuchsia-500 hover:cursor-pointer hover:bg-opacity-100 transition-colors flex items-center justify-center gap-2">
                                        <div className="material-icons">icon</div>
                                        <p className="text-[24px]">{profileData.followers}</p>
                                    </div>
                                    <p>Followers</p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-center min-w-[7rem] h-[4rem] px-4 py-2 border-2 border-fuchsia-500 bg-black backdrop-blur-sm bg-opacity-40 text-white rounded-[20px] hover:bg-fuchsia-500 hover:cursor-pointer hover:bg-opacity-100 hover:backdrop-blur-0 transition-all flex items-center justify-center gap-2">
                                        <div className="material-icons">icon</div>
                                        <p className="text-[24px]">{profileData.love}</p>
                                    </div>
                                    <p>Love</p>
                                </div>
                            </div>
                        </div>
                        <button className="text-center px-6 py-2 border-2 border-fuchsia-500 bg-black backdrop-blur-sm bg-opacity-40 text-white rounded-[20px] hover:cursor-pointer hover:bg-opacity-100 hover:backdrop-blur-0 transition-all flex items-center justify-center gap-2" onClick={handleEditClick}>
                            Edit
                        </button>
                    </div>
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
                </div>
            </div>
        </>
    );
};

export default Profile;
