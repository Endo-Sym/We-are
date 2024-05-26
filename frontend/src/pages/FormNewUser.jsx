// FormNewUser.jsx

import React, { useState } from 'react';
import { GenderQuestion } from '../components/Form';
import { FriendDateQuestion } from '../components/Form';
import { InterestQuestion } from '../components/Form';
import { BirthdayQuestion } from '../components/Form';

const FormNewUser = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
      <div className="top-[60px] relative flex-grow overflow-y-auto ">
        <div className="min-h-screen flex items-center justify-center ">
          {step === 1 && <GenderQuestion onNext={handleNextStep} />}
          {step === 2 && <BirthdayQuestion onNext={handleNextStep} />}
          {step === 3 && <FriendDateQuestion onNext={handleNextStep} />}
          {step === 4 && <InterestQuestion onNext={handleNextStep} />}
          {step === 5 && <div className="text-white">Question 5 Component</div>}
        </div>
      </div>
    </div>
  );
};

export default FormNewUser;

