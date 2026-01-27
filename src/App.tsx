
import './App.css';
import { Carte } from './Components/Carte/Carte';
import { listeCartes } from './datas/cartes';
import { Joueur } from './Components/Joueur/Joueur';

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

      <Joueur id="1" name="Joueur 1" hand={[listeCartes[0], listeCartes[1], listeCartes[2], listeCartes[3]]} gainedCards={[]}/>

      <div className="plateau"></div>

      <Joueur id="2" name="Joueur 2" hand={[listeCartes[4], listeCartes[5], listeCartes[6], listeCartes[7]]} gainedCards={[]}/>
      </div>
    </div>
  )
}

export default App
