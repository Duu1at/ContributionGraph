import { configureStore } from '@reduxjs/toolkit';
import {gitApi} from "../api/gitApi";

const store = configureStore({
    reducer: {
        [gitApi.reducerPath]: gitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gitApi.middleware),
});

export default store;
