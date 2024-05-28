import { useState } from 'react';
import axios from 'axios';
import logo from '/assets/images/logo.png';
import { toast, Toaster } from 'react-hot-toast';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const SignupUser = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = data;
    try {
      const response = await axios.post("/Sign-up", {
        name,
        username,
        email,
        password
      });
      const { data: responseData } = response;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({
          name: '',
          username: '',
          email: '',
          password: ''
        });
        setIsSuccessModalOpen(true);
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
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
        message="Account created successfully."
      />
      <div className="flex flex-col items-center justify-between m-16 p-16 w-[600px] max-w-[600px] h-[85%] bg-black text-white border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px] relative rounded-[50px] top-5">
        <div className="logo rounded-full border size-[100px] flex items-center justify-center bg-black absolute -top-[50px] border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px]">
          <a href="/"><img className="w-[60px]" src={logo} alt="logo" /></a>
        </div>
        <h1 className="text-[64px] font-bold">Sign up</h1>
        <form className="h-full w-full flex flex-col justify-center" onSubmit={SignupUser}>
          <div className='flex flex-row gap-3'>
            <label className="text-[#A8A6A6]">
              Name<br />
              <input
                className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </label>
            <label className="text-[#A8A6A6]">
              Username<br />
              <input
                className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
                type="text"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </label>
          </div>
          <label className="text-[#A8A6A6]">
            Email<br />
            <input
              className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </label>
          <label className="text-[#A8A6A6]">
            Password<br />
            <input
              className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </label>
          <br /><br />
          <button className='signin-button bg-white rounded-[16px] p-3 font-bold text-black mb-2'>Create Account</button>
          <p className="text-[#8455B2] self-center flex gap-1">
            Already have an account? <a className="font-bold underline" href="/signin">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
