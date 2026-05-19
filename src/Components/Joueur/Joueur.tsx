// Joueur.tsx

import { useState, useMemo } from "react";
import { Carte } from "../Carte/Carte";
import type { CarteProps } from "../Carte/Carte";
import "./joueur.css";

interface JoueurProps {
  id: string;
  name: string;
  hand: CarteProps[];
  onCardsSelected: (indexes: number[]) => void;
  isActive: boolean;
}

export function Joueur(props: JoueurProps) {

  const joueurClass = useMemo(() => {
    let className = "zone-joueur";

    if (props.isActive) {
      className += " joueur-actif";
    } else {
      className += " joueur-inactif";
    }

    return className;
  }, [props.isActive]);

  const [selectionneeIndex, setSelectionneeIndex] = useState<number[]>([]);

  const handleCardClick = (index: number) => {

    if (!props.isActive) return;

    setSelectionneeIndex((prevIndexes) => {

      // Déselectionner
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      }

      // Maximum 2 cartes
      if (prevIndexes.length < 2) {
        return [...prevIndexes, index];
      }

      return prevIndexes;
    });
  };

  const handleValidate = () => {

    if (!props.isActive) return;

    if (selectionneeIndex.length === 2) {

      props.onCardsSelected(selectionneeIndex);

      setSelectionneeIndex([]);
    }
  };

  return (
    <div className={joueurClass} id={props.id}>

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
          disabled={selectionneeIndex.length !== 2}
        >
          Valider
        </button>

      </div>

    </div>
  );
}