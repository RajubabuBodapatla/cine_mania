import React, {useRef} from 'react';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill
} from "react-icons/bs";
import dayjs from 'dayjs';
import PosterFallBack from '../Assets/No-Poster.png'
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Img from './lazyLoadImage';
import CircleRating from './RatingRing';
import Genres from './genres'

// import {addToFavourites,removeFromFavourites} from '../Redux/AddfavSlice'
      
import AddtoFav from './AddtoFav';

const Carousal = ({data,loading,endpoint,title}) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    // const favourites = useSelector(state => state.favourites);

 

    const navigation = (dir) =>{
        const container = carouselContainer.current
        const scrollquantity = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 15) : container.scrollLeft + (container.offsetWidth + 15)
        container.scrollTo({
            left: scrollquantity,
            behaviour: "smooth"
        })
    }
    const outItem = () => {
        return (
            <div className='skeletonItem'>
                <div className='posterBlockskeleton'></div>
                <div className='textBlock'>
                    <div className='titleskeleton'></div>
                    <div className='dateskeleton'></div>
                </div>
            </div>
        )
    }
  return (
    <div className='carousel'>
        <div className='wrapper'>
       {title && <div className='carouselTitle'></div>}
       <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() =>navigation('left') }/>
        < BsFillArrowRightCircleFill className='carouselRightNav arrow' onClick={() => navigation('right')}/>
        {!loading ? (
            <div className='carouselItems' ref={carouselContainer}>
                {data?.map((movie) => {
                    const posterLink = movie.poster_path ? url.poster + movie.poster_path : PosterFallBack
                    return(
                        <div key={movie.id} className='carouselItem' onClick={() => navigate(`/${movie.media_type || endpoint}/${movie.id}`)}>
                             <div className="posterBlock">
                             <AddtoFav movie={movie}/>
                                
                                <Img src={posterLink} />
                                <CircleRating rating={movie.vote_average.toFixed(1)} />
                                <Genres data={movie.genre_ids.slice(0, 3)} />
                            
                            </div>
                            <div className="textBlock">
                                <span className="title">
                                    {movie.title || movie.name}
                                </span>
                                <span className="date">
                                    {dayjs(movie.release_Date).format("MMM DD, YYYY")}
                                </span>
                            </div>
                        </div>

                    )
                }
            )
                }
            </div>
            ):(
                <div className="loadingBlock">
                    {outItem()}
                    {outItem()}
                    {outItem()}
                    {outItem()}
                    {outItem()}
                </div>
            )}
            </div>
   </div>
  )
}

export default Carousal
