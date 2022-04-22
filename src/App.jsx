import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

// Import pages
import Sidebar from "./partials/Sidebar";
import FilesListCard from "./partials/dashboard/FilesListCard";
import ResultsCard from "./partials/dashboard/ResultsCard";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="grid grid-cols-12 gap-6">
                <Routes>
                  <Route exact path="/" element={<FilesListCard />} />
                  <Route exact path="/databoard" element={<ResultsCard />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
