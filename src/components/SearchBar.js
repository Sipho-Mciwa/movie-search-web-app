import './SearchBar.css';

export default function SearchBar({getMovies}) {
    return (<>
        <div className="search-bar-container">
            <input placeholder="Search For Movie"></input>
            <button onClick={getMovies}>Search</button>
        </div>
    </>);
}