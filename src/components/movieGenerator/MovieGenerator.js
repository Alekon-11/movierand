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
    const [range, setRange] = useState(false);
    const [userList, setUserList] = useState(false);

    const loading = spinner ? <Spinner /> : null;
    const content = !(spinner || error) ? <View movieInfo={movieInfo} /> : null;
    const errorMessage = error ? <ErrorBlock /> : null;

    useEffect(() => {
        onMovieLoading();
    },[]);

    function onValue(e){
        let value = +e.target.value.replace(/\D/ig,'');
        if(e.target.name === 'max'){
            setMax(+value);
            return;
        }
        if(e.target.name === 'min'){
            setMin(+value);
            return;
        }
    }

    function onChecked(e){
        if(e.target.name === 'range'){
            setRange(() => e.target.checked);
            return;
        }
        if(e.target.name === 'userList'){
            setUserList(() => e.target.checked);
            return;
        }
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
                           type="text" 
                           name="min"
                           disabled={!range} 
                           value={min}
                           maxLength="4"/>
                    <input className='input'
                           onChange={onValue} 
                           type="text" 
                           name="max"
                           disabled={!range} 
                           value={max}
                           maxLength="4"/>
                </div>
                <label className='check'>
                    <input className='check__input' onChange={onChecked} type="checkbox" name="range" checked={range}/>
                    <span className="check__box"></span>
                    Диапазон
                </label>
                <label className='check'>
                    <input className='check__input' onChange={onChecked} type="checkbox" name="userList" checked={userList}/>
                    <span className="check__box"></span>
                    Из вашего списка
                </label>
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