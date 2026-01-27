import { useState, useEffect } from "react";
import { Carte} from "../Carte/Carte";
import type { CarteProps } from "../Carte/Carte";
import { listeCartes } from "../../datas/cartes";
import "./joueur.css"; 

interface JoueurProps {
  id:string;
  name: string;
  hand: CarteProps[];
  gainedCards : CarteProps[];
}

export function Joueur(
    props: JoueurProps
) {
    const [selectionneeIndex, setSelectionneeIndex] = useState<number>(-1);

  return (
    <div className="zone-joueur" id={props.id}>

      <h2 className="joueur-nom">{props.name}</h2>

      <div className="main">
        {props.hand.map((carte, index) => (
          <Carte 
            key={index} 
            {...carte} 
            selectionnee={index === selectionneeIndex}
            onClick={() => setSelectionneeIndex(index)} 
          />
        ))}
      </div>

      <h2 className="agent-titre">Agents Recrutés</h2>

      <div className="carte-gagnee">
            {props.gainedCards.map((carte, index) => (
          <Carte 
            key={index} 
            {...carte} 
            selectionnee={index === selectionneeIndex}
            onClick={() => setSelectionneeIndex(index)} 
          />
        ))}
      </div>

    </div>
  );
}