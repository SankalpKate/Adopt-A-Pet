import { createSlice } from "@reduxjs/toolkit";

const savedList = createSlice({
    name:"savedlist",
    initialState:[],
    reducers:{
        addToSavedlist:(state,action)=>{
            state.push(action.payload)
        },
        removeFromWishlist:(state,action)=>{
            return state.filter(project=>project._id !== action.payload)
        },
        addToWishlist:(state,action)=>{
            state.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            return state.filter(product=>product._id !== action.payload)
        },
        addToInfo:(state,action)=>{
            state.push(action.payload)
        },
        



    }
})

export const {addToSavedlist,removeFromWishlist,addToWishlist,removeFromCart,addToInfo}= savedList.actions;
export default savedList.reducer;


