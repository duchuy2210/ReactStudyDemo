import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({open,handleClose}) => {
  if (typeof document == 'undefined') return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open?'':'invisible'} modal`}>
      <div className="absolute inset-0 p-5 bg-black bg-opacity-50 overlay" onClick={handleClose}></div>
      <div className="relative z-10 w-full p-10 bg-white rounded-xl max-w-[550px] modal-content">
        <span className="absolute top-0 right-0 flex items-center justify-center cursor-pointer -translate-y-2/4 translate-x-2/4" onClick={handleClose}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18.5" fill="white" stroke="#E7ECF3" />
            <path
              d="M20.225 19L25.7375 13.4875C26.0875 13.1375 26.0875 12.6125 25.7375 12.2625C25.3875 11.9125 24.8625 11.9125 24.5125 12.2625L19 17.775L13.4875 12.2625C13.1375 11.9125 12.6125 11.9125 12.2625 12.2625C11.9125 12.6125 11.9125 13.1375 12.2625 13.4875L17.775 19L12.2625 24.5125C12.0875 24.6875 12 24.8625 12 25.125C12 25.65 12.35 26 12.875 26C13.1375 26 13.3125 25.9125 13.4875 25.7375L19 20.225L24.5125 25.7375C24.6875 25.9125 24.8625 26 25.125 26C25.3875 26 25.5625 25.9125 25.7375 25.7375C26.0875 25.3875 26.0875 24.8625 25.7375 24.5125L20.225 19Z"
              fill="#84878B"
            />
          </svg>
        </span>
        <h1 className="text-4xl font-medium text-center ">Welcome Back!</h1>
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="email" className="text-sm cursor-pointer">
            Email address:
          </label>
          <input
            type="text"
            className="w-full p-4 leading-5 bg-gray-400 bg-opacity-50 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="password" className="text-sm cursor-pointer">
            Enter your password:
          </label>
          <input
            type="text"
            className="w-full p-4 bg-gray-400 bg-opacity-50 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <button className="w-full p-4 text-base font-semibold text-white bg-blue-500 rounded-lg">
          Sign in
        </button>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default Modal;
