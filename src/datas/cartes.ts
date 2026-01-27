import type { CarteProps } from "../Components/Carte/Carte";

interface CarteData extends CarteProps {
  quantite: number
}

export const listeCartes: CarteData[] = [
  {
    couleur: "blue",
    nom: "Saboteur",
    scores: [-1, -1, -2],
    quantite: 6
  },
  {
    nom: "Agent Double",
    couleur: "lightgreen",
    scores: [-1, 6, -1],
    quantite: 6
  },
  {
    nom: "Sentinelle",
    couleur: "lightblue",
    scores: [0, 2, 6],
    quantite: 6
  },
  {
    nom: "Mercenaire",
    couleur: "purple",
    scores: [1, 2, 3],
    quantite: 6
  },
  {
    nom: "Risque-tout",
    couleur: "red",
    scores: [2, 3, -20],
    quantite: 6
  },
  {
    nom: "Cryptologue",
    couleur: "lightgrey",
    scores: [0, 0, 20],
    quantite: 6
  },
  {
    nom: "Taupe",
    couleur: "pink",
    scores: [-3],
    quantite: 1
  },
  {
    nom: "Acolyte",
    couleur: "green",
    scores: [4],
    quantite: 1
  }
];