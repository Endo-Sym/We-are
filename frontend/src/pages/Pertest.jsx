import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pertest({ showSidebar }){
    const [text, setText] = useState("");
    const [isVoid, setIsVoid] = useState(true);
    const [textCount, setTextCount] = useState(0);
    const [MBTI, setMBTI] = useState("");
    const getPredictResult = async (e) => {
        e.preventDefault();
        if(text === ""){return setIsVoid(prev => true), setMBTI(prev => "");}
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { text: text });
            const predictedResult = response.data.prediction;
            console.log("Type:", predictedResult);
            setMBTI(predictedResult);
            setIsVoid(prev => false);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleTextChange = (e) => {
        setText(e.target.value)
        setTextCount(e.target.value.length); 
    };

    const type_description = {
        "ISTJ" : "Quiet, serious, earn success by being thorough and dependable. Practical, matter-of-fact, realistic, and responsible. Decide logically what should be done and work toward it steadily, regardless of distractions. Take pleasure in making everything orderly and organized—their work, their home, their life. Value traditions and loyalty.",
        "ISFJ" : "Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations. Thorough, painstaking, and accurate. Loyal, considerate, notice and remember specifics about people who are important to them, concerned with how others feel. Strive to create an orderly and harmonious environment at work and at home.",
        "INFJ" : "Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people and are insightful about others. Conscientious and committed to their firm values. Develop a clear vision about how best to serve the common good. Organized and decisive in implementing their vision.",
        "INTJ" : "Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns in external events and develop long-range explanatory perspectives. When committed, organize a job and carry it through. Skeptical and independent, have high standards of competence and performance—for themselves and others.",
        "ISTP" : "Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work and readily get through large amounts of data to isolate the core of practical problems. Interested in cause and effect, organize facts using logical principles, value efficiency.",
        "ISFP" : "Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them. Like to have their own space and to work within their own time frame. Loyal and committed to their values and to people who are important to them. Dislike disagreements and conflicts; don't force their opinions or values on others.",
        "INFP" : "Idealistic, loyal to their values and to people who are important to them. Want to live a life that is congruent with their values. Curious, quick to see possibilities, can be catalysts for implementing ideas. Seek to understand people and to help them fulfill their potential. Adaptable, flexible, and accepting unless a value is threatened.",
        "INTP" : "Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than in social interaction. Quiet, contained, flexible, and adaptable. Have unusual ability to focus in depth to solve problems in their area of interest. Skeptical, sometimes critical, always analytical.",
        "ESTP" : "Flexible and tolerant, take a pragmatic approach focused on immediate results. Bored by theories and conceptual explanations; want to act energetically to solve the problem. Focus on the here and now, spontaneous, enjoy each moment they can be active with others. Enjoy material comforts and style. Learn best through doing.",
        "ESFP" : "Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen. Bring common sense and a realistic approach to their work and make work fun. Flexible and spontaneous, adapt readily to new people and environments. Learn best by trying a new skill with other people.",
        "ENFP" : "Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly, and confidently proceed based on the patterns they see. Want a lot of affirmation from others, and readily give appreciation and support. Spontaneous and flexible, often rely on their ability to improvise and their verbal fluency.",
        "ENTP" : "Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems. Adept at generating conceptual possibilities and then analyzing them strategically. Good at reading other people. Bored by routine, will seldom do the same thing the same way, apt to turn to one new interest after another.",
        "ESTJ" : "Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done, focus on getting results in the most efficient way possible. Take care of routine details. Have a clear set of logical standards, systematically follow them and want others to also. Forceful in implementing their plans.",
        "ESFJ" : "Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it. Like to work with others to complete tasks accurately and on time. Loyal, follow through even in small matters. Notice what others need in their day-to-day lives and try to provide it. Want to be appreciated for who they are and for what they contribute.",
        "ENFJ" : "Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others. Find potential in everyone, want to help others fulfill their potential. May act as catalysts for individual and group growth. Loyal, responsive to praise and criticism. Sociable, facilitate others in a group, and provide inspiring leadership.",
        "ENTJ" : "Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies, develop and implement comprehensive systems to solve organizational problems. Enjoy long-term planning and goal setting. Usually well informed, well read, enjoy expanding their knowledge and passing it on to others. Forceful in presenting their ideas."
    };

    return(
        <div className=" w-full min-h-screen h-full flex flex-col justify-center items-center border-black bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito">
            <Sidebar showSidebar={showSidebar}/>
            <div className={`flex flex-col items-center ${MBTI ? "justify-start pt-16" : "justify-center pt-10"} mt-[3.8rem] ml-[5.5rem] p-10 h-full`}>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-[70px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#CE9EFF] leading-tight'>
                        Personality Test
                    </h1> 
                    <div className='text-[22px] font-semibold text-[#D5ADFF] text-center'>
                        <p className=''>
                            Dive Into Your Personality: Write about Yourself, Tap 'Analyze' 
                        </p> 
                        <p className=''>
                            and Let Our AI Reveal Your MBTI Type!
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center h-full w-[600px] max-lg:w-full">
                    <label className="w-full p-2 py-0 text-[22px] font-semibold text-white mt-3"> 
                        Dialogue: 
                        {isVoid && <span className="inline font-medium text-[18px] text-red-500 mx-2">(Please enter text before analyze)</span>}
                    </label>
                    <textarea id="message" rows="" className="block px-5 py-2 w-full min-h-[6rem] text-[18px] font-medium text-gray-900 border border-[#CE9EFF] shadow-[rgba(223,_28,_255,_0.6)_0px_0px_16px] rounded-[20px] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#B770FF] to-89% focus:outline-none overscroll-contain" onChange={handleTextChange}></textarea>
                    <p className='text-white w-full p-2 py-1 text-[14px]'>{textCount}/6500</p>
                    <button className='bg-white rounded-[16px] w-full p-3 font-bold text-black mt-2 mb-2 px-20 transform motion-safe:hover:scale-105' type="button" onClick={getPredictResult}>Analyze</button>
                    {MBTI &&
                    <div className="h-full w-full">
                        <p className='text-white p-2 pb-1 font-semibold'>
                        Analysis:
                        </p>
                        <div className='flex flex-col items-center justify-center min-h-full w-full p-5 py-4 border-2 border-primary-pink rounded-[30px] bg-gradient-to-r from-[#FFFFFF] from-0% to-[#B770FF] to-89%'>
                            <div className='bg-[#FF00B8] flex items-center justify-center rounded-[30px] py-1 px-5 font-semibold text-white'>
                                <p className="text-[25px]">{MBTI}</p>
                            </div>
                            <p className='text-[20px] mt-2 leading-tight font-normal'>{type_description[MBTI]}</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}