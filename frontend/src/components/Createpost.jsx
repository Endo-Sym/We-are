import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import usePreviewImg from './Previewingimga';

function Createpost({ onClose }) {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  
    const handleHeadingChange = (event) => {
      setHeading(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handlePost = () => {
      console.log("Post content:", { heading, description });
      onClose();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="border-2 border-primary-pink rounded-[20px] bg-black bg-opacity-80 backdrop-blur-lg w-96 p-6 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white">
              <IoMdClose size={24} />
            </button>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span>Post to:</span>
                <div className="bg-purple-600 px-3 py-1 rounded-full">#natural</div>
              </div>
              <textarea
            className="w-full p-0 bg-transparent text-white placeholder-gray-400 text-2xl focus:outline-none"
            value={heading}
            onChange={handleHeadingChange}
            maxLength="100"
            placeholder="Heading" 
          />
              <textarea
                className="w-full p-2 bg-gray-700 border-2 border-primary-pink  rounded-lg text-white placeholder-gray-400"
                value={description}
                onChange={handleDescriptionChange}
                maxLength="500"
                placeholder="Description"
              />
              <div className="flex items-center">
              <label className="cursor-pointer flex items-center justify-end">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
              <MdAddPhotoAlternate size={30} className="text-purple-500" />
            </label>
              </div>
              {imgUrl && (
                <div className="mb-4">
                  <img src={imgUrl} alt="Preview" className="w-full h-auto rounded-lg" />
                </div>
              )}
              <div className="flex justify-center">
                <button onClick={handlePost} className="bg-white hover:bg-purple-600 text-black p-2 font-bold border-2 border-primary-pink rounded-[30px] w-40">Post</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Createpost;