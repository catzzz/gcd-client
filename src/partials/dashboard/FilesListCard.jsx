import React from 'react';
import FilesList from '../../components/FilesList'



function FilesListCard() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Files list of {'pv.insight.nrel'}</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Today</header>
          <FilesList />
        </div>
      </div>
    </div>
  );
}

export default FilesListCard;