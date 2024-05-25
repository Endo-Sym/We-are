import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const LogoutModal = ({ isOpen, onRequestClose, message, onConfirm }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-3xl w-1/4" 
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="text-white-400 text-4xl text-white mb- flex justify-center bg-blue-400 p-5 rounded-lg ">
          <IoIosCheckmarkCircleOutline style={{ fontSize: '6rem' }}/>
        </div>
        <div className="mb-4">
          <h2 className="text-4xl font-medium text-center font-poppins mb-2">Are you sure?</h2>
          <p className="text-center font-poppins mb-6 text-lg">{message}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="px-5 py-3 bg-gray-500 rounded-[30px] text-white text-2xl mt3 font-poppins w-40 mb-5"
            onClick={onRequestClose}
          >
            No
          </button>
          <button
            className="px-5 py-3 bg-green-500 rounded-[30px] text-white text-2xl mt3 font-poppins w-40 mb-5"
            onClick={() => {
              onConfirm();
              onRequestClose();
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    );
};

LogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onRequestClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired, 
};

export default LogoutModal;
