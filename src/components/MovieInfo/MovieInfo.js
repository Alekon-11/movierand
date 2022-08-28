import { useEffect, useState } from 'react';

import './movieInfo.scss';

import star from '../../resources/star.png';
import MovieDBService from '../../services/MovieDBService';

const MovieInfo = () => {
    const [movieInfo, setMovieInfo] = useState(0);
    const [error, setError] = useState(false);

    const movieDBService = new MovieDBService()

    useEffect(() => {
        onMovieLoading();
    },[])

    function onLoaded(data){
        setMovieInfo(data);
    }

    function onError(){
        setError(true);
    }

    function onMovieLoading(){
        const id = +(Math.random() * (1000 - 1) + 1).toFixed();

        movieDBService.getOneMovie(id)
        .then(res => {
            console.log(res);
            onLoaded(res);
        })
        .catch(onError);
    }

    return(
        <>
            {error ? <div className="error">Error</div> : <View movieInfo={movieInfo}/>}
        </>
    )
}

const View = (props) => {
    const {name, nameOrig, description, year, rate, poster, genres, filmLength, countries} = props.movieInfo;

    return(
        <div className="movie-info">
            <div className="movie-info__poster"><img src={poster} alt={name ? name : nameOrig} /></div>
            <h2 className="movie-info__name">{name ? name : nameOrig}</h2>
            <h4 className="movie-info__name-original">{nameOrig} / <span>{year}</span></h4>
            <h6 className="movie-info__countries">{countries ? countries.join(', ') : null}</h6>
            <div className="movie-info__genres">{ genres ? genres.join(', ') : null}</div>
            <div className="movie-info__length">{filmLength} мин.</div>
            <div className="movie-info__rate">
                <img src={star} alt="rate star" />
                {rate}
            </div>
            <p className="movie-info__description">{description ? description : 'Ууупс! Описание не найдено!'}</p>
        </div>
    )
}

export default MovieInfo;