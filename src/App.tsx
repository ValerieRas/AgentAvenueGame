
import { useState } from 'react';
import './App.css';
import { Carte } from './Components/Carte/Carte';
import { listeCartes } from './datas/cartes';

function App() {

  const [selectionneeIndex, setSelectionneeIndex] = useState<number | null>(null);

  return (
    <div className="App">
      {listeCartes.map((carte, index) => 
        <Carte 
          key={index} 
          {...carte} 
          selectionnee={index === selectionneeIndex}
          onClick={() => setSelectionneeIndex(index)} 
        />
      )}
    </div>
  )
}

export default App
