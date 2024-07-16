import React from 'react'

import Banner from '../Components/Banner'
import Trending from '../Components/Trending'
import TopRated from '../Components/Toprated'
import Popular from '../Components/popular'
import Upcoming from '../Components/Upcomimg'

const Homepage = () => {

  

  return (
    <div className='homePage'>
      <Banner/>
     <Upcoming/>
     <Trending/>
     <TopRated/>
     <Popular/>
    </div>
    )
  
    
}

export default Homepage
