import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    message: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        removeMessage: (state) => {
            state.message = null
        }
    }
})

export const { removeMessage, setMessage } = messageSlice.actions;
export default messageSlice.reducer;