import React, { useState, useEffect } from "react";
import '../OrbitalLine/OrbitalLine.css'
import Planets from "../Planets/Planets";


function OrbitalLine() {
  const [orbitalLine, setOrbitalLine] = useState([]);
  const [hoverIndex, sethoverIndex] = useState(null);

  const calOrbitalLine = () => {
    const initialValue = { width: 10, height: 10, duration: 80 };
    const orbitalLineList = [];
    for (let i = 1; i <= 8; i++) {
      orbitalLineList.push({
        width: `${i === 1 ? initialValue.width : initialValue.width += 5}vw`,
        height: `${i === 1 ? initialValue.height : initialValue.height += 5}vw`,
        zIndex: 9-i,
        animationDuration: `${i === 1 ? initialValue.duration : initialValue.duration-=5}s`
      });
    }   
    return orbitalLineList;
  };

  useEffect(() => {
    const orbitalLineList = calOrbitalLine();
    setOrbitalLine(orbitalLineList);
  }, []);

  return (
    <>
      <div className="orbital-line-container">
        {
          orbitalLine.map((line, index) => {
            return <div className={`${hoverIndex === index ? 'orbital-line orbital-line-hover active' : 'orbital-line'}`} style={line}
              key={index} onMouseOver={() => sethoverIndex(index)} onMouseOut={() => sethoverIndex(null)}>
              { <Planets orbitalLineIndex={index} />}
            </div>
          })
        }        
      </div> 
    </>
  );
}

export default OrbitalLine;


