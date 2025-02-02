/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


function MovieCard({ movie }) {
    const { title,poster_path,release_date,adult,original_language,vote_average,id} = movie
    const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`

  return (
   <Link to={`movie/${id}`} className="bg-dark-100 p-5 rounded-2xl shadow-inner shadow-light-100/10">
        <img src={poster_path ? imageUrl : "No-Poster.png" } className="rounded-lg h-auto w-full" alt="movie thumbnail" />
        <div className="mt-4">
            <h3 className="text-white font-bold text-base line-clamp-1">{title}</h3>
            <div className="mt-2 flex flex-row items-center flex-wrap gap-2">
                <div className="flex flex-row items-center gap-1">
                    <img src="star.svg" className="size-4 object-contain" alt="star Icon" />
                    <p className="font-bold text-base text-white">{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span className="text-sm text-gray-100">•</span>
                <p className="capitalize text-gray-100 font-medium text-base">{original_language}</p>
                <p className="text-gray-100 font-medium text-base">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                {adult && <img className="w-6 h-6 object-cover md:ml-10 ml-1" src="adult-icon.png" />}
            </div>
        </div>
   </Link>
  )
}

export default MovieCard