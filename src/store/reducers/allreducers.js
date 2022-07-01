import { combineReducers } from "redux";
import { filmListReducer } from "./filmListReducer";
import {searchReducer} from "./searchReducer";


export default combineReducers({filmListReducer, searchReducer})