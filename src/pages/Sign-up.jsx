// import { useState } from 'react'
// import './App.css'
import logo from '/assets/images/logo.png'

function SignUp() {

return (
    <div className="w-full h-[100vh] flex items-center justify-center border-black bg-[url('./assets/images/welcome-bg.png')] bg-cover font-poppins">
        <div className="flex flex-col items-center justify-between m-16 p-16 w-[600px] max-w-[600px] h-[85%] bg-black text-white border border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_30px] relative rounded-[50px] top-5">
            <div className="logo rounded-full border size-[100px] flex items-center justify-center bg-black absolute -top-[50px] border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_30px]">
                <img className="w-[60px]" src={logo}/>
            </div>
            <h1 className="text-[64px] font-bold ">Sign up</h1>
            <form className="h-full w-full flex flex-col justify-center ">
                <div className='flex flex-row gap-3'>
                    <label className="text-[#A8A6A6]"><br />
                        Name<br />
                        <input input className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_20px] rounded-[16px] w-full px-4 py-3 mt-2'
                            type="text"
                        />
                    </label>
                    <label className="text-[#A8A6A6]"><br />
                        Username<br />
                        <input input className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_20px] rounded-[16px] w-full px-4 py-3 mt-2'
                            type="text"
                        />
                    </label>
                </div>
                    <label className="text-[#A8A6A6]"><br />
                        Email<br />
                        <input input className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_20px] rounded-[16px] w-full px-4 py-3 mt-2'
                            type="email"
                        />
                    </label>
                <label className="text-[#A8A6A6]"> <br />
                    Password <br />
                    <input input className='blank-space text-white font-medium bg-gray-700 border border-[#DF1CFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_20px] rounded-[16px] w-full px-4 py-3 mt-2'
                        type="password"
                    />
                </label><br /><br />
                <button className='signin-button bg-white rounded-[16px] p-3 font-bold text-black mb-2' type="button">Create Account</button>
                <p  className="text-[#8455B2] self-center flex gap-1">
                    Already have an account?<a className="font-bold underline" href="/signin">Sign in</a>
                </p>
            </form>
        </div>
    </div>
    )
}

export default SignUp;