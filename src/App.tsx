import './App.css';
import AnimeRandom from './components/AnimeRandom';
import Header from './components/Header';
import About from './pages/About';
import AnimeIndex from './pages/AnimeIndex';
import AnimeShow from './pages/AnimeShow';
import Error from './pages/Error';
import { Route, Routes } from 'react-router';

console.log()

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='' element={<AnimeIndex />} />
          <Route path='about' element={About()} />
          <Route path='anime'>
            <Route path='random' element={<AnimeRandom />} />
            <Route path=':malId' element={<AnimeShow />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
