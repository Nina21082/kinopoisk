import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

export const Pagination = ({handleClickPagination, pageCount}) => {
    const loading = useSelector((state) => state.filmListReducer.loading)
    const [active, setActive] = useState(1)
    const [arrActive, setArrActive] = useState([])
    const dotsInitial = '...';
    const dotsRight = '... ';
    const dotsLeft = ' ...';


    const pages = []
    for(let i = 1;i <= pageCount; i++){
        pages.push(i)
    }
    console.log(pages.length);
    useEffect(() => {
        console.log('arrActive', arrActive);
        let numberPages = [...arrActive]

        if(active >= 1 && active <= 3){
            numberPages = [1,2,3,4,dotsInitial, pages.length]
        }else if(active === 4){
            const sliced = numberPages.slice(0, 5);
            numberPages = [...sliced, dotsInitial, pages.length]
        }else if(active > 4 && active < pages.length - 2){
            const sliced1 = pages.slice(active-2, active)
            const sliced2 = pages.slice(active, active + 1)
            numberPages = [1,dotsLeft, ...sliced1, ...sliced2,dotsRight, pages.length]
        }else if(active > pages.length-3){
            const sliced = pages.slice(pages.length-4)
            numberPages = ([1, dotsLeft, ...sliced])
        }else if(active === dotsInitial){
            const activePage = arrActive[arrActive.length - 3] + 1
            setActive(activePage)
            handleClickPagination(activePage)
        } else if(active === dotsRight){
            const activePage = arrActive[3] + 2
            setActive(activePage)
            handleClickPagination(activePage)
        }else if(active === dotsLeft){
            const activePage = arrActive[3] - 2
            setActive(activePage)
            handleClickPagination(activePage)
        }
        setArrActive(numberPages)
    },[active, pageCount])
    const handleClick = (page) => {
        setActive(page)
        window.scrollTo(0, 0)
        if (typeof page === 'number') {
            handleClickPagination(page)
        }

    };
    return(
        <div className="flex items-center justify-center space-x-1 p-5 bg-indigo-100">
            <button
                disabled={loading || active === 1}
                className={`px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white ${active === 1 ? 'focus:outline-none focus:ring-0 ease-in-out pointer-events-none' : ''}`} onClick={() => {
                if(active === 1){
                    setActive(1)
                }else {
                    setActive(active - 1)
                    handleClick( active - 1 )
                }
            }}>
                Previous
            </button>
            {arrActive.map((e, index) => {
                return (
                    <button
                    disabled={loading}
                    key={index}
                    className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white ${active === e ? 'active bg-blue-400' : ''}`}
                    onClick={() => handleClick(e)}
                >
                    {e}
                </button>
                )
            })}
            <button
                disabled={loading || active === pages.length}
                className={`px-4 py-2 font-bold text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white ${active === pages.length ? 'focus:outline-none focus:ring-0 ease-in-out pointer-events-none' : ''} `}
                onClick={() => {
                    if(active === pages.length){
                        setActive(pages.length)
                        handleClick( pages.length)
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