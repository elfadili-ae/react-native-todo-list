import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
type task = {
    id: string,
    description: string,
}

export const storeData = async (value: task[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('tasks', JSON.stringify(value));
    } catch {
        console.log("could not store the data!");
    }
}

export const getData = async (): Promise<task[]> => {
    try {
        const data = await AsyncStorage.getItem('tasks');
        return data !== null ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

const initialState: task[] = [];

const taskReducer = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        setTask: (state, action: PayloadAction<task[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<{ description: string }>) => {
            state.push({
                id: nanoid(),
                description: action.payload.description,
            });
        },
        editTask: (state, action: PayloadAction<{ id: string, description: string }>) => {
            state.forEach((item: task) => {
                if (item.id === action.payload.id) {
                    item.description = action.payload.description;
                }
            });
        },
        removeTask: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter((item: task) => item.id !== action.payload.id);
        }
    }
})

export const { setTask, addTask, editTask, removeTask } = taskReducer.actions;

export const loadTasks = () => async (dispatch: Dispatch) => {
    const data = await getData();
    dispatch(setTask(data))
}

export default taskReducer.reducer;
