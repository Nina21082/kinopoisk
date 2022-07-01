import {SEARCH_ERROR, SEARCH_LOADING} from "../type"



const initialState = {
    error: null,
    loading: null
}
export const searchReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SEARCH_ERROR: {
            return {
                ...state,
                error: action.error,
                loading: false
            }
        }case SEARCH_LOADING: {
            return {
                ...state,
                error: null,
                loading: action.payload
            }
        }
        default: return state
    }
}