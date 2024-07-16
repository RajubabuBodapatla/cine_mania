import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites,removeFromFavourites } from '../Redux/AddfavSlice';



import Heartred from '../Assets/heartRed';
import Heartwhite from '../Assets/heartWhite';

const AddtoFav = ({ movie }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites);
  const isFavourite = favourites.some(favMovie => favMovie.id === movie.id);

  const handleFavouriteClick = (event) => {
    event.stopPropagation()
    if (isFavourite) {
      dispatch(removeFromFavourites(movie));
    } else {
      dispatch(addToFavourites(movie));
    }
  };

  return (
   
     
      <button  onClick={handleFavouriteClick}>
        {isFavourite ? <Heartred/> : <Heartwhite/>}  {/* Heart icon */}
      </button>

  );
};

export default AddtoFav;
