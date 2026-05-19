import './App.css';
import { useState, useEffect } from 'react';

import { listeCartes } from './datas/cartes';

import { Joueur } from './Components/Joueur/Joueur';
import Plateau from './Components/Plateau/Plateau';
import { Bataille } from './Components/Bataille/Bataille';

import type { CarteProps } from './Components/Carte/Carte';

const creerDeck = (): CarteProps[] => {
  const deck: CarteProps[] = [];

  listeCartes.forEach(({ quantite, ...carte }) => {
    for (let i = 0; i < quantite; i++) {
      deck.push({ ...carte });
    }
  });

  return deck;
};

const piocherCartes = (deck: CarteProps[], quantite: number): CarteProps[] => {
  const cartesPiochees: CarteProps[] = [];

  if (quantite > deck.length) quantite = deck.length;

  for (let i = 0; i < quantite; i++) {
    const index = Math.floor(Math.random() * deck.length);
    const [carte] = deck.splice(index, 1);
    cartesPiochees.push(carte);
  }

  return cartesPiochees;
};

function App() {

  const [deck, setDeck] = useState<CarteProps[]>([]);
  const [mainJ1, setMainJ1] = useState<CarteProps[]>([]);
  const [mainJ2, setMainJ2] = useState<CarteProps[]>([]);

  // SCORE (kept but unused)
  const [scoreJ1] = useState<number>(0);
  const [scoreJ2] = useState<number>(0);

  const [activePlayer, setActivePlayer] = useState<number>(1);

  const [carteSelectionnee, setCarteSelectionnee] = useState<CarteProps[]>([]);
  const [offeringPlayer, setOfferingPlayer] = useState<number | null>(null);

  const [isChoosingReward, setIsChoosingReward] = useState(false);

  const [hiddenIndex, setHiddenIndex] = useState<number | null>(null);

  useEffect(() => {

    const nouveauDeck = creerDeck();

    const main1 = piocherCartes(nouveauDeck, 4);
    const main2 = piocherCartes(nouveauDeck, 4);

    setDeck(nouveauDeck);
    setMainJ1(main1);
    setMainJ2(main2);

  }, []);

  const handleSelectionJoueur = (
    player: number,
    selectedIndexes: number[]
  ) => {

    const currentHand = player === 1 ? [...mainJ1] : [...mainJ2];

    const selectedCards = [
      currentHand[selectedIndexes[0]],
      currentHand[selectedIndexes[1]]
    ];

    if (selectedCards[0].nom === selectedCards[1].nom) {
      alert("Les deux cartes doivent être différentes !");
      return;
    }

    setCarteSelectionnee(selectedCards);
    setOfferingPlayer(player);

    const nouvelleMain = currentHand.filter(
      (_, index) => !selectedIndexes.includes(index)
    );

    const nouveauDeck = [...deck];
    const nouvellesCartes = piocherCartes(nouveauDeck, 2);

    const mainFinale = [...nouvelleMain, ...nouvellesCartes];

    if (player === 1) setMainJ1(mainFinale);
    else setMainJ2(mainFinale);

    setDeck(nouveauDeck);

    setActivePlayer(-1);
    setIsChoosingReward(false);
    setHiddenIndex(null);
  };

  const handleStartBattle = () => {

    if (offeringPlayer === null) return;
    if (carteSelectionnee.length !== 2) return;

    const nextPlayer = offeringPlayer === 1 ? 2 : 1;

    setActivePlayer(nextPlayer);
    setIsChoosingReward(true);
  };

  const handleChooseCard = (chosenIndex: number) => {

    if (offeringPlayer === null) return;

    const chosenCard = carteSelectionnee[chosenIndex];
    const remainingCard = carteSelectionnee[chosenIndex === 0 ? 1 : 0];

    const receiver = offeringPlayer === 1 ? 2 : 1;

    if (receiver === 1) {
      setMainJ1(prev => [...prev, chosenCard]);
    } else {
      setMainJ2(prev => [...prev, chosenCard]);
    }

    if (offeringPlayer === 1) {
      setMainJ1(prev => [...prev, remainingCard]);
    } else {
      setMainJ2(prev => [...prev, remainingCard]);
    }

    setCarteSelectionnee([]);
    setIsChoosingReward(false);
    setActivePlayer(receiver);
    setHiddenIndex(null);
  };

  return (
    <div className="App">

      <Bataille
        carteJouee={carteSelectionnee}
        onChooseCard={handleChooseCard}
        onStartBattle={handleStartBattle}
        isChoosingReward={isChoosingReward}
        hiddenIndex={hiddenIndex}
        setHiddenIndex={setHiddenIndex}
      />

      <div className="conteneur-joueur">

        <Joueur
          id="1"
          name="Joueur 1"
          hand={mainJ1}
          isActive={activePlayer === 1}
          onCardsSelected={(i) => handleSelectionJoueur(1, i)}
        />

        <Plateau
          joueurUnPosition={scoreJ1}
          joueurDeuxPosition={scoreJ2}
          showValues={true}
          imageFondUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
        />

        <Joueur
          id="2"
          name="Joueur 2"
          hand={mainJ2}
          isActive={activePlayer === 2}
          onCardsSelected={(i) => handleSelectionJoueur(2, i)}
        />

      </div>
    </div>
  );
}

export default App;