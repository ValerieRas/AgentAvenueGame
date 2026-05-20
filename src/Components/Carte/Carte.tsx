import "./card.css";
import { useMemo } from "react";

export interface CarteProps {
  imageUrl?: string,
  nom: string,
  couleur: string,
  scores: number[],
  selectionnee?: boolean,
  onClick?: () => void,
  isHidden?: boolean,
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

   const carteClass = useMemo(() => {
      let className = "carte";
      className += props.isHidden ? " carte-cachee" : " carte-devoilee";
      return className;
    }, [props.isHidden]); 


  return (
  <div className={carteClass}
    style={{backgroundColor: props.isHidden ? undefined : props.couleur,
      position: "relative",
      top: props.selectionnee ? "-30px" : "0px",
    }}
    onClick={props.onClick}
  >

     {props.isHidden ? (
        <div className="carte-dos">
          AGENT
        </div>
      ) : (
    <>
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
    </>
  )}
    </div>
    
  );
}