import './App.css';
import Header from './components/Header';
import AnimeIndex from './pages/AnimeIndex';
import AnimeShow from './pages/AnimeShow';
import Error from './pages/Error';
import { Route,Routes } from 'react-router';

console.log()

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='' element={<AnimeIndex/>} />
          <Route path='anime'>
            <Route path=':id' element={<AnimeShow/>} />
          </Route>
          <Route path='*' element={<Error/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
