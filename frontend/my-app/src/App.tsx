import "./App.css";
import { Link } from "@tanstack/react-router";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/produtos">Produtos</Link>
      </header>
    </div>
  );
}

export default App;
