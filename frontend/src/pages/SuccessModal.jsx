import PropTypes from 'prop-types'; // นำเข้า PropTypes
import Modal from 'react-modal';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const SuccessModal = ({ isOpen, onRequestClose, message }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-3xl  w-1/4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        ariaHideApp={false}
      ><div className="text-white-500 text-4xl mb- flex justify-center p-5 bg-green-400 text-white  rounded-lg ">
      <IoIosCheckmarkCircleOutline style={{ fontSize: '6rem' }}/>
    </div>

        <div className="mb-4">
          <h2 className="text-4xl font-medium	mb-2 text-center font-poppins">Sucess</h2>
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


SuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, 
  onRequestClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default SuccessModal;
