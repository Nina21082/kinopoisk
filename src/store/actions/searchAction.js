import {SEARCH_FILMS, SEARCH_ERROR, SEARCH_LOADING} from '../type'
import {http} from "../http/http";
import React from "react";

export const searchAction = (params) => async (dispatch) =>{
    try{
        dispatch({
            type: SEARCH_LOADING,
            payload: true
        })
        const resp = await  http.get(`/v2.1/films/search-by-keyword?keyword=${params.keyword}&page=${params.page}`)
        console.log(resp.data.films)
        dispatch({
            type: SEARCH_FILMS,
            payload: resp.data.films
        })
    }catch(error){
        if (error.message) {
            console.log(error.message)
            dispatch({
                type: SEARCH_ERROR,
                payload: error.message
            })
        } else if (error.response.data.message){
            dispatch({
                type: SEARCH_ERROR,
                payload: error.response.data.message
            })
        } else (
            dispatch({
                type: SEARCH_ERROR,
                payload: 'Unknown error'
            })
        )
    }
};
