
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

const piocherCartes = (
  deck: CarteProps[],
  quantite: number): CarteProps[] => {

  const cartesPiochees: CarteProps[] = [];
    if (deck.length === 0) {
    alert("Le deck est vide, impossible de piocher d'autres cartes.");
    return cartesPiochees;
  }

  if(quantite > deck.length){
    quantite = deck.length;
  }

  for (let i = 0; i < quantite; i++) {
    const index = Math.floor(Math.random() * deck.length);
    const [carte] = deck.splice(index, 1); // Retire la carte du deck
    cartesPiochees.push(carte);
  }

  return cartesPiochees;

}


function App() {

  const [deck, setDeck] = useState<CarteProps[]>([]);
  const [mainJ1, setMainJ1] = useState<CarteProps[]>([]);
  const [mainJ2, setMainJ2] = useState<CarteProps[]>([]);
  const [scoreJ1, setScoreJ1] = useState<number>(0);
  const [scoreJ2, setScoreJ2] = useState<number>(7);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [carteSelectionnee, setCarteSelectionnee] = useState<CarteProps[]>([]);

  useEffect(() => {

    const nouveauDeck = creerDeck();

    const main1 = piocherCartes(nouveauDeck, 4);
    const main2 = piocherCartes(nouveauDeck, 4);

    setDeck(nouveauDeck);
    setMainJ1(main1);
    setMainJ2(main2);

  }, []);


  const handleSelectionJoueur = (selectedCards: CarteProps[]) => {
    if (selectedCards[0].nom === selectedCards[1].nom) {
        alert("Les deux cartes jouées doivent être différentes !");
        return;
    }
    setCarteSelectionnee(selectedCards); 

    //Aucun joueur ne peut plus sélectionner de carte. 
    setActivePlayer(-1);
  };

  return (
    <div className="App">

      <Bataille carteJouee={carteSelectionnee}></Bataille>
      
      <div className="conteneur-joueur">

      <Joueur id="1" name="Joueur 1" 
      hand={mainJ1} 
      carteGagnee={[]}
      carteSelectionee={[]}
      isActive={activePlayer === 1}
      onCardsSelected={handleSelectionJoueur}
      />

      <Plateau
        joueurUnPosition={scoreJ1}
        joueurDeuxPosition={scoreJ2}
        showValues={true}
        imageFondUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      ></Plateau>

      <Joueur id="2" name="Joueur 2" 
        hand={mainJ2} 
        carteGagnee={[]}
        carteSelectionee={[]}
        isActive={activePlayer === 2}
        onCardsSelected={handleSelectionJoueur}
      />
      </div>
      </div>
  )
}

export default App
