import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

import favouritesReducer from './AddfavSlice'
import authReducer from './authSlice'

export const store= configureStore({
    reducer:{
        home: homeSlice, 
        favourites: favouritesReducer,
        auth:authReducer
    },
})