import { useEffect, useState } from 'react';
import Movie from "../components/Movie";
import styles from "./Home.module.css";


function Home(){
    const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
    const json = await(await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_ration=8.8&sort_by=year`)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  
  useEffect(()=>{

  //fetch 대신에 요즘 async-await를 사용한다.
    /* 
    fetch(`https://yts.mx/api/v2/list_movies.json?minimum_ration=8.5&sort_by=year`)
    .then(response => {
      response.json()
      .then((json) => {
        setMovies(json.data.movies)
        setLoading(false);
      });
    }); 
    */

    getMovies();


  }, []);

  return (
    <div className={styles.container}>

      {
        loading ? (
                    <div className={styles.loader}>
                      <span>Loading...</span>
                    </div>
                  ) 
        : (
            <div className={styles.movies}>
              {movies.map((movie) => (
                <Movie 
                  key = {movie.id}
                  id = {movie.id}
                  year={movie.year}
                  coverImg = {movie.medium_cover_image} 
                  title = {movie.title} 
                  summary = {movie.summary} 
                  genres = {movie.genres} 
                />
              ))}
            </div>
          )
      }

    </div>
  );
};

export default Home;