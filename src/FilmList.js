import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filmListAction } from "./store/actions/auth"



export function FilmList(){

    const dispatch = useDispatch()
    const films = useSelector((state) => state.filmListReducer.films)



   useEffect(() => {
    dispatch(filmListAction(1))
   }, [dispatch])

    return(
       
        <div>
        <div class="flex flex-row bg-purple-600 p-2" >
        <div class=" basis-1/2 "><p class=" cursor-pointer font-sans text-xl tracking-widest text-justify uppercase p-2 ">Movies</p></div>
        <div class="basis-1/2">
          <label class=" flex justify-center relative block">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
        </span>
        <input class="w-40 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-6 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search ..." type="search" name="search"/>
        <button class="bg-violet-200 rounded-lg p-4  ml-4 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
        Search
      </button>
      </label>
      </div>
      </div> 
              <div class="flex flex-row flex-wrap p-8 grid grid-cols-4 gap-4 bg-indigo-200" >
      {films.map((item) => (

            <div>
                <img src={item.posterUrlPreview} class="w-64  h-64 h-auto rounded-lg" alt="" />
                <p class="font-sans ...">{ item.nameOriginal || item.nameRu || item.nameEn}</p>
            </div>
           


      ))}
 </div>
        </div>

      
    )
}