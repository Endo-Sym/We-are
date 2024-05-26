// form.jsx

import React, { useState } from 'react';

// Question1
export const GenderQuestion = ({ onNext }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  const handleNextClick = () => {
    if (selectedGender) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
      {/* <img
        className="w-96 h-96 absolute blur-xl"
        src="https://via.placeholder.com/1470x1026"
        alt="background"
      /> */}
      <div className='flex flex-col justify-center items-center gap-5'>
        <div className="text-center text-white text-3xl mb-6 ">How do you identify your gender?</div>
        <div className="flex justify-center gap-4 mb-10">
          {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
            <div
              key={gender}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                selectedGender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
              }`}
              onClick={() => handleGenderClick(gender)}
            >
              {gender}
            </div>
          ))}
        </div>
      </div>
        <div className="text-center ">
          <button
            className=" flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </div>
    </div>

    
  );
};


// Question2
export const BirthdayQuestion = ({ onNext }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleDayChange = (event) => setDay(event.target.value);
  const handleMonthChange = (event) => setMonth(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);

  const handleNextClick = () => {
    if (day && month && year) {
      setConfirmationVisible(true);
    }
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      onNext({ day, month, year });
    }
    setConfirmationVisible(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
      <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className="text-center text-white text-3xl mb-6">When is your birthday?</h1>
        <div className="flex justify-center gap-4 mb-6 text-black">
          <select value={day} onChange={handleDayChange} className="p-2 rounded border">
            <option value="" disabled>Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select value={month} onChange={handleMonthChange} className="p-2 rounded border">
            <option value="" disabled>Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={year} onChange={handleYearChange} className="p-2 rounded border">
            <option value="" disabled>Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button
            className=" flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
            onClick={handleNextClick}
            disabled={!day || !month || !year}
          >
            &gt;
          </button>
        </div>
      </div>
      {isConfirmationVisible && (
        <div className="absolute flex justify-center items-center bg-black text-black bg-opacity-50">
          <div className="bg-white p-8 rounded-[20px] shadow-lg">
            <h1 className="text-2xl mb-4">Birthdate Confirmation</h1>
            <p className="text-center mb-4">Is {day}/{month}/{year} your birthday? <br />It cannot be changed later.</p>
            <div className="flex justify-center items-center gap-2">
              <button className="px-4 py-2 bg-green-500 text-black rounded" onClick={() => handleConfirmation(true)}>Yes</button>
              <button className="px-4 py-2 bg-red-500 text-black rounded" onClick={() => handleConfirmation(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Question3
export const FriendDateQuestion = ({ onNext }) => {
  const [selectedFriendGender, setSelectedFriendGender] = useState(null);
  const [selectedDateGender, setSelectedDateGender] = useState(null);
  
  const handleFriendGenderClick = (gender) => {
    setSelectedFriendGender(gender);
  };

  const handleDateGenderClick = (gender) => {
    setSelectedDateGender(gender);
  };

  const handleNextClick = () => {
    if (selectedFriendGender) {
      if (selectedDateGender) {
        onNext();
      }
    }
  };

  return (
    <div className="h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
      {/* <img
        className="w-96 h-96 absolute blur-xl"
        src="https://via.placeholder.com/1470x1026"
        alt="background"
      /> */}
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className="text-center text-white  text-3xl mb-3">Who you wan to go with?</h1>
        <p className='text-white text-2xl mb-3'>Friend</p>
        <div className="flex justify-center gap-4 mb-5">
          {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
            <div
              key={gender}
              className={`w-[140px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                selectedFriendGender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
              }`}
              onClick={() => handleFriendGenderClick(gender)}
            >
              {gender}
            </div>
          ))}
          
        </div>
        <p className='text-white text-2xl mb-3'>Date</p>
        <div className="flex justify-center gap-4 mb-10">
          {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
            <div
              key={gender}
              className={`w-[140px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                selectedDateGender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
              }`}
              onClick={() => handleDateGenderClick(gender)}
            >
              {gender}
            </div>
          ))}
          
        </div>
        <div className="text-center">
          <button
            className=" flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
            onClick={handleNextClick}
          >
            &gt;
          </button>
          
        </div>
      </div>
    </div>
  );
};

// Question4
export const InterestQuestion = ({ onNext }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNextClick = () => {
    if (selectedInterests.length >= 5) {
      onNext();
    }
  };

  return (
        <div className="h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-6 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
          {/* <img
            className="w-96 h-96 absolute blur-xl"
            src="https://via.placeholder.com/1470x1026"
            alt="background"
          /> */}
        <div className='flex flex-col justify-center items-center text-white'>
        <h1 className=" text-3xl mb-3">Your interests?</h1>
        <p className='text-white text-2xl mb-3'>{selectedInterests.length}/5</p>
        <p>Add at least 5 interests to your profile. You'll be able to chat, talk,</p>
        <p className='mb-3'>and meet like-minded people in this universe.</p>
        <div className="grid grid-cols-4 gap-4 mb-3">
          {['Sport', 'Gaming', 'Book', 'Learning', 'movie','art','technology','history','food','memes','fasion','music','travel','photography','gym','cooking','coding','design','dance','yoga','fitness','culture','nature','animals'].map((interest) => (
            <div
              key={interest}
              className={`w-[140px] h-[40px] rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                selectedInterests.includes(interest) ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
              }`}
              onClick={() => handleInterestClick(interest)}
            >
              {interest}
            </div>
          ))}
        </div>
        <div className="text-center mt-2">
          <button
            className=" flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
            onClick={handleNextClick}
            disabled={selectedInterests.length < 5}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

// Question5