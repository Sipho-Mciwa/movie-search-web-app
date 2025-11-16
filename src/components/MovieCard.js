import './MovieCard.css';
import MovieModal from './MovieModal';
import { useState } from 'react';

export default function MovieCard({movieTitle, movieDescription, moviePoster, releaseDate, language, popularity, voteAverage}) {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="miniInfo">
            <div onClick={handleOpen} >
                <img src={`http://image.tmdb.org/t/p/w185/${moviePoster}`} alt={`${movieTitle}-Poster`}/>
                <h2>{`${movieTitle} (${language})`}</h2>
                <h3>{`Release Date: ${releaseDate}`}</h3>
            </div>
            <MovieModal isOpened={open} handleClose={handleClose} movieTitle={movieTitle} 
                movieDescription={movieDescription} moviePoster={moviePoster} releaseDate={releaseDate} 
                language={language} popularity={popularity} voteAverage={voteAverage}/>
        </div>
    );
}