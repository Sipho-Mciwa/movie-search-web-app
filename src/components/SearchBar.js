import './SearchBar.css';
import { useEffect, useState } from 'react';


export default function SearchBar({getMovies, fetchMovies}) {
    const [userInput, setUserInput] = useState('');
    const [suggestions , setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    
    const handleChange = async (event) => {
        const value = event.target.value;
        setUserInput(value);
        
        const data = await fetchMovies(userInput);
    
        if (value.length > 0) {
            const filteredSuggestions = data.results.filter((item) => 
                item['original_title'].toLowerCase().includes(value.toLowerCase())
            );

            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };
 

    const handleSelect = (suggestion) => {
        setUserInput(suggestion);
        getMovies(userInput);
        setShowSuggestions(false);
    }

    return (<>
        <div className="search-bar-container">
            <input value={userInput} placeholder="Search For Movie" type='text' 
            onChange={handleChange} 
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}/>
            <div className='autocomplete'>
                {showSuggestions && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSelect(suggestion['original_title'])}>
                            <div className='suggestions'>
                                <img src={`http://image.tmdb.org/t/p/w92/${suggestion['poster_path']}`} alt={`${suggestion['original_title']}-Poster`}/>
                                <p className="title">{suggestion['original_title']}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            </div>
            <button onClick={() => getMovies(userInput)}>Search</button>
        </div>
    </>);
}