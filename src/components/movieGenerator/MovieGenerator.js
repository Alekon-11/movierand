import { useEffect, useState } from 'react';

import MovieDBService from '../../services/MovieDBService';
import Spinner from '../spinner/Spinner';
import ErrorBlock from '../errorBlock/ErrorBlock';

import './movieGenerator.scss';

const MovieGenerator = (props) => {
    const movieDBService = new MovieDBService();

    const [movieInfo, setMovieInfo] = useState(0);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState(false);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(1000);
    const [range, setRange] = useState(false)

    const loading = spinner ? <Spinner /> : null;
    const content = !(spinner || error) ? <View movieInfo={movieInfo} /> : null;
    const errorMessage = error ? <ErrorBlock /> : null;

    useEffect(() => {
        onMovieLoading();
    },[]);

    function onValue(e){
        if(e.target.name === 'max'){
            setMax(+e.target.value);
            return;
        }
        if(e.target.name === 'min'){
            setMin(+e.target.value);
            return;
        }
    }

    function onCheckBox(e){
        setRange(() => e.target.checked);
    }

    function onLoaded({id, name}){
        setSpinner(false);
        setMovieInfo({id, name});
    }

    function onError(){
        setError(true);
        setSpinner(false);
    }

    function onMovieLoading(){
        const id = +(Math.random() * (max - min) + min).toFixed();

        setSpinner(true);
        setError(false);
        props.getMovieId(id);

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
            <div className="movie-generator__settings">
                <div className="movie-generator__inputs">
                    <input className='input'
                           onChange={onValue} 
                           type="number" 
                           name="min"
                           disabled={range} 
                           value={min}/>
                    <input className='input'
                           onChange={onValue} 
                           type="number" 
                           name="max"
                           disabled={range} 
                           value={max}/>
                </div>
                <input onChange={onCheckBox} type="checkbox" className='movie-generator__checkbox' name="range" />
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