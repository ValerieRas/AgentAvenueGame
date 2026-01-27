
import './App.css';
import { listeCartes } from './datas/cartes';
import { Joueur } from './Components/Joueur/Joueur';
import Plateau from './Components/Plateau/Plateau';

function App() {

  /*const [selectionneeIndex, setSelectionneeIndex] = useState<number | null>(null); */

  return (
    <div className="App">
      {/* {listeCartes.map((carte, index) => 
        <Carte 
          key={index} 
          {...carte} 
          selectionnee={index === selectionneeIndex}
          onClick={() => setSelectionneeIndex(index)} 
        />
      )} */}

      <div className="zone-jeu"></div>

      <div className="conteneur-joueur">

      <Joueur id="1" name="Joueur 1" 
      hand={[listeCartes[0], listeCartes[1], listeCartes[2], listeCartes[3]]} 
      carteGagnee={[]}
      carteSelectionee={[]}
      isActive={true}
      />

      <Plateau
        joueurUnPosition={0}
        joueurDeuxPosition={7}
        showValues={true}
        imageFondUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
      ></Plateau>

      <Joueur id="2" name="Joueur 2" 
      hand={[listeCartes[4], listeCartes[5], listeCartes[6], listeCartes[7]]} 
      carteGagnee={[]}
      carteSelectionee={[]}
      isActive={false}
      />
      </div>
    </div>
  )
}

export default App
