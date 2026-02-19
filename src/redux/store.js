import { configureStore } from "@reduxjs/toolkit"
import playlistSlice from "./PlaylistSlice"
export const store = configureStore({
    reducer: {
       playlist:playlistSlice,
   }
})