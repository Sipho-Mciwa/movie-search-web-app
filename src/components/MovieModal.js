import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  justifyContent: 'space-between',
};

export default function MovieModal({isOpened, handleClose, movieTitle, movieDescription, moviePoster, releaseDate, language, popularity, voteAverage}) {

    const calculateRating = (voteAverage, popularity) => {
    // Normalize vote average (TMDb vote_average is 0–10 → convert to 0–5)
    const normalizedVote = voteAverage / 2;

    // Normalize popularity (cap it to a max of 5)
    const normalizedPopularity = Math.min(popularity / 200, 5); 
    // ^ Adjust divisor (200) to control scaling — smaller = more effect from popularity

    // Weighted average: 70% rating, 30% popularity
    const combinedScore = (normalizedVote * 0.7) + (normalizedPopularity * 0.3);

    // Cap final score at 5 and round to one decimal
    return Math.min(combinedScore, 5).toFixed(1);
    };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isOpened}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={isOpened}>
          <Box sx={style}>

            <div style={{justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', margin: '5px'}}>
                <img src={`http://image.tmdb.org/t/p/w92/${moviePoster}`} alt="movie-poster"/>
                <Typography id="spring-modal-title" variant="h6" component="h2" textAlign={'left'} fontWeight={'bold'} color=''>
                {movieTitle}
                    <Typography fontWeight={'bold'}>
                        {`Release Date: ${releaseDate}`}
                    </Typography>
                    <Typography fontWeight={'bold'}>
                        {`Language: ${language}`}
                    </Typography>
                    <Rating name="half-rating-read" value={calculateRating(voteAverage, popularity)} precision={0.5} readOnly />
                </Typography>
            </div>
            <br style={{border: '1px solid black'}}/>
            <Typography id="spring-modal-description" sx={{ mt: 2 }} style={{fontStyle: 'italic'}}>
              {movieDescription}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
