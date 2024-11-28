

import axiosInstance from "./axiosinstance";

const LoginData=async(data)=>{

    console.log("axiosinstance data",data)

     const response=await axiosInstance.post("/login",{data}) 
     console.log("axios",response)
     return response.data
}

export default LoginData;