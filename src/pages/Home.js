import SearchBar from "../components/SearchBar";
import {  useState } from 'react';
import './Home.css'
import { fetchMovies } from '../services/api';
import MovieList from "../components/MovieList";
import { OrbitProgress } from "react-loading-indicators";


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getMovies = async () => {
        try {
            setLoading(true);
            const data = await fetchMovies();
            setMovies(data.results);
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false)
        }
        
    }

    
    
    return (<>
        <header>
            <div className="header-container">
                <p className="web-title">Movie Search App</p>
                <SearchBar getMovies={getMovies} />
            </div> 
        </header>
        {loading ? <div className="loadingLogo">
            <OrbitProgress color="#0d253f" size="medium" />
        </div> : <MovieList movies={movies}/>}
        
    </>);
}