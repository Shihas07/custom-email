import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slice";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate=useNavigate()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log("userDatafromNav", isAuthenticated);
  

    // useEffect(()=>{

    // },[isAuthenticated])


  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(clearUser());
  };

  const Login=()=>{
     navigate("/login")
  }


  return (
    <div>
      <nav className="flex  h-20 bg-white m-10 justify-between shadow-2xl rounded-lg">
        <div className="flex justify-center align-middle w-auto h-10 px-4 m-5  ">
          <h1 className="font-black font-wi italic text-blue-500 ">
            Make Mail
          </h1>
        </div>
        <div className="w-auto flex justify-center m-4   ">
          {isAuthenticated ? (
            <button
              onClick={Logout}
              className="bg-slate-600 rounded-2xl px-10 text-red-200"
            >
              logOut
            </button>
          ) : (
            <button onClick={Login} className="bg-slate-600 rounded-2xl px-10 text-red-200">
              login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
