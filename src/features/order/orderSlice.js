
import { createSlice } from "@reduxjs/toolkit"


    const initialState = {
   
     basket:[],
     orderDetails:null
   
     
       
   }


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

        addToBasket:(state, action)=>{
            state.basket .push(action.payload)
        },
        updateShoeInBasket: (state, action) => {
            state.basket = state.basket.map(item => item._id === action.payload._id ? action.payload : item)
        },
        saveOrderDetails:(state,action)=>{
            state.orderDetails = action.payload
        },
  
       removeFromBasket:(state,action)=>{
            state.basket=state.basket.filter(item=>item._id!=action.payload)
        },
        resetBasket:(state)=>{
            state.basket=[]},
            
            resetOrderDetails:(state)=>{
                state.orderDetails=null}



        
    
    }
})

export const {resetBasket,resetOrderDetails,addToBasket,updateShoeInBasket,saveOrderDetails,removeFromBasket} = orderSlice.actions;
export default orderSlice.reducer;