import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from "./components/Search";


const App = () => {
    const [word, setWord] = useState('')

    const handeSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
    }

  return (
    <div className="App">
        <Header title={"Images gallery"}/>
        <Search word={word} setWord={setWord} handeSubmit={handeSearchSubmit}/>
    </div>
  );
}

export default App;
