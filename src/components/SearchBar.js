import './SearchBar.css';
import { useState } from 'react';

export default function SearchBar({getMovies}) {
    const [userInput, setUserInput] = useState('');

    
    return (<>
        <div className="search-bar-container">
            <input value={userInput} placeholder="Search For Movie" type='text' onChange={(event) => setUserInput(event.target.value)}></input>
            <button onClick={() => getMovies(userInput)}>Search</button>
        </div>
    </>);
}