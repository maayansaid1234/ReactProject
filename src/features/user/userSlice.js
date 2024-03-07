import { createSlice } from "@reduxjs/toolkit"

    const initialState = {
    currentUser:null
    }


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      saveUser:(state,action) =>{
     state.currentUser=action.payload
     localStorage.setItem("currentUser",JSON.stringify
     (action.payload))
        }
        ,resetUser:(state)=>{
            state.currentUser=null
            localStorage.removeItem("currentUser")
        }
    }
})

export const { saveUser,resetUser} = userSlice.actions;
export default userSlice.reducer;