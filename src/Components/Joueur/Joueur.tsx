import { useState, useMemo } from "react";
import { Carte } from "../Carte/Carte";
import type { CarteProps } from "../Carte/Carte";
import "./joueur.css";

interface JoueurProps {
  id: string;
  name: string;
  hand: CarteProps[];
  recruited: CarteProps[]; // NEW
  onCardsSelected: (indexes: number[]) => void;
  isActive: boolean;
}

export function Joueur(props: JoueurProps) {

  const joueurClass = useMemo(() => {
    let className = "zone-joueur";

    className += props.isActive
      ? " joueur-actif"
      : " joueur-inactif";

    return className;
  }, [props.isActive]);

  const [selectionneeIndex, setSelectionneeIndex] = useState<number[]>([]);

  const handleCardClick = (index: number) => {

    if (!props.isActive) return;

    setSelectionneeIndex((prev) => {

      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }

      if (prev.length < 2) {
        return [...prev, index];
      }

      return prev;
    });
  };

  const handleValidate = () => {

    if (!props.isActive) return;

    if (selectionneeIndex.length === 2) {
      props.onCardsSelected(selectionneeIndex);
      setSelectionneeIndex([]);
    }
  };

  // 🧠 GROUP RECRUITED CARDS (duplicates next to each other)
  const groupedRecruited = useMemo(() => {

    const groups: Record<string, CarteProps[]> = {};

    props.recruited.forEach(card => {

      const key = `${card.nom}-${card.couleur}`;

      if (!groups[key]) groups[key] = [];

      groups[key].push(card);
    });

    return Object.values(groups).flat();

  }, [props.recruited]);

  return (
    <div className={joueurClass} id={props.id}>

      <h2 className="joueur-nom">{props.name}</h2>

      {/* 🟢 HAND */}
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
          disabled={selectionneeIndex.length !== 2 || !props.isActive}
        >
          Valider
        </button>

      </div>

      {/* 🟡 RECRUITED DECK (NO INTERACTION) */}
      {props.recruited.length > 0 && (
        <div className="recruited-section">

          <h3 className="recruited-title">
            Cartes recrutées
          </h3>

          <div className="recruited-list">

            {groupedRecruited.map((carte, index) => (
              <Carte
                key={index}
                {...carte}
                selectionnee={false}
                onClick={undefined} // 🚫 not clickable
              />
            ))}

          </div>

        </div>
      )}

    </div>
  );
}