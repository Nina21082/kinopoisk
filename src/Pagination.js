import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

export const Pagination = ({handleClickPagination, pageCount}) => {
    const loading = useSelector((state) => state.filmListReducer.loading)
    const [active, setActive] = useState(1)
    const [arrActive, setArrActive] = useState([])

    const pages = []
    for(let i = 1;i <= pageCount; i++){
        pages.push(i)
    }

    useEffect(() => {
        let numberPages = [...pages]
        if(active >= 1 && active <= 3){
            numberPages = [1,2,3,4,'...', pages.length]
        }else if(active === 4){
            const sliced = numberPages.slice(0, 5);
            numberPages = [...sliced, '...', pages.length]
        }
        setArrActive(numberPages)
    },[active])

    const handleClick = (page) => {
        setActive(page)
        handleClickPagination(page)
        window.scrollTo(0, 0)

    };



    return (
        <div className="flex items-center justify-center space-x-1 p-5 bg-indigo-100">
            <button className="flex items-center px-4 py-2 text-gray-500 bg-gray-300 rounded-md" onClick={() => {
                if(active === 1){
                    setActive(1)
                    handleClick( 1)
                }else {
                    setActive(active - 1)
                    handleClick( active - 1 )
                }
            }}>
                Previous
            </button>
            {arrActive.map(e => {
                return (<button
                    disabled={loading}
                    key={e}
                    className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white ${active === e ? 'active bg-blue-400' : ''}`}
                    onClick={() => handleClick(e)}
                >
                    {e}
                </button>
                )
            })}

            <button
                className="px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white" onClick={() => {
                    if(active === 20){
                        setActive(1)
                        handleClick( 1)
                    }else {
                        setActive(active + 1)
                        handleClick( active + 1 )
                    }
            }}>
                Next
            </button>
        </div>
    )
}