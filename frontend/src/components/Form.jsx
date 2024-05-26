// form.jsx

import React, { useState } from 'react';

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
    <div className="w-96 h-96 relative bg-black backdrop-blur-3xl mx-auto">
      <img
        className="w-96 h-96 absolute blur-xl"
        src="https://via.placeholder.com/1470x1026"
        alt="background"
      />
      <div className="w-96 h-96 absolute bg-stone-950 opacity-70 rounded-2xl border-4 border-fuchsia-500 backdrop-blur-lg p-8">
        <div className="text-center text-white text-2xl mb-6">How do you identify your gender?</div>
        <div className="flex justify-around mb-6">
          {['Man', 'Woman', 'LGBTQIA+', 'Nonbinary'].map((gender) => (
            <div
              key={gender}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-medium border-2 cursor-pointer ${
                selectedGender === gender ? 'bg-fuchsia-500' : 'bg-stone-950 border-fuchsia-500'
              }`}
              onClick={() => handleGenderClick(gender)}
            >
              {gender}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className="w-10 h-10 rounded-full bg-fuchsia-500 text-white flex items-center justify-center"
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
