import {useSelector} from "react-redux";
import React, {useState} from "react";

export const Pagination = ({handleClickPagination, pageCount}) => {
    const loading = useSelector((state) => state.filmListReducer.loading)
    const [active, setActive] = useState(1)
    const pages = []


    const handleClick = (page) => {
        setActive(page)
        handleClickPagination(page)
        window.scrollTo(0, 0)


    };
    const count = pageCount
    console.log(count);
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
            {Array.from(Array(pageCount), (e, i) => {
                return <button
                    disabled={loading}
                    key={i}
                    className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white ${active === i + 1 ? 'active bg-blue-400' : ''}`}
                    onClick={() => handleClick(i + 1)}
                >
                    {i+1}
                </button>
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