import React,{useState,useEffect} from "react";




const FilesList = (props) => {


  const onTrigger = (event) => {
    props.toggleCheckBox(event)
  }
  return (
    <div>
      {props.files.map((file, index) => {
        return (
          <li key={index} className="flex px-2">
            <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
              <div className="grow flex justify-between">
  
              
                <div className="self-center flex  ">
                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={file.Key} id="flexCheckDefault" onChange={onTrigger}/>
                <p>{file.Key}</p>
                </div>
                <div className="shrink-0 self-start mr-4">
                  <p>Size: </p>
                  <p className="font-medium text-slate-800">{parseFloat(file.Size)/1000000} MB</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default FilesList;
