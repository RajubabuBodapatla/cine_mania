
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../useFetch";

import Spinner from "../Components/spin";
import MovieCard from "../Components/Moviecard/card";
import FetchData from "../api";

let filters = {};
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = useCallback( () => {
    setLoading(true);
    const filters = {
      sort_by: sortby?.value,
      with_genres: genre ? genre.map((g) => g.id).join(",") : undefined,
    };
    FetchData(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    
    });
  });

  const fetchNextPageData = () => {
    const filters = {
      sort_by: sortby?.value,
      with_genres: genre ? genre.map((g) => g.id).join(",") : undefined,
    };
    FetchData(
      `/discover/${mediaType}?page=${pageNum}`,
      filters
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    })
    .catch((error) => {
        console.error("Failed to fetch next page data:", error);
      });
  };

  useEffect(() => {
   
    fetchInitialData();
  }, [mediaType, genre,sortby]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
    }
    if (action.name === "genres") {
      setGenre(selectedItems);
    }
    setPageNum(1);
    fetchInitialData();
  };
  return (
    <div className="explorePage">
      <div className="wrapper">
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv"
              ? "Explore TV Shows"
              : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select Category"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                 
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                    />
                  )
                
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
