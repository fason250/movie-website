import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import axios from "axios"
import { getTrendingMovies, updateSearchCount } from '../src/appwrite'
import Search from '../src/components/Search'
import Loading from '../src/components/Loading'
import MovieCard from '../src/components/MovieCard'
import { Link } from 'react-router-dom'


const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY

function Home() {
    const [searchTerm,setSearchTerm ] = useState("")
    const [error,setError] = useState(null)
    const [movies ,setMovies ] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [ debounceSearch, setDebounceSearch ] = useState("")
    const [trendingMovies , setTrendingMovies ] = useState([])
    const [ moviePage , setMoviePage ] = useState(1)
    
  
    const options = {
      params:{
        include_adult: true,
        sort_by: 'popularity.desc',
        page: moviePage > 0 ?  moviePage : 1
      },
      headers:{
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    }
  
    // debouncing the searchTerm with 600ms
    useDebounce(()=>{
      setDebounceSearch(searchTerm)
    },600,[searchTerm])
  
    // fetching movies
    useEffect(()=>{
      const fetchingMovies = async(query = "")=>{
        try {
          const url = query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_URL}/discover/movie`
  
          const { data } = await axios.get(url,options)
          if(!data) throw new Error("failed to fetch movies")
    
          setMovies(data.results)
          if(query && data.results.length > 0){
            await updateSearchCount(query,data.results[0])
          }
        } catch (error){
          console.log(error)
          setError("unable to fetch movies please Try again")
        }finally{
          setIsLoading(false)
        }
  
      }
  
      fetchingMovies(debounceSearch)
    },[debounceSearch,moviePage])
  
    // trending movies
    useEffect(()=>{
      const fetchTrendingMovies = async()=>{
        try {
           const movies = await getTrendingMovies()
           if(movies) setTrendingMovies(movies)
  
        } catch (error) {
          console.log(error)
        }
      }
      fetchTrendingMovies()
    },[])
  
  

  return (
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
        <header className="sm:mt-10 mt-5">
          <img src="/hero-img.png" className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md" alt="hero image" />
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]">Find<span className="text-gradient"> Movies</span> You&apos;ll Enjoy Without The Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        {
          trendingMovies.length > 0 && (
            <section className="mt-20">
              <h2>Trending Movie</h2>
              <ul className="flex flex-row overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar">
                {
                  trendingMovies.map((movie,index) => (
                    <Link to={`movie/${movie.movie_id}`} key={movie.$id} className="min-w-[230px] flex flex-row items-center">
                      <p className="fancy-text mt-[22px] text-nowrap">{index +1}</p>
                      <img src={movie.poster_url} className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5" alt="movie poster" />
                    </Link>
                  ))
                }
              </ul>

            </section>
          )
        }
        <section className="space-y-9">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">All Movies</h2>

        {isLoading ? (<Loading />) : error ? (<p className="text-red-500">{error}</p>) : (
          <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
              movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))

            }
          </ul>
        )}
        {movies.length < 1 && <h2 className="text-center">No Movie Found</h2> }
      </section>

      <div className="mt-5 flex justify-end items-center gap-2.5">
          <button 
            className="w-20 p-2 border-indigo-900 border-2 text-white font-bold hover:border-indigo-500 hover:border-2" 
            onClick={()=>setMoviePage(prevMoviePage => prevMoviePage - 1)}>Prev</button>
          <button 
            className="w-20 p-2 border-indigo-900 border-2 text-white font-bold hover:border-indigo-500 hover:border-2" 
            onClick={()=>setMoviePage(prevMoviePage => prevMoviePage + 1)}>Next</button>
      </div>
      </div>
  )
}

export default Home