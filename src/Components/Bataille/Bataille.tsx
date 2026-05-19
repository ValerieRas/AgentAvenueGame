import './bataille.css';
import { useState } from 'react';
import { Carte, type CarteProps } from '../Carte/Carte';

interface BatailleProps {
  carteJouee: CarteProps[];
}


export function Bataille({ carteJouee }: BatailleProps) {

  if (carteJouee.length === 0) {
    return <div className="bataille-container"></div>;
  }

  const [indexCachee, setIndexCachee] = useState<number>(-1);

  const toggleCarte= () => {
    setIndexCachee((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="bataille-container">
            <div className="carte-jouee">
                {carteJouee.map((carte, index) => (
                <Carte 
                key={index}
                isHidden={indexCachee === index}
                {...carte} 
                />))}
            </div>
            <div className="btn-container">
             <button className="btn-cacher-carte" id="btn-cacher-carte-1" onClick={toggleCarte}>Cacher</button>  
             <button className="btn-jouer-carte" id="btn-jouer-carte-1">JOUER</button> 
            </div>
    </div>
  );
}