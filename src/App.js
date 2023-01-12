import './App.css';
import io from 'socket.io-client';

const socket = io.connect("https://mike-orejuela-portfolio-server.onrender.com");

function App() {
  return (
    <div className="App">
      tonight
    </div>
  );
}

export default App;
