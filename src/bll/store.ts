import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {notesReducer} from "./notesReducer/notesReducer";
import {tagsReducer} from "./tagReducer/tagReducer";


export const rootReducer = combineReducers({
    notesReducer,
    tagsReducer
});

export type AppStateType = ReturnType<typeof rootReducer>



export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
));

