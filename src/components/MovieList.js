import MovieCard from "../components/MovieCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './MovieList.css';

export default function MovieList({movies}) {

    const Item = styled(Paper)(({ theme }) => ({
        
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
        height: '400px',
        width: '300px',
        marginTop: '100px',
        // justifyContent: 'center',
        
    }));

    
    return (
        <div className="movieList">
            {movies.length !== 0 ?  
            <Grid container columns={{sm: 2, md: 4, lg: 8}} style={{padding: '5px'}} justifyContent={'center'} >
                {Array.from(movies).map((movie) => (
                    <Grid size={1.5}>
                        <Item >
                            <MovieCard movieTitle={movie['original_title']} 
                                movieDescription={movie['overview']} moviePoster={movie['poster_path']} 
                                releaseDate={movie['release_date']} language={movie['original_language']} 
                                popularity={movie['popularity']} voteAverage={movie['vote_average']}/>
                        </Item>
                    </Grid>
                ))}
            </Grid> : <div className="errorMsg">Start Searching</div>}
        </div>
    );
}