import React, { useState } from "react";
import SideBarFlow from "./SideBarFlow";
import MainFlow from "./MainFlow";

export default function Sidebar() {
  const [selectData,setSelect]=useState([])
  console.log(selectData)

  const data = [
    { id: 1, name: "cold email"},
    {
      id: 2,
      name: "Wait delay",
    },
    {
      id: 3,
      name: "lead source",
    },
  ];

  const handleClick=(key)=>{
     
      console.log(key)
      
      const result=data.filter((data)=>data.id===key)
      setSelect((prev) => [...prev, ...result]);
  }
  return (
    <div>
      <div className="mx-5  h-20 bg-blue-950 flex justify-end ">
        {" "}
        <button className="mx-9 w-20 h-10 mt-5 bg-white text-blue-950 font-semibold rounded-lg shadow-md hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 transition">
          Save
        </button>
      </div>
      <div className="flex">
        <div className="w-1/4 h-screen bg-blue-950 mx-5 flex justify-center">
          <div className="border w-60 bg-slate-50 flex flex-col items-center p-5 rounded-md">
            <h1 className="mt-3 text-lg font-semibold">Select Node</h1>

            <div className="mt-5 w-full">
              <ul className="list-disc list-inside mt-5 ">
               {data.map((val,ind)=>(
                   <button key={val.id} onClick={()=>handleClick(val.id)} className="flex mt-10 bg-slate-400 py-5 p-10 rounded-lg">{val.name}</button>
               ))}
              </ul>
            </div>

            {/* <SideBarFlow/> */}
          </div>
        </div>
        <div className="w-2/3 m-10 border border-dotted border-gray-400">
          <MainFlow data={selectData} />
        </div>
      </div>
    </div>
  );
}
