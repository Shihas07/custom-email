import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default function WaitDelay({ open, onClose }) {

    const [delay,setDelay]=useState({
          
        Time:""
    })
    console.log("delay",delay)
    const [timeDelay,setTime]=useState([])

    console.log("timeDelay",timeDelay)


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const handleChange = (e) => {
    const { value } = e.target;

   

    // Update the delay time state correctly
    setDelay((prev) => ({
      ...prev,
      Time: value, // Update the Time field with the new value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Append the current delay to the timeDelay array
    setTime((prev) => [...prev, delay]);

    // Optionally reset the input field
    setDelay({ Time: "" });

   
    
  };


  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Wait Delay Modal"
      >
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-bold text-blue-600">Wait Delay Settings</h2>
          <form className="flex flex-col space-y-2 w-full" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              Delay Time (in seconds)
            </label>
            <input
              type="number"
              value={delay.Time}
              placeholder="Enter delay time"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
               onChange={handleChange}

            />
            <div className="flex space-x-2 justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

// Call Modal.setAppElement('#root'); in your main file (e.g., index.js or App.js).
