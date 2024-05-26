import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import axios from 'axios';

export default function Pertest({ showSidebar }){
    const [msg, setMsg] = useState("");
    const [MBTI, setMBTI] = useState("");
    const getPredictResult = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { message: msg });
            const predictedResult = response.data.prediction;
            console.log("Type:", predictedResult);
            setMBTI(predictedResult);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    

    return(
        <div className=" w-full h-screen flex flex-col items-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito ">
            <Sidebar showSidebar={showSidebar}/>
            <div className='flex flex-col items-center justify-center mt-20'>
                <h1 className='text-[70px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#CE9EFF]  mt-5'>
                    Personality Test
                </h1> 
                <p className='text-[25px] font-semibold text-[#D5ADFF] '>
                    Dive Into Your Personality: Write about Yourself, Tap 'Analyze' 
                </p> 
                <p className='text-[25px] font-semibold text-[#D5ADFF]'>
                    and Let Our AI Reveal Your MBTI Type!
                </p>
                <label className="text-[25px] font-semibold text-white mt-3"> 
                    Dialogue: <br />
                </label>
                <textarea id="message" rows="10" className="block p-5 w-full  text-[18px] font-medium text-gray-900 border border-[#CE9EFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_20px] rounded-[20px] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#B770FF] to-89%" onChange={e => setMsg(e.target.value)}></textarea>
                <button className='analyze  bg-white rounded-[16px] w-[70%] p-3 font-bold text-black mt-5 mb-2 px-20  transform motion-safe:hover:scale-105  ' type="button" onClick={getPredictResult}>Analyze</button>
                <p className='text-white'>
                    Analysis:
                </p>
                <div className='flex justify-center h-full w-[120%] border-2 border-primary-pink rounded-[30px] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#B770FF] to-89%  '>
                    <p className='text-[25px] font-semibold'>{MBTI}</p>
                </div>
            </div>

        
        </div>
    )
}