import axios from 'axios'
// import React, { useEffect, useState } from 'react'

const API_KEY = `cf7039b9dc26d25f20f9556e0d4d33ec`
const BASE_URL = `https://api.themoviedb.org/3`
// const headers = {
//    Authorization : `Bearer ${API_KEY}'`
// }


const FetchData = async (url,params) => {
   try{
     
    const {data} = await axios.get(BASE_URL+url,{params:{
      ...params,
      api_key : API_KEY
    }})
    // console.log(data)
    return data;
   
   }
   catch(e){
    console.log(e.response)
    return e;
   }
   
}

export default FetchData
