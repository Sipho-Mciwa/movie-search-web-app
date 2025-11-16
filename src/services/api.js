import axios from "axios";

const API_URL = process.env.REACT_APP_MOVIE_API_URL;
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

export const fetchMovies = async (userInput) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    try {
        const response = await axios.get(`${API_URL}search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`, options);
        return (response.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

export const fetchPopularMovies = async () => {
    
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    try {
        const response = await axios.get(`${API_URL}movie/popular?language=en-US&page=1`, options);
        return (response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}