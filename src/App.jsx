import React, { useState } from "react";
import "./App.css";
import Sun from "./components/Sun/Sun";
import OrbitalLine from "./components/OrbitalLine/OrbitalLine";
import PlanetDetail from "./components/PlanetDetail/PlanetDetail"
import ToggleContext from "./contexts/toggleContext" 
import Loading from "./components/Loading/Loading";

function App() {
  const [data, setData] = useState({ isToggle: false, planets: {}})
  const [loading, setLoading] = useState(false);

  return (
    <ToggleContext.Provider value={{ data, setData, loading, setLoading }}>
      <div className={`container ${data.isToggle ? 'grid-II' : 'grid-I'}`}>
        { loading && <Loading />}
        <div className={`grid-column-first ${data.isToggle ? 'opacity pointer-events' : ''}`}>
          <OrbitalLine />
          <Sun />
        </div>
        <div className={!data.isToggle ? 'd-none' : 'grid-column-last'}>
          <PlanetDetail />
        </div>
      </div>
    </ToggleContext.Provider>
  );
}

export default App;
