import React from 'react';

import { useParams } from 'react-router-dom';
import useFetch from '../../useFetch';
import DetailsBanner from '../../Components/Detailsbanner';
import Cast from '../Details/cast';
import VideosSection from '../../Components/trailer';
import Similar from '../Details/Similar';
import Recommendation from '../Details/Recommend';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
};

export default Details;
