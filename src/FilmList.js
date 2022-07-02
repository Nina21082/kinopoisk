import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Pagination} from "./Pagination"
import {filmListAction} from "./store/actions/filmListAction"
import {searchAction} from "./store/actions/searchAction";
import React from "react";


export function FilmList() {
    const dispatch = useDispatch()
    const films = useSelector((state) => state.filmListReducer.films)
    const data = useSelector((state) => state.filmListReducer.data)
    const error = useSelector((state) => state.filmListReducer.error)
    const loading = useSelector((state) => state.filmListReducer.loading)
    const searchError = useSelector((state) => state.searchReducer.error)
    const searchLoading = useSelector((state) => state.searchReducer.loading)
    const [value, setValue] = useState('');
    const [searchTimeout, setSearchTimeout] = useState();





    useEffect(() => {
        dispatch(filmListAction(1))
    }, [dispatch])


    const handleClickPagination = (page) => {
        dispatch(filmListAction(page))
    }

    const handleChange = (event) => {
        setValue(event.target.value);
            if (event.target.value) {
                clearTimeout(searchTimeout);
                let timeout = setTimeout(() => {
                    let params = {
                        page: 1,
                    keyword: event.target.value
            };
        dispatch(searchAction(params))
    },2000);
                setSearchTimeout(timeout)
            } else {
                dispatch(filmListAction(1))
            }
    }

    const handleSearchClick = (event) => {
        event.preventDefault()

        if (value) {
            let params = {
                page: 1,
                keyword: value
            }
            dispatch(searchAction(params))
        } else {
            dispatch(filmListAction(1))
        }
        setValue(
            ''
        )
    }
    return (
        <>
            {searchError && <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error</div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{searchError}</p>
                </div>
            </div>
            }
            {error && <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error</div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{error}</p>
                </div>
            </div>
            }
            <div className='relative '>
                {loading && <div className='absolute  top-50  inset-x-0 h-16 '>{loading}</div>}
                <div className="flex flex-row bg-purple-600 p-2 ">
                    <div className=" basis-1/2 ">
                    <p className=" cursor-pointer font-sans text-xl tracking-widest text-justify uppercase p-2 " onClick={() => {
                        dispatch(filmListAction(1))
                        window.location.reload();
                    }}>Movies</p>
                    </div>
                    <div className="basis-1/2">
                        <label className=" flex justify-center relative block">
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
                            <input value={value} onChange={(event) => handleChange(event)}
                                   className="w-48 placeholder:italic placeholder:text-slate-400 block bg-white  border border-slate-300 rounded-md py-2 pl-6 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                   placeholder="Search ..." type="search" name="search"/>
                            <button onClick={(event => handleSearchClick(event))}
                                    className="bg-violet-200 rounded-lg p-4  ml-4 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
                                Search
                            </button>
                        </label>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap p-8 grid grid-cols-4 gap-4 bg-indigo-200">
                    {films && films.length ? films.map((item, index) => (
                        <div key={index}>
                            <img src={item.posterUrlPreview} className="w-64  h-80 rounded-lg" alt=""/>
                            <p className="font-sans ...">{item.nameOriginal || item.nameRu || item.nameEn}</p>
                        </div>
                    )) :
                        <div>No Result</div>
                    }
                </div>
                < Pagination
                    pageCount={data.totalPages}
                    handleClickPagination={(page) => handleClickPagination(page)}/>
            </div>
        </>
    )
}


