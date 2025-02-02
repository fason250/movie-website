/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";


const options ={
    params:{
        language: 'en-US'
    },
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    }
}

const SimilarMoviesCarousel = ({ movie_id }) => {

    const [movies,setMovies] = useState([])
    const [loading,setLoading] = useState(true)

    const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`

    useEffect(()=>{
        const fetchMovies = async()=>{
            try {
                const { data } = await axios.get(url,options)
                setMovies(data.results)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchMovies()
    },[movie_id])



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Adjust based on screen size
    slidesToScroll: 2,
    arrows: false, // Hides navigation buttons
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const poster_url =`https://image.tmdb.org/t/p/w500/`

  return (
    <div className="w-full mb-10 px-4 lg:px-20">
      <h2 className="text-xl text-light-100 font-semibold mb-4">Similar Movies</h2>
     {
        loading ? <Loading /> : (
            <Slider {...settings}>
            {movies.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} key={index} className="flex flex-col gap-0.5 items-center">
                <div className="w-32 md:w-45 md:mr-2 h-48 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={`${poster_url}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                  />
                </div>
                <p className="mt-2 w-[80%] text-gray-100 text-sm text-left line-clamp-1">{movie.title}</p>
              </Link>
            ))}
          </Slider>
        )
     }
    </div>
  );
};

export default SimilarMoviesCarousel;
