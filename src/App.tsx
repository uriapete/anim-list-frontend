import './App.css';
import Header from './components/Header';
import AnimIndex from './pages/AnimIndex';
import Error from './pages/Error';
import { Route,Routes } from 'react-router';

console.log()

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<AnimIndex/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
