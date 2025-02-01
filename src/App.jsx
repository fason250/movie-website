import { useState , useEffect} from "react"
import Search from "./components/Search"
import axios from "axios"
import Loading from "./components/Loading"
import MovieCard from "./components/MovieCard"
import { useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from "./appwrite.js"
import Footer from "./components/Footer.jsx"

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY


function App(){
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


  return(
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/hero-img.png" alt="hero image" />
            <h1>Find<span className="text-gradient"> Movies</span> You&apos;ll Enjoy Without The Hassle</h1>
          </header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          {
            trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movie</h2>
                <ul>
                  {
                    trendingMovies.map((movie,index) => (
                      <li key={movie.$id}>
                        <p>{index +1}</p>
                        <img src={movie.poster_url} alt="movie poster" />
                      </li>
                    ))
                  }
                </ul>

              </section>
            )
          }
          <section className="all-movies">
            <h2>All Movies</h2>

          {isLoading ? (<Loading />) : error ? (<p className="text-red-500">{error}</p>) : (
            <ul>
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
            <button onClick={()=>setMoviePage(prevMoviePage => prevMoviePage - 1)}>Prev</button>
            <button onClick={()=>setMoviePage(prevMoviePage => prevMoviePage + 1)}>Next</button>
        </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default App