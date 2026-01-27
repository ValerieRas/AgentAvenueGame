
import './App.css';
import Plateau from './Components/Plateau/Plateau';

function App() {
  return (
    <div className="App">
      <Plateau
        joueurDeuxPosition={2}
        joueurUnPosition={5}
        showValues={false}
        imageFondUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbiUyMGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
      />
    </div>
  )
}

export default App
