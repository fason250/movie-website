/* eslint-disable react/prop-types */


function MovieCard({ movie }) {
    const { title,poster_path,release_date,adult,original_language,vote_average} = movie
    const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`

  return (
   <div className="movie-card">
        <img src={poster_path ? imageUrl : "No-Poster.png" } alt="movie thumbnail" />
        <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                {adult && <img className="w-6 h-6 object-cover md:ml-10 ml-1" src="adult-icon.png" />}
            </div>
        </div>
   </div>
  )
}

export default MovieCard