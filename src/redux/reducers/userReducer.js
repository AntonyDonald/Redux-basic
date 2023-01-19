import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userList : []
};

export const userReducer = createSlice({
    name : "userReducer",
    initialState : initialState,
    reducers : {
        addUser : (state , {type , payload}) => {
            return{
                ...state,
                userList : payload
            }
        },
        editUser : (state , {type , payload}) => {
            const updatedUser = ([...state.userList]).map((data) => data.id === payload.id ? payload : data);
            return {
               ...state ,
               userList : updatedUser
            }
        },
        deleteUser : (state , {type , payload}) => {
            const filtered = ([...state.userList].filter((data) => data.id !== payload))
            return{
                ...state , 
                userList : filtered
            }
        }
    }
})

export const {addUser , editUser , deleteUser} = userReducer.actions;
export default  userReducer.reducer;