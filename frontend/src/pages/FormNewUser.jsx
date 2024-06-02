import React, { useState, useContext } from 'react';
import { Form } from '../components/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/Usercontext';

const FormNewUser = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    gender: '',
    birthdate: { day: '', month: '', year: '' },
    friendGender: '',
    dateGender: '',
    interests: [],
  });

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (step === 1 && formData.gender) {
      setStep(2);
    } else if (step === 2 && formData.birthdate.day && formData.birthdate.month && formData.birthdate.year) {
      setStep(3);
    } else if (step === 3 && formData.friendGender && formData.dateGender) {
      setStep(4);
    } else if (step === 4 && formData.interests.length >= 5) {
      submitForm();
    }
  };

  const submitForm = async () => {
    const formattedFormData = {
      ...formData,
      birthdate: new Date(formData.birthdate.year, formData.birthdate.month - 1, formData.birthdate.day),
      userId: user._id,
    };

    try {
      console.log(formattedFormData);
      const response = await axios.post('/user-description', formattedFormData);
      alert('Form submitted successfully! : ', response.data);

      navigate('/');  // Redirect to the homepage or any desired path
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form.');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[url('./assets/images/cartoon-bg.png')] bg-cover bg-fixed font-nunito text-white">
      <div className="top-[40px] relative flex-grow overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center">
          <Form 
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FormNewUser;
