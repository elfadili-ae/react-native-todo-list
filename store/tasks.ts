import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

type task = {
    id: string,
    description: string,
}

type initialStateType = {
    total: number,
    tasks: task[],
};

export const storeData = async (value: initialStateType): Promise<void> => {
    try {
        await AsyncStorage.setItem('tasks', JSON.stringify(value));
    } catch {
        console.log("could not store the data!");
    }
}

export const getData = async (): Promise<initialStateType> => {
    try {
        const data = await AsyncStorage.getItem('tasks');
        return data !== null ? JSON.parse(data) : { total: 0, tasks: [] };
    } catch {
        return { total: 0, tasks: [] };
    }
}

const initialState: initialStateType = { total: 0, tasks: [] };

const taskReducer = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        setTask: (state, action: PayloadAction<initialStateType>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<{ description: string }>) => {
            state.total += 1;
            state.tasks.push({
                id: nanoid(),
                description: action.payload.description,
            });
        },
        editTask: (state, action: PayloadAction<{ id: string, description: string }>) => {
            state.tasks.forEach((item: task) => {
                if (item.id === action.payload.id) {
                    item.description = action.payload.description;
                }
            });
        },
        removeTask: (state, action: PayloadAction<{ id: string }>) => {
            const newTasksState = state.tasks.filter((item: task) => item.id !== action.payload.id);
            return {
                ...state,
                tasks: newTasksState,
            }
        }
    }
})

export const { setTask, addTask, editTask, removeTask } = taskReducer.actions;

export const loadTasks = () => async (dispatch: Dispatch) => {
    const data = await getData();
    dispatch(setTask(data))
}

export default taskReducer.reducer;
