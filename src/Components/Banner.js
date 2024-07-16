import React, {useState } from 'react';

import { useNavigate } from 'react-router-dom';
import bannerimg from '../Assets/Logo.png'
import searchicon from '../Assets/searchicon.png'

// import { useSelector } from 'react-redux';

// import Img from './lazyLoadImage';

const Banner = () => {
   
    const [query, setQuery] = useState("");
    const [isActive,setIsActive] = useState(false)
    const navigate = useNavigate();
    // const { url } = useSelector((state) => state.home)

  const handleInput = () => {
   
        setIsActive(!isActive)
        console.log('clicked')
    
        
  }
const handleBlur = () => {
    setIsActive(isActive)
}

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            
        }
        
    };


    return (
        <div className="heroBanner">
            {<div className="backdrop-img">
                <img className='bannerimg' src={bannerimg} alt='logo'/>
            </div>}
            <div className="opacity-layer">
            </div>
            <div className='wrapper'>
                <div className="heroBannerContent">
                    {/* <span className="title">Welcome...</span>
                    <span className="subTitle">Your Favourites Movies, TV Shows and Doscover...</span> */}
                    <div className="searchInput">
                        <input type="text" placeholder='Search movie or tv shows...' 
                        onChange={(e) => setQuery(e.target.value)} 
                        onKeyUp={searchQueryHandler}    
                        onFocus={handleInput}
                        onBlur={handleBlur}/>
                        <button onClick={() => {
                            navigate(`/search/${query}`)
                           }}
                        
                           >
                            <img  id='search-icon' className={isActive?"activeicon":""}src={searchicon} alt='icon'/></button>
                    </div>
                </div>
    
            </div>
        </div>
    )
};

export default Banner
