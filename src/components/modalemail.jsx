import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { RiCloseFill } from "react-icons/ri";
import { emailDatas } from "../redux/slice";
import { useDispatch } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Modalemail({ open, onClose }) {
  const dispatch=useDispatch()
  const [emailData, setEmailData] = useState({
    email: "",
    body: "",
  });
  const [error, setError] = useState({});
 const [formValues,setFormValues]=useState([])
//  console.log("formValues",formValues)
  // console.log(email);

  const handleChange = (e) => {
    // console.log(e);

    const { name, value } = e.target;
    // console.log("data", name, value);
    // setEmailData((preview) => ({
    //   ...preview,
    //   [name]: value,
    // }));

    const updatedEmailData = { ...emailData, [name]: value };
  setEmailData(updatedEmailData);

  // Validate the updated data
  const newError = validation(updatedEmailData);
  setError(newError);
  };

  const validation = (emailData) => {
    const { email, body } = emailData;
    let errors = {};

    if (email.trim() === "") {
      errors.email = "Invalid email";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (body.trim() === "") {
      errors.body = "Email body is required";
    }

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validation(emailData);
    setError(formErrors);
  
    if (Object.keys(formErrors).length === 0) {
      dispatch(emailDatas(emailData)); 
      onClose(); // Close modal
      setEmailData({ email: "", body: "" });
    }
  };
  return (
    <div className="flex">
      <Modal
        isOpen={open}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <RiCloseFill
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        />

        <div className="bg-blue-500 rounded-md w-96 h-auto flex flex-col p-5 items-center shadow-2xl   ">
          <h1 className="mt-5 font-bold font-serif text-green-300">
            Create your Email
          </h1>

          <div className="mt-10 flex  items-center ">
            <form
              className="w-full flex flex-col gap-4 "
              action="
                  " 
              onSubmit={handleSubmit}
            >
              <input
                className="p-4 rounded-md focus:outline-none "
                type="text"
                name="email"
                placeholder="Enter responded Email"
                value={emailData.email}
                onChange={handleChange}
              />
              {error.email && <span className="text-red-700">{error.email}</span> }
              <textarea
                className="w-full h-32 p-4 focus:outline-none rounded-md  border border-gray-300"
                placeholder="Enter your Email Body"
                name="body"
                value={emailData.body}
                onChange={handleChange}
              />
                 {error.body && <span className="text-red-700">{error.body}</span> }

              <input
                className="p-2 w-full bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition"
                type="submit"
                // value="Submit"
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
     