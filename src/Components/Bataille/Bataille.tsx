import './bataille.css';
import { useState } from 'react';
import { Carte, type CarteProps } from '../Carte/Carte';

interface BatailleProps {
  carteJouee: CarteProps[];
  onChooseCard: (index: number) => void;
  onStartBattle: () => void;
  isChoosingReward: boolean;
  hiddenIndex: number | null;
  setHiddenIndex: (i: number | null) => void;
}

export function Bataille({
  carteJouee,
  onChooseCard,
  onStartBattle,
  isChoosingReward,
  hiddenIndex,
  setHiddenIndex
}: BatailleProps) {

  if (carteJouee.length === 0) {
    return <div className="bataille-container" />;
  }

  const toggleCarte = (index: number) => {
    setHiddenIndex(hiddenIndex === index ? null : index);
  };

  return (
    <div className="bataille-container">

      <div className="carte-jouee">

        {carteJouee.map((carte, index) => (
          <div
            key={index}
            onClick={() => {
              if (isChoosingReward) {
                onChooseCard(index);
              } else {
                toggleCarte(index);
              }
            }}
          >
            <Carte
              isHidden={hiddenIndex === index}
              {...carte}
            />
          </div>
        ))}

      </div>

      <div className="btn-container">

        <button
          className="btn-cacher-carte"
          onClick={() => setHiddenIndex(0)}
        >
          Cacher
        </button>

        <button
          className="btn-jouer-carte"
          onClick={onStartBattle}
          disabled={carteJouee.length !== 2 || hiddenIndex === null}
        >
          JOUER
        </button>

      </div>

    </div>
  );
}