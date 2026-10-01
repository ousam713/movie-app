import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Spiner from "./components/spiner";
import Search from "./components/search";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./lib/appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [moviesList,setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [debounceSearchTerm, useDebounceSearchTerm] = useState('');
    const [trendingMovies, settrendingMovies] = useState([]);

    useDebounce( () => useDebounceSearchTerm(searchTerm), 750, [searchTerm] );

    const loadtrendingMovies = async () => {
        try{
            const movies = await getTrendingMovies();

            settrendingMovies(movies);
        } catch(err){
            console.log(`error trending fetching movie: ${err}`)
        }
    }

    useEffect( () => {
        const fetchMovies = async(query='') => {

            setIsLoading(true);
            setErrorMessage('');
            try{
                const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

                const response = await fetch(endpoint, API_OPTIONS);


                if(!response.ok){
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();

                if(data.response == 'False'){
                    setErrorMessage(data.error || 'Failed to fetch movies')
                    setMoviesList([]);
                    return;
                }

                setMoviesList(data.results || []);

                if(query && data.results.length > 0) {
                    await updateSearchCount(query, data.results[0]);
                }

            }catch(error){
                console.log(`error fetching movie: ${error}`)
                setErrorMessage(`Error fetching movies! Please try later.`);
            } finally{
                setIsLoading(false);
            }
        }

        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    useEffect( () => {
        loadtrendingMovies();
    }, []);

    return ( 
        <main>
            <div className="pattern">
                <div className="wrapper"></div>
                <header>
                    <img src="/hero.png" alt="hero" className="w-128"/>
                    <h1>Find <span className="text-gradient">movies</span> you enjoy without the hassle</h1>
                </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
                { trendingMovies.length > 0 && (
                    <section className="trending"> 
                        <h2> Trending movies </h2>

                        <ul>
                            {trendingMovies.map( (movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.searchTerm} />
                                </li>
                            ) )}
                        </ul>
                    </section>
                ) }
                


                <section className="all-movies">
                <h2>All movies</h2>

                    {isLoading ? (
                        <Spiner />
                    ): errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ): (
                        <ul>
                            {moviesList.map( (movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ) )}
                        </ul>
                    )}
                    
                </section> 
                {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
            </div>
        </main>
     );
}

export default App;