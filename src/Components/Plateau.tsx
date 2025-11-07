import CarrePlateau from "./CarrePlateau";
import AgentAvenue_board from'../assets/AgentAvenue_Board.png';
import "./Plateau.css";

export default function Plateau() {
  const lesCarres: Array<number> = [...Array(17).keys()];

  return (
      <div className="plateau">
        
        <div className="plateau-complet">
             <img  src={AgentAvenue_board} className="image-plateau" />

        {lesCarres.map((index) => {

          return (<CarrePlateau
            id={index}
            key={index}
          />)

        })}
        </div>
  </div>
  );
}

