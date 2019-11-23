import {createStore, combineReducers} from "redux";

import viewReducer from "./viewReducer";
import todosReducer from "./todosReducer";

export default createStore(combineReducers({
    view: viewReducer,
    todos: todosReducer
}));

