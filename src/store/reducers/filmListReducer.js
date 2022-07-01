import {SHOW_FILMS, ERROR_FILMS, LOADING_FILMS, SHOW_DATA, SEARCH_FILMS} from "../type"

const initialState={
    films: [],
    loading: null,
    error: null,
    data: []
}
export const filmListReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_FILMS : {
            return{
                ...state,

                films: action.payload,
                loading: false
            }
        }
        case ERROR_FILMS: {
            return{
                ...state, 
                loading: false,
                error: action.payload
            }
        } case LOADING_FILMS:{
            return{
                 ...state, 
               loading: action.payload,
               error: null
            }       
        }
        case SHOW_DATA:{
            return{
                 ...state,
                 data: action.payload,
                loading: false,
                error: null
            }
        } case SEARCH_FILMS: {
            return{
                ...state,
                films: action.payload,
                error: null,
                loading: false
            }
        }
        default: return state
    }
}
 