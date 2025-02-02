import { useNavigate, useParams } from "react-router-dom"
import {  PlayCircle,ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../src/components/Loading"
import CastCarousel from "../src/components/CastCarousel"
import SimilarMoviesCarousel from "../src/components/SimilarMovies"


const options ={
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    }
}

const MovieDetail = () => {
    const [movie , setMovie ] = useState({})
    const [ loading,setLoading] = useState(true)
    const { movie_id } = useParams()
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`
    const navigate = useNavigate()

  useEffect(()=>{
    const fetchMovie = async()=>{
        try {
            const { data } = await axios.get(url,options)
            if(!data ) throw new Error("failed to fetch movie")
            setMovie(data)
            window.scroll(0,0)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    fetchMovie()
  },[movie_id])

console.log(movie)
  const poster_url =`https://image.tmdb.org/t/p/w500/`
  return  loading ? <Loading /> : (
    <div className="min-h-screen bg-primary text-white" >
        <div className="relative w-full h-[50vh] bg-cover bg-no-repeat bg-top" style={{ backgroundImage: `url(${poster_url}${movie.backdrop_path})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent"></div>
        </div>
        <button  onClick={()=> navigate("/")} className="flex outline-0 items-center bg-primary z-10 p-2 rounded-2xl font-bold hover:text-white mb-4 absolute top-1.5 left-1.5">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>

        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <img src={`${poster_url}${movie.poster_path}`} alt={movie.title} className="w-full h-auto md:h-[80%] md:object-contain rounded-lg shadow-lg"/>

            <div className="md:col-span-2">
            <h1 className="text-4xl font-bold">{movie.title} </h1>
            <div className="flex items-center space-x-4 text-gray-300 mt-2">
                <p>{movie?.duration || "2h 45m"}</p>
                <p className="flex items-center justify-center space-x-1">
                <img src="/star.svg" className="w-5 h-5" alt="star" />
                <span className="text-yellow-400 font-bold">{movie.vote_average ? movie.vote_average.toFixed(1) : ""}</span>
                </p>
            </div>
            <p className="mt-4 text-gray-400">{movie.overview}</p>

            <div className="mt-4 flex flex-wrap gap-2">
                {
                    movie.genres ?(
                        movie.genres.map(genre=>(
                            <span  key={genre.id} className="px-3 py-1 text-sm bg-[#0f0d23] rounded-full">{genre.name}</span>
                        )) ) : ""
                }
            </div>

            <p className="mt-4 text-gray-300">
                <span className="font-semibold">Director:</span> jey fason
            </p>
            <div className="mt-1 text-gray-300 flex flex-col gap-2">
                <CastCarousel movie_id={movie_id}/>
            </div>

            <button className="mt-6 flex items-center bg-[#a8b5db] text-black px-4 py-2 rounded-lg hover:bg-[#cecefb]">
                <PlayCircle className="w-6 h-6 mr-2" /> Watch Trailer
            </button>
            </div>
        </div>
        <SimilarMoviesCarousel movie_id={movie_id}/>
    </div>
  )
}

export default MovieDetail
