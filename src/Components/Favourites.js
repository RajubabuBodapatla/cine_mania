// src/components/Favourites.js

import React ,{useState}from 'react';
import { useSelector} from 'react-redux';

import Carousal from './carousal';
import SwitchTab from './switching';

const Favourites = () => {
  // const dispatch = useDispatch();
  const data = useSelector((state) => state.favourites)



  
   
    const [endpoint, setEndpoint] = useState("movie");
    // const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    };
    return (<div className='favourites'>
        {
           (data)? (<div className='carouselSection'>
            <div className='wrapper'>
                <span className="carouselTitle">
                    Favourite Movie's & Tv Shows
                </span>
                <SwitchTab data={["Movies", "TV"]} onTabChange={onTabChange} />
            </div>
            <Carousal data={data}  endpoint={endpoint}/>
        </div>):<h3>There are No Favourites</h3>
        }
    </div>

    
     
    )
  
};

export default Favourites;
