import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import allReducers from "./reducers/allreducers";
import {composeWithDevTools} from 'redux-devtools-extension'

const middleware = [thunk]

export const store = createStore(allReducers, composeWithDevTools(applyMiddleware(...middleware)))