import { http } from "../http/http"
import { SHOW_FILMS, ERROR_FILMS, LOADING_FILMS } from "../type"


export const filmListAction = (page) => async (dispatch) => {
    try{
        dispatch({
            type: LOADING_FILMS,
            payload: true
        })
        const response = await http.get(`/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`)
        console.log(response.data.items)
        dispatch({
            type: SHOW_FILMS,
            payload: response.data.items
        })
    }catch(error){
        console.log(error)
        dispatch({
            type: ERROR_FILMS,
            payload: 'null'
        }) 
    }

}