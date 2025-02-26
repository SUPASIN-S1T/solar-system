import { useEffect, useState, useContext } from "react";
import axios from "axios"
import "../Planets/Planets.css";
import mercury from "../../assets/mercury.png";
import venus from "../../assets/venus.png";
import earth from "../../assets/earth.png";
import mars from "../../assets/mars.png";
import jupiter from "../../assets/jupiter.png";
import saturn from "../../assets/saturn.png";
import uranus from "../../assets/uranus.png";
import neptune from "../../assets/neptune.png";
import ToggleContext from "../../contexts/toggleContext";

function Planets({ orbitalLineIndex }) {
  const [planet, setPlanet] = useState([]);
  const { setData, setLoading } = useContext(ToggleContext);

  const checkPlanets = () => {
    switch (orbitalLineIndex) {
      case 0:
        return setPlanet({
          planetName: mercury,
          customStyle: { right: "-2%", top: "-4%" },
        });
      case 1:
        return setPlanet({
          planetName: venus,
          customStyle: { left: "-6%", top: "18%" },
        });
      case 2:
        return setPlanet({
          planetName: earth,
          customStyle: { right: "-6%", top: "53%" },
        });
      case 3:
        return setPlanet({
          planetName: mars,
          customStyle: { left: "-4%", top: "58%" },
        });
      case 4:
        return setPlanet({
          planetName: jupiter,
          customStyle: { right: "-8%", top: "29%", width: "6vw" },
        });
      case 5:
        return setPlanet({
          planetName: saturn,
          customStyle: { left: "-7%", top: "39%", width: "5vw" },
        });
      case 6:
        return setPlanet({
          planetName: uranus,
          customStyle: { right: "3%", bottom: "20%" },
        });
      case 7:
        return setPlanet({
          planetName: neptune,
          customStyle: { left: "5%", bottom: "18%" },
        });
    }
  };

  const getPlanets = async (planetName) => {
    setLoading(true)
    const getPlanetName = planetName.split('/')[3].split('.')[0];
    const path = import.meta.env.VITE_API_PATH_PLANETS;
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const { status, data } = await axios.get(`${path}?name=${getPlanetName}`, { headers: { "X-Api-Key": apiKey } });
      if(status === 200 && data.length !== 0) {
        setTimeout(() => {
          setData((updateData) => ({
            planets: {
              ...updateData.planets,
              ...data[0],
            },
            isToggle: !updateData.isToggle,
          }));
          setLoading(false);
        }, 1500)
      }
    } catch (error) {
      console.error("error :", error);
    }
  };
    
  useEffect(() => {
    checkPlanets();
  }, []);

  return (
    <>
      <img src={planet?.planetName} alt={planet?.planetName} className="img-planets"
      style={planet?.customStyle} onClick={() => getPlanets(planet.planetName)} /> 
    </>
  );
}

export default Planets;
