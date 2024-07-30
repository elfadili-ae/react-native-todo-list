import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks";
import tasksMiddleWare from "./middleware";


export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
    middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(tasksMiddleWare),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;