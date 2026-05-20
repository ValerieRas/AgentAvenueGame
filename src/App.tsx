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
  const cartes: CarteProps[] = [];

  if (quantite > deck.length) quantite = deck.length;

  for (let i = 0; i < quantite; i++) {
    const index = Math.floor(Math.random() * deck.length);
    const [carte] = deck.splice(index, 1);
    cartes.push(carte);
  }

  return cartes;
};

function App() {

  const [deck, setDeck] = useState<CarteProps[]>([]);

  const [mainJ1, setMainJ1] = useState<CarteProps[]>([]);
  const [mainJ2, setMainJ2] = useState<CarteProps[]>([]);

  const [recruitedJ1, setRecruitedJ1] = useState<CarteProps[]>([]);
  const [recruitedJ2, setRecruitedJ2] = useState<CarteProps[]>([]);

  const [scoreJ1, setScoreJ1] = useState<number>(0);
  const [scoreJ2, setScoreJ2] = useState<number>(7);

  const [activePlayer, setActivePlayer] = useState<number>(1);

  const [carteSelectionnee, setCarteSelectionnee] = useState<CarteProps[]>([]);
  const [offeringPlayer, setOfferingPlayer] = useState<number | null>(null);

  const [isChoosingReward, setIsChoosingReward] = useState(false);
  const [hiddenIndex, setHiddenIndex] = useState<number | null>(null);

  // ---------------- INIT ----------------
  useEffect(() => {

    const nouveauDeck = creerDeck();

    const main1 = piocherCartes(nouveauDeck, 4);
    const main2 = piocherCartes(nouveauDeck, 4);

    setDeck(nouveauDeck);
    setMainJ1(main1);
    setMainJ2(main2);
  }, []);

  // ---------------- HELPERS ----------------
  const normalize = (v: number) => ((v % 14) + 14) % 14;

  const countSame = (zone: CarteProps[], card: CarteProps) =>
    zone.filter(c => c.nom === card.nom && c.couleur === card.couleur).length;

  const countTotal = (zones: CarteProps[], name: string) =>
    zones.filter(c => c.nom === name).length;

  const getScoreIndex = (count: number) =>
    Math.min(count - 1, 2);

  const resetGame = () => {
    setScoreJ1(0);
    setScoreJ2(7);
    setMainJ1([]);
    setMainJ2([]);
    setRecruitedJ1([]);
    setRecruitedJ2([]);
    setActivePlayer(1);
    setCarteSelectionnee([]);
    setOfferingPlayer(null);
    setIsChoosingReward(false);
    setHiddenIndex(null);
  };

  // ---------------- WIN CONDITIONS ----------------
  const checkWinConditions = () => {

    const j1Cards = [...mainJ1, ...recruitedJ1];
    const j2Cards = [...mainJ2, ...recruitedJ2];

    const j1Risque = countTotal(j1Cards, "risque tout");
    const j2Risque = countTotal(j2Cards, "risque tout");

    const j1Crypto = countTotal(j1Cards, "cryptologue");
    const j2Crypto = countTotal(j2Cards, "cryptologue");

    if (j1Risque >= 3) {
      alert("Le Joueur 1 a perdu (3 Risque Tout) !");
      resetGame();
      return;
    }

    if (j2Risque >= 3) {
      alert("Le Joueur 2 a perdu (3 Risque Tout) !");
      resetGame();
      return;
    }

    if (j1Crypto >= 3) {
      alert("Le Joueur 1 a gagné (3 Cryptologue) !");
      resetGame();
      return;
    }

    if (j2Crypto >= 3) {
      alert("Le Joueur 2 a gagné (3 Cryptologue) !");
      resetGame();
      return;
    }

    if (scoreJ1 >= 13 && (normalize(scoreJ1) === 0 || normalize(scoreJ1) > normalize(scoreJ2))) {
      alert("Le Joueur 1 a gagné (position) !");
      resetGame();
    }

    if (scoreJ2 >= 13 && (normalize(scoreJ2) === normalize(0) || normalize(scoreJ2) > normalize(scoreJ1))) {
      alert("Le Joueur 2 a gagné (position) !");
      resetGame();
    }
  };

  // ---------------- SELECTION ----------------
  const handleSelectionJoueur = (player: number, selectedIndexes: number[]) => {

    const hand = player === 1 ? [...mainJ1] : [...mainJ2];

    const selectedCards = [
      hand[selectedIndexes[0]],
      hand[selectedIndexes[1]]
    ];

    if (selectedCards[0].nom === selectedCards[1].nom) {
      alert("Cartes différentes obligatoires !");
      return;
    }

    setCarteSelectionnee(selectedCards);
    setOfferingPlayer(player);

    const newHand = hand.filter(
      (_, i) => !selectedIndexes.includes(i)
    );

    const newDeck = [...deck];
    const newCards = piocherCartes(newDeck, 2);

    const finalHand = [...newHand, ...newCards];

    if (player === 1) setMainJ1(finalHand);
    else setMainJ2(finalHand);

    setDeck(newDeck);

    setActivePlayer(-1);
    setIsChoosingReward(false);
    setHiddenIndex(null);
  };

  // ---------------- BATTLE START ----------------
  const handleStartBattle = () => {
    if (!offeringPlayer) return;
    if (carteSelectionnee.length !== 2) return;

    setActivePlayer(offeringPlayer === 1 ? 2 : 1);
    setIsChoosingReward(true);
  };

  // ---------------- APPLY CARD EFFECT + FIX ----------------
  const applyCardEffects = (
    player: 1 | 2,
    hand: CarteProps[],
    setHand: (h: CarteProps[]) => void,
    recruited: CarteProps[],
    setRecruited: (r: CarteProps[]) => void,
    card: CarteProps
  ) => {

    const total =
      countSame(hand, card) + countSame(recruited, card);

    const scoreIndex = getScoreIndex(total);

    const gained = card.scores?.[scoreIndex] ?? 0;

    if (player === 1) setScoreJ1(p => p + gained);
    else setScoreJ2(p => p + gained);

    const existsInHand = hand.some(
      c => c.nom === card.nom && c.couleur === card.couleur
    );

    if (existsInHand) {

      const updatedHand = hand.filter(
        c => !(c.nom === card.nom && c.couleur === card.couleur)
      );

      const updatedRecruited = [...recruited, card];

      // 🔥 DRAW REPLACEMENT CARD
      const newDeck = [...deck];

      let replacement: CarteProps | null = null;

      if (newDeck.length > 0) {
        const index = Math.floor(Math.random() * newDeck.length);
        const [drawn] = newDeck.splice(index, 1);
        replacement = drawn;
      }

      setDeck(newDeck);
      setRecruited(updatedRecruited);

      if (replacement) {
        setHand([...updatedHand, replacement]);
      } else {
        setHand(updatedHand);
      }
    }
  };

  // ---------------- CHOOSE CARD ----------------
  const handleChooseCard = (index: number) => {

  if (!offeringPlayer) return;

  const chosen = carteSelectionnee[index];
  const other = carteSelectionnee[index === 0 ? 1 : 0];

  const receiver = offeringPlayer === 1 ? 2 : 1;

  // -----------------------------
  // STEP 1: assign cards
  // -----------------------------
  const j1Hand = [...mainJ1];
  const j2Hand = [...mainJ2];

  if (receiver === 1) j1Hand.push(chosen);
  else j2Hand.push(chosen);

  if (offeringPlayer === 1) j1Hand.push(other);
  else j2Hand.push(other);

  // -----------------------------
  // STEP 2: helper
  // -----------------------------
  const processPlayer = (
    player: 1 | 2,
    hand: CarteProps[],
    recruited: CarteProps[],
    setHand: any,
    setRecruited: any,
    card: CarteProps
  ) => {

    // ---- SCORE ----
    const total =
      hand.filter(c => c.nom === card.nom).length +
      recruited.filter(c => c.nom === card.nom).length;

    const scoreIndex = Math.min(total - 1, 2);
    const gained = card.scores?.[scoreIndex] ?? 0;

    if (player === 1) setScoreJ1(p => p + gained);
    else setScoreJ2(p => p + gained);

    // ---- MOVE DUPLICATES FROM HAND ----
    const duplicatesInHand = hand.filter(c => c.nom === card.nom);

    let newHand = hand;
    let newRecruited = [...recruited];

    if (duplicatesInHand.length > 0) {

      newHand = hand.filter(c => c.nom !== card.nom);
      newRecruited = [...recruited, ...duplicatesInHand];

      // refill to 4 cards
      const newDeck = [...deck];

      if (newDeck.length === 0) {
        alert("No more cards in deck");
        return;
      }

      const needed = 4 - newHand.length;

      const drawn: CarteProps[] = [];

      for (let i = 0; i < needed && newDeck.length > 0; i++) {
        const idx = Math.floor(Math.random() * newDeck.length);
        const [c] = newDeck.splice(idx, 1);
        drawn.push(c);
      }

      newHand = [...newHand, ...drawn];

      setDeck(newDeck);
    }

    setHand(newHand);
    setRecruited(newRecruited);

    checkWinConditions();
  };

  // -----------------------------
  // STEP 3: APPLY BOTH PLAYERS
  // -----------------------------
  if (receiver === 1) {
    processPlayer(1, j1Hand, recruitedJ1, setMainJ1, setRecruitedJ1, chosen);
  } else {
    processPlayer(2, j2Hand, recruitedJ2, setMainJ2, setRecruitedJ2, chosen);
  }

  if (offeringPlayer === 1) {
    processPlayer(1, j1Hand, recruitedJ1, setMainJ1, setRecruitedJ1, other);
  } else {
    processPlayer(2, j2Hand, recruitedJ2, setMainJ2, setRecruitedJ2, other);
  }

  setCarteSelectionnee([]);
  setIsChoosingReward(false);
  setActivePlayer(receiver);
  setHiddenIndex(null);
  checkWinConditions();
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
          recruited={recruitedJ1}
          isActive={activePlayer === 1}
          onCardsSelected={(i) => handleSelectionJoueur(1, i)}
        />

        <Plateau
          joueurUnPosition={normalize(scoreJ1)}
          joueurDeuxPosition={normalize(scoreJ2)}
          showValues={true}
          imageFondUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
        />

        <Joueur
          id="2"
          name="Joueur 2"
          hand={mainJ2}
          recruited={recruitedJ2}
          isActive={activePlayer === 2}
          onCardsSelected={(i) => handleSelectionJoueur(2, i)}
        />

      </div>
    </div>
  );
}

export default App;