import PropTypes from 'prop-types'; // นำเข้า PropTypes
import Modal from 'react-modal';
import { IoCloseCircleOutline } from "react-icons/io5";

const ErrorModal = ({ isOpen, onRequestClose, message }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-3xl  w-1/4" 
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="text-white-400 text-4xl text-white mb- flex justify-center bg-red-600  p-5 rounded-lg ">
          <IoCloseCircleOutline style={{ fontSize: '6rem' }}/>
        </div>

        <div className="mb-4">
          <h2 className="text-4xl font-medium	- text-center font-poppins mb-2">Oops...</h2>
          <p className="text-center font-poppins mb-6 text-lg">{message}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="px-5 py-3 bg-blue-500 rounded-[30px]  text-white text-2xl mt3 font-poppins w-40 mb-5"
            onClick={onRequestClose}
          >
            Okay
          </button>
        </div>
      </Modal>
    );
  };


ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onRequestClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
