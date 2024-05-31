import React from 'react';

export const Form = ({ step, setStep, formData, setFormData, handleNextClick }) => {
  const handleGenderClick = (gender) => setFormData((prev) => ({ ...prev, gender }));
  const handleDayChange = (event) => setFormData((prev) => ({ ...prev, birthdate: { ...prev.birthdate, day: event.target.value } }));
  const handleMonthChange = (event) => setFormData((prev) => ({ ...prev, birthdate: { ...prev.birthdate, month: event.target.value } }));
  const handleYearChange = (event) => setFormData((prev) => ({ ...prev, birthdate: { ...prev.birthdate, year: event.target.value } }));
  const handleFriendGenderClick = (gender) => setFormData((prev) => ({ ...prev, friendGender: gender }));
  const handleDateGenderClick = (gender) => setFormData((prev) => ({ ...prev, dateGender: gender }));
  const handleInterestClick = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      {step === 1 && (
        <div className="flex flex-col justify-center items-center h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
          <div className='flex flex-col justify-center items-center gap-5'>
            <div className="text-center text-white text-3xl mb-6">How do you identify your gender?</div>
            <div className="flex justify-center gap-4 mb-10">
              {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
                <div
                  key={gender}
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                    formData.gender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
                  }`}
                  onClick={() => handleGenderClick(gender)}
                >
                  {gender}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
              onClick={handleNextClick}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col justify-center items-center h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
          <div className='flex flex-col justify-center items-center gap-5'>
            <h1 className="text-center text-white text-3xl mb-6">When is your birthday?</h1>
            <div className="flex justify-center gap-4 mb-6 text-black">
              <select value={formData.birthdate.day} onChange={handleDayChange} className="p-2 rounded border">
                <option value="" disabled>Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select value={formData.birthdate.month} onChange={handleMonthChange} className="p-2 rounded border">
                <option value="" disabled>Month</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select value={formData.birthdate.year} onChange={handleYearChange} className="p-2 rounded border">
                <option value="" disabled>Year</option>
                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button
                className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
                onClick={handleNextClick}
                disabled={!formData.birthdate.day || !formData.birthdate.month || !formData.birthdate.year}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className="text-center text-white text-3xl mb-3">Who you want to go with?</h1>
            <p className='text-white text-2xl mb-3'>Friend</p>
            <div className="flex justify-center gap-4 mb-5">
              {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
                <div
                  key={gender}
                  className={`w-[140px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                    formData.friendGender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
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
                    formData.dateGender === gender ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
                  }`}
                  onClick={() => handleDateGenderClick(gender)}
                >
                  {gender}
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
                onClick={handleNextClick}
                disabled={!formData.friendGender || !formData.dateGender}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex flex-col justify-center items-center h-auto w-[70%] border-2 border-primary-pink rounded-[30px] p-10 shadow-[rgba(223,_28,_255,_1)_0px_0px_50px] bg-black bg-opacity-60 backdrop-blur-md">
          <div className='flex flex-col justify-center items-center gap-5'>
            <h1 className="text-center text-white text-3xl mb-6">What are your interests?</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {['Sport', 'Gaming', 'Book', 'Learning', 'movie','art','technology','history','food','memes','fasion','music','travel','photography','gym','cooking','coding','design','dance','yoga','fitness','culture','nature','animals'].map((interest) => (
                <div
                  key={interest}
                  className={`w-[140px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                    formData.interests.includes(interest) ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
                  }`}
                  onClick={() => handleInterestClick(interest)}
                >
                  {interest}
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-fuchsia-500 text-white text-[45px]"
                onClick={handleNextClick}
                disabled={formData.interests.length < 5}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
      {step > 4 && <div className="text-white text-2xl">Form Complete! Data: {JSON.stringify(formData)}</div>}
    </div>
  );
};
