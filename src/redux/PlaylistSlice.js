import { createSlice } from "@reduxjs/toolkit";


const PlayListSlice = createSlice({
    name: "playlist",
    initialState: [],
    reducers: {
        AddSong: (state,action) => {
           state.push(action.payload) 
        }
    }
})

export const { AddSong } = PlayListSlice.actions
export default PlayListSlice.reducer