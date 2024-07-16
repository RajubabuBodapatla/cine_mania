import React, { useState } from 'react';

import SwitchTab from './switching';
import useFetch from '../useFetch';
import Carousel from './carousal';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    };
    return (
        <div className='carouselSection'>
            <div className='wrapper'>
                <span className="carouselTitle">
                    Popular Movie's & Tv Shows
                </span>
                <SwitchTab data={["Movies", "TV"]} onTabChange={onTabChange} />
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
};

export default Popular;