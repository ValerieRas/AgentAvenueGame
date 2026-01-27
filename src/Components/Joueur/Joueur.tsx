import { useState, useEffect } from "react";
import { Carte} from "../Carte/Carte";
import type { CarteProps } from "../Carte/Carte";
import "./joueur.css"; 

interface JoueurProps {
  id:string;
  name: string;
  hand: CarteProps[];
  carteGagnee : CarteProps[];
  carteSelectionee: CarteProps[];
}

export function Joueur(
    props: JoueurProps
) {
    const [selectionneeIndex, setSelectionneeIndex] = useState<number[]>([]);

    
  const handleCardClick = (index: number) => {
    setSelectionneeIndex((prevIndexes) => {
      // If card is already selected, remove it (deselect)
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      }

      // If card is not selected, add it ONLY if we have less than 2 selected
      if (prevIndexes.length < 2) {
        return [...prevIndexes, index];
      }

      // If we already have 2, do nothing (or you could replace the last one)
      return prevIndexes;
    });
  };

  const handleValidate = () => {
    if (selectionneeIndex.length === 2) {
        props.carteSelectionee.push(
            props.hand[selectionneeIndex[0]],
            props.hand[selectionneeIndex[1]]);
        setSelectionneeIndex([]);
        
    }
  };

  return (
    <div className="zone-joueur" id={props.id}>

      <h2 className="joueur-nom">{props.name}</h2>

      <div className="main">
        <div className="liste-carte-main">
        {props.hand.map((carte, index) => (
          <Carte 
            key={index} 
            {...carte} 
            selectionnee={selectionneeIndex.includes(index)}
            onClick={() => handleCardClick(index)} 
          />
        ))}
        </div>
        <button 
            className="btn-valider-carte" 
            onClick={handleValidate}
            disabled={selectionneeIndex.length !== 2}>
            Valider</button>
      </div>

      <h2 className="agent-titre">Agents Recrutés</h2>

      <div className="carte-gagnee">
            {props.carteGagnee.map((carte, index) => (
          <Carte 
            key={index} 
            {...carte} 
          />
        ))}
      </div>

    </div>
  );
}