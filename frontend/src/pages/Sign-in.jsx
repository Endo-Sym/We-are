import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import logo from '/assets/images/logo.png';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/Usercontext';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";
import { GoogleLogin } from '@react-oauth/google';

function Signin() {
    const navigate = useNavigate(); 
    const { setUser } = useContext(UserContext);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [data, setData] = useState({
        identifier: '',
        password: ''
    });

    const checkNewUser = async (userId) => {
        try {
            const response = await axios.get(`/api/check-new-user?userId=${userId}`);
            return response.data.isNewUser;
        } catch (error) {
            console.error('Error checking new user:', error);
            return false;
        }
    };

    const onSuccess = async (credentialResponse) => {
        console.log('Google login success:', credentialResponse);
        const profile = credentialResponse.profileObj;
        if (profile) {
            const user = {
                id: profile.googleId,
                name: profile.name,
                email: profile.email,
                imageUrl: profile.imageUrl,
            };
            console.log('User profile:', user);
            setUser(user);

            const isNewUser = await checkNewUser(user.id);
            if (isNewUser) {
                navigate('/formnewuser');
            } else {
                navigate('/');
            }
        } else {
            console.error('Profile is undefined:', profile);
        }
    };

    const onFailure = (error) => {
        console.log('Google login failed:', error);
        toast.error('Google login failed.');
        navigate('/');
    };

    const SigninUser = async (e) => {
        e.preventDefault();
        const { identifier, password } = data;
        try {
            const response = await axios.post('/Sign-in', { identifier, password });
            const result = response.data;

            if (result.error) {
                toast.error(result.error);
            } else {
                console.log('User data:', result);
                setUser(result);
                setData({ identifier: '', password: '' });

                const isNewUser = await checkNewUser(result.id);
                if (isNewUser) {
                    navigate('/formnewuser');
                } else {
                    setIsSuccessModalOpen(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            }
        } catch (error) {
            setErrorMessage('Sorry, something went wrong.');
            setIsErrorModalOpen(true);
            console.error(error);
        }
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center border-black bg-[url('/assets/images/welcome-bg.png')] bg-cover font-poppins">
            <Toaster />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onRequestClose={() => setIsErrorModalOpen(false)}
                message={errorMessage}
            />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onRequestClose={() => setIsSuccessModalOpen(false)}
                message="Transaction Complete Successfully!."
            />
            <div className="flex flex-col items-center justify-between m-16 p-16 w-[600px] max-w-[600px] h-[85%] bg-black text-white border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px] relative rounded-[50px] top-5">
                <div className="logo rounded-full border size-[100px] flex items-center justify-center bg-black absolute -top-[50px] border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px]">
                    <a href="/"><img className="w-[60px]" src={logo} alt="logo" /></a>
                </div>
                <h1 className="text-[64px] font-bold mb-3">Sign in</h1>
                <form className="h-full w-full flex flex-col justify-center gap-4" onSubmit={SigninUser}>
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='signin-button bg-[#DF1CFF] rounded-[16px] w-full mb-6 p-3 font-medium text-xl flex items-center justify-center gap-2'
                                type="button"
                            >
                                <FaGoogle className='text-white' />
                                <span>Sign in with Google</span>
                            </button>
                        )}
                    />
                    <label className="text-[#A8A6A6]">
                        <p>Username or Email Address</p>
                        <input
                            className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
                            type="text"
                            value={data.identifier}
                            onChange={(e) => setData({ ...data, identifier: e.target.value })}
                        />
                    </label>
                    <label>
                        <div className="flex justify-between text-[#A8A6A6]">
                            <p>Password</p>
                            <a className="text-[#8455B2]" href="/sign-in">Forget password?</a>
                        </div>
                        <input
                            className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </label>
                    <button className='signin-button bg-white rounded-[16px] p-3 font-bold text-black mt-6' type="submit">Sign in</button>
                    <p className="text-[#8455B2] self-center flex gap-1">
                        No Account?
                        <a className="font-bold underline" href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signin;
