import {createSlice} from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:[],
    reducers:{
        //function logics or actions are define here
        addToCheckout:(state,action)=>{
            state.push(action.payload)
        },
        removeFromCheckout:(state,action)=>{
            return state.filter(product=>product._id !== action.payload)

        },
        emptyCart:(state)=>{
            return state =[]
        }
    }

})

export const {addToCheckout,removeFromCheckout,emptyCart} = wishlistSlice.actions;
export default wishlistSlice.reducer;