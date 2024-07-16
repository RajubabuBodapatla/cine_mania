import React,{useState} from 'react'
import useFetch from '../useFetch'
// import useFetch from '../useFetch'
import Carousal from './carousal'
import SwitchTab from './switching'

const Trending = () => {
  const [endpoint, setEndPoint] = useState('day');

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    if (tab === "Day") { setEndPoint('day') }
    else if (tab === 'Week') { setEndPoint('week' ) }

    else { setEndPoint('day') }
  }
  return (
    <div className='carouselSection'>
      <div className='wrapper'>
        <span className='carouselTitle'>
          Trending Movies and TV Shows
        </span>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />

      </div>
      <Carousal data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
