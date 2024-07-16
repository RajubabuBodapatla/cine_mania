import React,{useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css' ;
import './App.scss';
import { useDispatch,useSelector } from "react-redux";
import {getApiConfiguration, getGenres} from './Redux/homeSlice'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import FetchData from "./api";
import Homepage from "./Pages/Homepage"
import Details from './Pages/Details/Details'
import SearchResult  from "./Components/SearchBar"
import Explore from './Pages/explore'
import {PageNotFound} from './Pages/404Page'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/login'
import Favourites from './Components/Favourites';



function App() {
  const dispatch=useDispatch();
  const {url}=useSelector((state)=>state.home)

useEffect(()=>{
  fetchApiConfig();
   genresCall()
},[])

  const fetchApiConfig=()=>{
   FetchData("/configuration")
    .then((res)=>{
      
      const url = {
        backdrop: res.images.secure_base_url+"original",
        poster: res.images.secure_base_url+"original",
        profile: res.images.secure_base_url+"original"
      }
      dispatch(getApiConfiguration(url));
    })
  };
  
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(FetchData(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    })
    
    dispatch(getGenres(allGenres))
  }

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Homepage/>}  />
    <Route path="/:mediaType/:id" element={<Details/>}  />
  
    <Route path="/search/:query" element={<SearchResult/>}  />
    <Route path="/explore/:mediaType" element={<Explore/>}  />
    <Route path='/favourites' element={<Favourites/>}/>
    <Route path='/register' element={<Register />} />
    <Route path="/login" element={<Login/>} />
    <Route path="*" element={<PageNotFound/>}  />
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App;
