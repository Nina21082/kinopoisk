import { SHOW_FILMS, ERROR_FILMS, LOADING_FILMS } from "../type"

const initialState={
    films: [],
    loading: null,
    error: null
}

export const filmListReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_FILMS : {
            console.log(action)
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
               loading: true,
               error: null
            }       
        }
        default: return state
    }
}
 