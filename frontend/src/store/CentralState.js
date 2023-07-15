import {configureStore} from '@reduxjs/toolkit';
import emojiSlice from './emojiSlice';

const store=configureStore({
    reducer:{
        emoji:emojiSlice
    }
})

export default store;
