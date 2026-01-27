import { useMemo } from "react";

interface CarrePlateauProps {
  id: number;
  showValues?: boolean;
  orientation?: "horizontal" | "vertical";
  joueurUnPresent?: boolean;
  joueurDeuxPresent?: boolean;
}

export default function CarrePlateau({
  showValues = false,
  id,
  orientation = "horizontal",
  joueurUnPresent = false,
  joueurDeuxPresent = false,
}: CarrePlateauProps) {
  const squareClass = useMemo(() => {
    if (id === 0) return "start-player1";
    if (id === 7) return "start-player2";
    return "";
  }, [id]);

  return (
    <div className={`carre-plateau carre-plateau-${squareClass} carre-plateau-${orientation}`} >
      {showValues && <div className="carre-plateau-id">{id}</div>}
      {joueurUnPresent && <div className="joueur-un-indicateur"></div>}
      {joueurDeuxPresent && <div className="joueur-deux-indicateur"></div>}
    </div>
  );
}