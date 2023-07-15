import { createSlice } from "@reduxjs/toolkit";

const emojiSlice = createSlice({
    name: "emoji",
    initialState: {
        emoji: false,
    },
    reducers: {
        toggleEmoji: (state, action) => {
            state.emoji = action.payload;
        }
    }
    })
export const { toggleEmoji } = emojiSlice.actions;
export default emojiSlice.reducer;