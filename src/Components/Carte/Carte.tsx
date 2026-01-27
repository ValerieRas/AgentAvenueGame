export interface CarteProps {
  imageUrl?: string,
  nom: string,
  couleur: string,
  scores: number[],
  selectionnee?: boolean
}

export function Carte(
  props: CarteProps
) {
  return <div className="carte"
    style={{backgroundColor: props.couleur,
      position: "relative",
      top: props.selectionnee ? "-10px" : "0px",
    }}
  >
    <h4 className="carte-nom">{props.nom}</h4>
    <div className="carte-scores">
      {props.scores.map((score, index) =>
        <div key={index} className="carte-score">
          {score}
        </div>
      )}
    </div>
  </div>
}