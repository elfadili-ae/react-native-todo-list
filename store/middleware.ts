import { Middleware } from "@reduxjs/toolkit";

import { storeData, addTask, editTask, removeTask } from "./tasks";


const tasksMiddleWare: Middleware = store => next => action => {
    const result = next(action);

    if (addTask.match(action) || editTask.match(action) || removeTask.match(action)) {
        const state = store.getState();
        storeData(state.tasks);
    }

    return result;
}

export default tasksMiddleWare;