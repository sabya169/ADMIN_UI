import './App.css';
import HeaderElement from './components/HeaderElement';
import MainDashboard from './components/MainDashboard';
import "./styles/mediaQueries/media.css"; 

function App() {
  return (
    <div className="App">
      <HeaderElement />
      <MainDashboard />
    </div>
  );
}

export default App;