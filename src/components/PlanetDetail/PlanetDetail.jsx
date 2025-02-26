import { useContext, useEffect, useState } from "react";
import ToggleContext from "../../contexts/toggleContext";
import "./PlanetDetail.css";
import axios from "axios";
import Icon from '@mdi/react';
import { mdiKeyboardBackspace } from '@mdi/js';

function PlanetDetail() {
  const [imagePlanet, setImgPlanet] = useState([]);
  const { data, setData } = useContext(ToggleContext);
  const { name, mass, period, distance_light_year, temperature, semi_major_axis } = data?.planets;

  const getImagePlanets = async () => {
    if(!name) return;
    const path = import.meta.env.VITE_API_PATH_IMG_PLANETS;
    try {
      const { status, data: {collection} } = await axios(`${path}/search?q=${name}&page=1&media_type=image&year_start=1920&year_end=2025`);
      if(status === 200 && collection.items.length !== 0) {
        const filterImages = collection.items.filter((image) => image.links).slice(0, 9);
        setImgPlanet(filterImages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const backToSolarSystem = () => {
    setImgPlanet([]);
    setData((updateData) => ({
      planets: {},
      isToggle: !updateData.isToggle
    }));
  }

  useEffect(() => {
    getImagePlanets()
  }, [name])

  return (
    <div className="planet-container">
      <div className="planet-title">  
        <h1>{name}</h1>
        <button onClick={() => backToSolarSystem()}>
          <Icon path={mdiKeyboardBackspace} size={2} />
        </button>
      </div>
      <div className="planet-images">
        {
          imagePlanet.map((image, index) => {
            return (<div key={index}>
              <a href={image.links[0]?.href} target="_blank">
                <img src={image.links[0]?.href} alt={image.links[0]?.rel} />
              </a>
            </div>)
          })
        }
      </div>
      <div className="planet-detail">
        <ul>
          <li>distance light year : {distance_light_year || "N/A"}</li>
          <li>semi-major axis : {semi_major_axis ? `${semi_major_axis} AU` : "N/A"} </li>
          <li>temperature : {temperature ? `${temperature} °C` : "N/A"}</li>
          <li>period : {period ? `${period} days` : "N/A"} </li>
          <li>mass : {mass ? `${mass} kg` : "N/A"} </li>
          <li>the data is not real-time.</li>
        </ul>
      </div>
    </div>
  );
}

export default PlanetDetail;
