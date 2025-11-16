import SearchBar from "../components/SearchBar";
import {  useState, useEffect } from 'react';
import './Home.css'
import { fetchMovies, fetchPopularMovies } from '../services/api';
import MovieList from "../components/MovieList";
import { OrbitProgress } from "react-loading-indicators";





export default function Home() {

    const [movies, setMovies] = useState([]);
    // const [popularMovies, setPopularMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getMovies = async (userInput) => {
        try {
            setLoading(true);
            const data = await fetchMovies(userInput);
            setMovies(data.results);
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false)
        }
        
    }

   
    useEffect(() => {
        const loadDefaultPage = async () => {
            const data = await fetchPopularMovies();
            setMovies(data.results);
        }

        loadDefaultPage();
    }, []);

    
    return (<>
        <header>
            <div className="header-container">
                <p className="web-title">Movie Search App</p>
                <SearchBar getMovies={getMovies} />
            </div> 
        </header>
        <div>
            {/* <Popular/> */}
            {loading ? <div className="loadingLogo">
                <OrbitProgress color="#0d253f" size="medium" />
            </div> : <MovieList movies={movies}/>}
        </div>
        
    </>);
}