/* eslint-disable react/prop-types */

function Search({ searchTerm ,setSearchTerm }) {
  return (
    <div className="w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto">
        <div className="relative flex items-center">
            <img src="search.svg" className="absolute left-2 h-5 w-5" alt="search icon"/>
            <input 
                type="text" 
                className="w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
                placeholder="Search for a movie you want 🤪🤪"
                value={searchTerm}
                onChange={event => setSearchTerm(event.currentTarget.value)}
            />
        </div>
    </div>
  )
}

export default Search