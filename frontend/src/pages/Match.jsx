import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import profilePic from '../../assets/images/profile-pic.svg';
import { UserContext } from '../../context/Usercontext';

const Match = ({ showSidebar }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user = {}, setUser } = useContext(UserContext);

    // Define an array to hold multiple profiles
    const profiles = [
        {
            name: user.name || user.username,
            lookingFor: 'Friends',
            followers: 32000,
            love: 45200,
            contact: "@bobppbpbpbp",
            country: "Thailand",
            birthdate: "2004-02-14T17:00:00.000Z",
            dateGender: "Man",
            email: "tt6@g",
            friendGender: "Man",
            gender: "Woman",
            interests: ['Sport', 'Movie', 'Food', 'Photography', 'Travel'],
            lookingFor: "Friends",
            name: "t6",
            status: "Single",
            type: "ENTP",
            userId: "665bbc2038e7d9fa98e3e212",
            username : "tt6",
            profileImage: profilePic,
        },
        {
            name: "Alice",
            lookingFor: "Networking",
            followers: 200,
            love: 50,
            contact: "@alice_nw",
            country: "USA",
            birthdate: "1990-05-10T17:00:00.000Z",
            dateGender: "Woman",
            email: "alice@example.com",
            friendGender: "All",
            gender: "Non-binary",
            interests: ['Technology', 'Music', 'Gaming', 'Reading', 'Travel'],
            status: "Complicated",
            type: "INTJ",
            userId: "1234567890abcdef12345678",
            username: "alice_nw",
            profileImage: profilePic
        }
        ,
        {
            name: "John",
            lookingFor: "Business",
            followers: 300,
            love: 80,
            contact: "@john_biz",
            country: "Canada",
            birthdate: "1985-07-20T17:00:00.000Z",
            dateGender: "Woman",
            email: "john@example.com",
            friendGender: "Woman",
            gender: "Man",
            interests: ['Business', 'Fitness', 'Cooking', 'Photography', 'Travel'],
            status: "Married",
            type: "ENTP",
            userId: "abcdef1234567890abcdef12",
            username: "john_biz",
            profileImage: profilePic
        }
        ,
        {
            name: "Sara",
            lookingFor: "Dating",
            followers: 150,
            love: 60,
            contact: "@sara_date",
            country: "UK",
            birthdate: "1995-12-01T17:00:00.000Z",
            dateGender: "Man",
            email: "sara@example.com",
            friendGender: "Man",
            gender: "Woman",
            interests: ['Art', 'Movies', 'Fashion', 'Cooking', 'Travel'],
            status: "Single",
            type: "INFJ",
            userId: "7890abcdef1234567890abcd",
            username: "sara_date",
            profileImage: profilePic
        }
        
    ];

    const [profileIndex, setProfileIndex] = useState(0);
    const profileData = profiles[profileIndex];

    const handleNextProfile = () => {
        setProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    };

    const handlePreviousProfile = () => {
        setProfileIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length);
    };

    return (
        <>
            <Sidebar showSidebar={showSidebar} />
            <Loading isLoading={isLoading} />
            <div className={`flex bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed fixed font-nunito text-white pt-[60px] ${showSidebar ? "pl-[12.5rem]" : "pl-[5.5rem]"} h-full w-full items-center justify-center`}>
                <div className="h-full w-3/4 relative bg-transparent flex flex-col items-center justify-center p-2">
                    <div className="flex items-center gap-4">
                        <button onClick={handlePreviousProfile} className='rotate-180'> 
                            <svg width="50" height="91" viewBox="0 0 50 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66356 89.6715C3.50447 91.446 6.48174 91.446 8.3181 89.6715L47.2408 52.0703C48.1121 51.2415 48.8059 50.2439 49.2799 49.1383C49.754 48.0327 49.9985 46.8421 49.9985 45.6389C49.9985 44.4357 49.754 43.2451 49.2799 42.1395C48.8059 41.0339 48.1121 40.0363 47.2408 39.2075L8.03628 1.32872C7.14653 0.482179 5.96824 0.00636803 4.74073 -0.00208275C3.51321 -0.0105335 2.3285 0.449009 1.42719 1.28322C0.980701 1.69518 0.623449 2.1945 0.377559 2.75027C0.13167 3.30604 0.00237801 3.90642 -0.00230922 4.51424C-0.00699645 5.12206 0.11302 5.72437 0.350309 6.28387C0.587598 6.84337 0.937107 7.34816 1.37719 7.76697L37.259 42.4243C37.695 42.8388 38.0422 43.3377 38.2794 43.8907C38.5167 44.4437 38.639 45.0393 38.639 45.6412C38.639 46.243 38.5167 46.8386 38.2794 47.3916C38.0422 47.9447 37.695 48.4436 37.259 48.858L1.66356 83.2424C1.22769 83.6564 0.880594 84.155 0.643402 84.7076C0.406209 85.2603 0.283887 85.8555 0.283887 86.4569C0.283887 87.0584 0.406209 87.6536 0.643402 88.2063C0.880594 88.7589 1.22769 89.2575 1.66356 89.6715Z" fill="white"/>
                            </svg>
                        </button>
                        <div className="flex flex-col items-center relative">
                            <div className="relative">
                                <div className="max-w-[30rem] h-[29rem] relative rounded-[50px] border-2 border-fuchsia-500 overflow-hidden">
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
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">Country :</span>{profileData.country}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">Birthday :</span>{profileData.birthdate}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">Looking for :</span>{profileData.lookingFor}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">Date gender :</span>{profileData.dateGender}</p>
                                    <p className="flex items-center text-lg"><span className="material-icons mr-2">Freind gender :</span>{profileData.friendGender}</p>
                                    <div className="flex justify-start gap-2 mt-2">
                                        <p className={`flex items-center justify-center w-auto text-lg rounded-[18px] ${profileData.gender === "Woman" ? "bg-pink-500" : profileData.gender === "Man" ? "bg-blue-500" : "bg-[#9C59D1]"}`}>
                                            <span className="material-icons p-2">{profileData.gender}</span></p>                                        <p className={`flex items-center justify-center w-20 text-lg rounded-[18px] bg-primary-pink`}>
                                            <span className="material-icons p-2">{profileData.type}</span></p>
                                        <p className={`flex items-center justify-center w-auto text-lg rounded-[18px] bg-primary-pink`}><span className="material-icons p-2">{profileData.status}</span></p>
                                    </div>
                                </div>
                            </div>

                            <p className="flex flex-wrap gap-2 mt-4">
                                    {profileData.interests.map((interest, index) => (
                                        <span key={index} className="w-auto h-[30px] px-3 rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer bg-black bg-opacity-30 backdrop-blur-md border-fuchsia-500">
                                            {interest}
                                        </span>
                                    ))}
                            </p>

                            <div className="flex gap-6 mt-5">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-center min-w-[7rem] h-[4rem] px-4 py-2 border-2 border-fuchsia-500 bg-black backdrop-blur-sm bg-opacity-40 text-white rounded-[20px] hover:bg-fuchsia-500 hover:cursor-pointer hover:bg-opacity-100 transition-colors flex items-center justify-center gap-2">
                                        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="6" y="13.7998" width="33" height="12.4" rx="4" stroke="white" stroke-width="2" />
                                            <path d="M38.3519 22C38.3519 31.4519 31.1937 39 22.5 39C13.8064 39 6.64819 31.4519 6.64819 22C6.64819 12.5481 13.8064 5 22.5 5C31.1937 5 38.3519 12.5481 38.3519 22Z" stroke="white" stroke-width="2" />
                                            <rect x="9.88892" y="16.2" width="10.963" height="8.4" rx="4" stroke="white" stroke-width="2" />
                                            <rect x="24.7963" y="16.2" width="10.963" height="8.4" rx="4" stroke="white" stroke-width="2" />
                                            <g filter="url(#filter0_f_756_291)">
                                                <rect x="5" y="13.9143" width="33.4168" height="12.5872" rx="4" stroke="white" stroke-width="2" />
                                                <path d="M37.761 22.234C37.761 31.8162 30.512 39.468 21.7084 39.468C12.9049 39.468 5.65588 31.8162 5.65588 22.234C5.65588 12.6518 12.9049 5 21.7084 5C30.512 5 37.761 12.6518 37.761 22.234Z" stroke="white" stroke-width="2" />
                                                <rect x="8.93518" y="16.3457" width="11.1173" height="8.5352" rx="4" stroke="white" stroke-width="2" />
                                                <rect x="24.0201" y="16.3457" width="11.1173" height="8.5352" rx="4" stroke="white" stroke-width="2" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_f_756_291" x="0" y="0" width="43.4169" height="44.468" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_756_291" />
                                                </filter>
                                            </defs>
                                        </svg>
                                        <p className="text-[24px]">{profileData.followers}</p>
                                    </div>
                                    <p>Followers</p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-center min-w-[7rem] h-[4rem] px-4 py-2 border-2 border-fuchsia-500 bg-black backdrop-blur-sm bg-opacity-40 text-white rounded-[20px] hover:bg-fuchsia-500 hover:cursor-pointer hover:bg-opacity-100 hover:backdrop-blur-0 transition-all flex items-center justify-center gap-2">
                                        <svg width="43" height="47" viewBox="0 0 43 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_f_509_710)">
                                                <path d="M20.6433 6.56771L15.8364 15.3643C15.7136 15.589 15.5093 15.7581 15.2655 15.8366L6.37125 18.7012C5.70729 18.9151 5.46074 19.7259 5.89326 20.2731L12.2509 28.3175C12.3814 28.4826 12.4565 28.6846 12.4655 28.8948L12.9222 39.5594C12.952 40.2567 13.6689 40.7097 14.3115 40.4374L22.7066 36.8796C22.956 36.774 23.2376 36.774 23.487 36.8796L31.6864 40.3544C32.3788 40.6479 33.1352 40.1007 33.0732 39.3512L32.1744 28.4965C32.1555 28.2677 32.2158 28.0394 32.3453 27.8499L37.2568 20.6595C37.6302 20.1129 37.379 19.3609 36.7521 19.1484L28.2454 16.2644C28.0145 16.1861 27.8202 16.0261 27.6989 15.8146L22.3884 6.54994C21.9997 5.87178 21.0181 5.88178 20.6433 6.56771Z" stroke="white" stroke-width="3" />
                                            </g>
                                            <path d="M19.6799 6.26992L13.7883 15.3927C13.6546 15.5998 13.4491 15.7501 13.2112 15.815L2.59944 18.707C1.87309 18.9049 1.61769 19.8042 2.13157 20.3544L9.557 28.3044C9.71809 28.4769 9.81299 28.7007 9.82492 28.9364L10.3674 39.6545C10.4013 40.3244 11.0722 40.7717 11.7037 40.5452L22.0495 36.8353C22.2678 36.7571 22.5064 36.7571 22.7246 36.8353L32.8521 40.4669C33.5429 40.7146 34.2564 40.1586 34.1849 39.4282L33.1205 28.5501C33.0949 28.2891 33.1729 28.0286 33.3376 27.8245L39.0527 20.7449C39.5023 20.188 39.2383 19.3529 38.5503 19.1556L28.3971 16.2429C28.1718 16.1783 27.9764 16.0366 27.8449 15.8425L21.3478 6.25158C20.9459 5.65825 20.0687 5.66789 19.6799 6.26992Z" stroke="white" stroke-width="3" />
                                            <defs>
                                                <filter id="filter0_f_509_710" x="0.176758" y="0.547119" width="42.7554" height="45.4719" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_509_710" />
                                                </filter>
                                            </defs>
                                        </svg>
                                        <p className="text-[24px]">{profileData.love}</p>
                                    </div>
                                    <p>Love</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleNextProfile}>
                            <svg width="50" height="91" viewBox="0 0 50 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66356 89.6715C3.50447 91.446 6.48174 91.446 8.3181 89.6715L47.2408 52.0703C48.1121 51.2415 48.8059 50.2439 49.2799 49.1383C49.754 48.0327 49.9985 46.8421 49.9985 45.6389C49.9985 44.4357 49.754 43.2451 49.2799 42.1395C48.8059 41.0339 48.1121 40.0363 47.2408 39.2075L8.03628 1.32872C7.14653 0.482179 5.96824 0.00636803 4.74073 -0.00208275C3.51321 -0.0105335 2.3285 0.449009 1.42719 1.28322C0.980701 1.69518 0.623449 2.1945 0.377559 2.75027C0.13167 3.30604 0.00237801 3.90642 -0.00230922 4.51424C-0.00699645 5.12206 0.11302 5.72437 0.350309 6.28387C0.587598 6.84337 0.937107 7.34816 1.37719 7.76697L37.259 42.4243C37.695 42.8388 38.0422 43.3377 38.2794 43.8907C38.5167 44.4437 38.639 45.0393 38.639 45.6412C38.639 46.243 38.5167 46.8386 38.2794 47.3916C38.0422 47.9447 37.695 48.4436 37.259 48.858L1.66356 83.2424C1.22769 83.6564 0.880594 84.155 0.643402 84.7076C0.406209 85.2603 0.283887 85.8555 0.283887 86.4569C0.283887 87.0584 0.406209 87.6536 0.643402 88.2063C0.880594 88.7589 1.22769 89.2575 1.66356 89.6715Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Match;