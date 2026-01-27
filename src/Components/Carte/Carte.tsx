import "./card.css";

export interface CarteProps {
  imageUrl?: string,
  nom: string,
  couleur: string,
  scores: number[],
  selectionnee?: boolean,
  onClick?: () => void,
}

const getScoreClass = (score: number) => {
  if (score === 0) return "carte-score-nul";
  if (score < -5) return "carte-score-defaite";
  if (score < 0) return "carte-score-negative";
  if (score > 10) return "carte-score-victoire";
  return "carte-score-positive";
}

const getScoreValue = (score: number) => {
  if (score < -5) return `X`;
  if (score > 10) return `✓`;
  return `${score}`;
}

export function Carte(
  props: CarteProps
) {
  return <div className="carte"
    style={{backgroundColor: props.couleur,
      position: "relative",
      top: props.selectionnee ? "-30px" : "0px",
    }}
    onClick={props.onClick}
  >
    <h4 className="carte-nom">{props.nom}</h4>
    <div className="carte-scores">
      {props.scores.map((score, index) =>
        <div key={index} 
          className={`carte-score ${getScoreClass(score)}`}
        >
          {getScoreValue(score)}
        </div>
      )}
    </div>
  </div>
}