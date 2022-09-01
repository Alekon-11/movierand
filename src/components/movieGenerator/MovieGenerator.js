import { useEffect, useState } from 'react';

import MovieDBService from '../../services/MovieDBService';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';

import './movieGenerator.scss';

const MovieGenerator = ({setMovieId}) => {
    const movieDBService = new MovieDBService();

    const [movieInfo, setMovieInfo] = useState(0);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);

    const loading = spinner ? <Spinner /> : null;
    const content = !(spinner || error) ? <View movieInfo={movieInfo} /> : null;
    const errorMessage = error ? <ErrorBlock /> : null;

    useEffect(() => {
        onMovieLoading();
    },[]);

    function onLoaded(data){
        setSpinner(false);
        setMovieInfo(data);

        setMovieId(data.id);
    }

    function onError(){
        setError(true);
        setSpinner(false);
    }

    function onMovieLoading(){
        const id = +(Math.random() * (1000 - 1) + 1).toFixed();
        setSpinner(true);
        setError(false);

        movieDBService.getOneMovie(id)
        .then(onLoaded)
        .catch(onError);
    }
    return (
        <div className="movie-generator">
            <div className="movie-generator__info">
                {loading}
                {content}
                {errorMessage}
            </div>
            <button onClick={onMovieLoading} className="btn">сгенерировать</button>
        </div>
    )
}

const View = ({movieInfo}) => {
    const {name, id} = movieInfo;

    return (
        <>
            <div className="movie-generator__name">{name}</div>
            <div className="movie-generator__number">{id}</div>
        </>
    )
}

export default MovieGenerator;