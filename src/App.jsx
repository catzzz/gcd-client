import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Filesboard from './pages/Filesboard';
import Databoard from './pages/Databoard';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        
        <Route exact path="/" element={<Filesboard />} />
        <Route exact path="/databoard" element={<Databoard />} />
      </Routes>
    </>
  );
}

export default App;
