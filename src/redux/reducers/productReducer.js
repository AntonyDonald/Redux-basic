import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productList : []
};

export const productReducer = createSlice({
    name : "productReducer",
    initialState : initialState,
    reducers : {
        addProduct : (state , {type,payload}) =>{
            console.log(payload);
            return {
                ...state ,
                productList : payload
            }
            
        }
    }
})

export const {addProduct} = productReducer.actions;
export default productReducer.reducer