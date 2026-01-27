interface CarrePlateauProps {
  id: number;
  showValues?: boolean;
}

export default function CarrePlateau({
  showValues = false,
  id,
}: CarrePlateauProps) {
 
  const getSquareClass = () => {
    if (id === 0) return "start-player1";
    if (id === 7) return "start-player2";
    return "";
  };

  return (
    <div className={`carre-plateau ${getSquareClass()}`} >
      {showValues && <div className="carre-plateau-id">{id}</div>}
    </div>
  );
}