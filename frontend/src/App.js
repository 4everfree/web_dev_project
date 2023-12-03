import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from "./components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
    const [word, setWord] = useState('')

    const handeSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
        fetch(`https://api.unsplash.com/photos/random?query=${word}&client_id=${UNSPLASH_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        setWord('')
    }

  return (
    <div className="App">
        <Header title={"Images gallery"}/>
        <Search word={word} setWord={setWord} handeSubmit={handeSearchSubmit}/>
    </div>
  );
}

export default App;
