import React from "react";

interface CarrePlateauProps {
  id: number;
}

export default function CarrePlateau({ id }: CarrePlateauProps) {
 
  const getSquareId = () => `carre-${id}`;

  const getSquareClass = () => {
    if (id === 0) return "carre-plateau start-player1";
    if (id === 7) return "carre-plateau start-player2";
    return "carre-plateau";
  };

  const handleClick = () => {
    alert(`You clicked square ${id}`);
  };



  return (
    <div className={getSquareClass()} 
        id={getSquareId()} 
        onClick={handleClick}>

    </div>
  );
}