import React, { useState } from "react";

import SwitchTab from "./switching";
import useFetch from "../useFetch";
import Carousel from "./carousal";

const Upcoming = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/upcoming`);

 
  return (
    <div className="carouselSection">
      <div className="wrapper">
        <span className="carouselTitle">Upcoming Movie's</span>
              <SwitchTab data={["Movies"]}
             
              />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Upcoming;