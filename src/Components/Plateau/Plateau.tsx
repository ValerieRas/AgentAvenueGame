import CarrePlateau from "./CarrePlateau";
import "./Plateau.css";

interface PlateauProps {
  joueurUnPosition: number;
  joueurDeuxPosition: number;
  showValues?: boolean;
  imageFondUrl?: string;
}


export default function Plateau(props: PlateauProps) {
  return (
    <div className="plateau">
      <div className="plateau-haut">
        {[2, 3, 4, 5].map(value => (
          <CarrePlateau showValues={props.showValues} id={value} key={value} />
        ))}
      </div>
      <div className="plateau-milieu">
        <div className="plateau-gauche">
          {[1, 0, 13].map(value => (
            <CarrePlateau
              showValues={props.showValues}
              id={value}
              key={value}
            />
          ))}
        </div>
        {props.imageFondUrl && (
          <div
            className="plateau-centre"
            style={{ backgroundImage: `url(${props.imageFondUrl})` }}
          />
        )}
        <div className="plateau-droite">
          {[6, 7, 8].map(value => (
            <CarrePlateau
              showValues={props.showValues}
              id={value}
              key={value}
            />
          ))}
        </div>
      </div>
      <div className="plateau-bas">
        {[12, 11, 10, 9].map(value => (
          <CarrePlateau
            key={value}
            showValues={props.showValues}
            id={value}
          />
        ))}
      </div>
    </div>
  );
}

