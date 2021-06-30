import { createStore, combineReducers } from "redux";
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
})

export const AppStore = createStore(rootReducer)