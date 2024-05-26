// FormNewUser.jsx

import React, { useState } from 'react';
import { GenderQuestion } from '../components/Form';

const FormNewUser = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      {step === 1 && <GenderQuestion onNext={handleNextStep} />}
      {step === 2 && <div className="text-white">Question 2 Component</div>}
      {step === 3 && <div className="text-white">Question 3 Component</div>}
      {step === 4 && <div className="text-white">Question 4 Component</div>}
      {step === 5 && <div className="text-white">Question 5 Component</div>}
    </div>
  );
};

export default FormNewUser;

