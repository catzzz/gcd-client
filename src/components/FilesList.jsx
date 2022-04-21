import React from "react";

const FilesList = (props) => {
  return (
    <li className="flex px-2">

      <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            <a
              className="font-medium text-slate-800 hover:text-slate-900"
              href="#0"
            >
              Qonto
            </a>{" "}
            billing
          </div>
          <div className="shrink-0 self-start mr-2">
            <span className="font-medium text-slate-800">-$49.88</span>
          </div>
        </div>
      </div>
      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
        <span className="hidden xs:block">RUN</span>
      </button>
    </li>
  );
};

export default FilesList;
