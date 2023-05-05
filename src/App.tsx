import Aos from "aos";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useEagerConnect } from "./hooks/useEagerConnect";

import { Admin, Home, Whitepaper, LaunchApp } from "./pages";

const App: React.FC = () => {
  useEagerConnect();
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/app/*" element={<LaunchApp />} />
      </Routes>
    </div>
  );
};

export default App;
