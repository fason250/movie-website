/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
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

const CastCarousel = ( { movie_id }) => {
    const [ cast ,setCast ] = useState([])
    const [loading,setLoading] = useState(true)

    const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6, 
    slidesToScroll: 2,
    arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
    };
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits`

    useEffect(()=>{
        const fetchCast = async()=>{
            try {
                const { data } = await axios.get(url,options)
                setCast(data.cast)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchCast()
    },[movie_id,url])       


    const poster_url =`https://image.tmdb.org/t/p/w500/`
  return (
    <div className="w-full mx-auto ">
      <h2 className="text-xl text-light-100 font-semibold mb-4">Cast</h2>
    {
        loading ? <Loading /> : (
            <Slider {...settings}>
            {cast.map((actor, index) => (
              <div key={index} className="flex gap-1.5 flex-col items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
                  <img
                    src={`${poster_url}${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-100 text-sm text-left">{actor.name}</p>
              </div>
            ))}
          </Slider>
        )
    }
    </div>
  );
};

export default CastCarousel;
