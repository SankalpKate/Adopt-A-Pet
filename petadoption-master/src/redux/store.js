import {configureStore} from "@reduxjs/toolkit";
import savedSlice from "./savedSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
    reducer:{
        savedListReducer:savedSlice,
        wishlistReducer:wishlistSlice

    }
})
export default store;