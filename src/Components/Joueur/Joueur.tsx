import {Carte} from "../Carte";

export function Joueur() {

    

  return (
    <div className="zone-joueur">
      
      {/* 1. The Main Hand (4 Cards) */}
      <div className="main">
        <Carte />
        <Carte />
        <Carte />
        <Carte />
      </div>

      <div className="carte-gagnee">
  
      </div>

    </div>
  );
}