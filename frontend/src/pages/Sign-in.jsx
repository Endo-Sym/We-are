import { useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import logo from '/assets/images/logo.png';

function Signin() {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const SigninUser = async (e) => {
    e.preventDefault();
    const { email, username, password } = data;
    try {
      const response = await axios.post("/Sign-in", {
        email,
        username,
        password
      });
      const result = response.data;
      if (result.error) {
        toast.error(result.error);
      } else {
        setData({
          username: '',
          email: '',
          password: ''
        });
        navigate('/');
      }
    } catch (error) {
      toast.error("An error occurred while signing in.");
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center border-black bg-[url('../assets/images/welcome-bg.png')] bg-cover font-poppins"> {/* Update the path */}
      <div className="flex flex-col items-center justify-between m-16 p-16 w-[600px] max-w-[600px] h-[85%] bg-black text-white border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px] relative rounded-[50px] top-5">
        <div className="logo rounded-full border size-[100px] flex items-center justify-center bg-black absolute -top-[50px] border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 30px]">
          <a href="/"><img className="w-[60px]" src={logo} alt="logo" /></a>
        </div>
        <h1 className="text-[64px] font-bold mb-3">Sign in</h1>
        <form className="h-full w-full flex flex-col justify-center gap-4" onSubmit={SigninUser}>
          <button className='signin-button bg-[#DF1CFF] rounded-[16px] w-full mb-6 p-3 font-medium text-xl' type="button">Sign in with Google</button>
          <label className="text-[#A8A6A6]">
            <p>Username or Email Address</p>
            <input
              className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223, 28, 255, 0.6) 0px 0px 20px] rounded-[16px] w-full px-4 py-3 mt-2'
              type="text"
              value={data.username || data.email}
              onChange={(e) => setData({ ...data, username: e.target.value, email: e.target.value })}
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
