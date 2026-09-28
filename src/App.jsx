import React, { useEffect, useState } from "react";
import Search from "./components/search";
import { applyStyles } from "@popperjs/core";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application.json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const fetchMovies = async() => {
        try{
            const endpoint = 
            `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            alert(response);
        }catch(error){
            console.log(`error fetching movie: ${error}`)
            setErrorMessage(`Error fetching movies! Please try later.`);
        }
    }

    useEffect( () => {
        fetchMovies();
    }, []);

    return ( 
        <main>
            <div className="pattern">
                <div className="wrapper"></div>
                <header>
                    <img src="/hero.png" alt="hero" />
                    <h1>Find <span className="text-gradient">movies</span> you enjoy without the hassle</h1>
                </header>
                
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <h1 className="text-white"> {searchTerm} </h1>

                <section className="all-movies"></section>
                <h2>All movies</h2>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </main>
     );
}

export default App;