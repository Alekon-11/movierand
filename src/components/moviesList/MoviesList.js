import { useState } from 'react';

import './moviesList.scss';

const MoviesList = () => {
    const [value, setValue] = useState('');

    function onSetMovieItem(e) {
        e.preventDefault();

        if(!value){
            return;
        }


    }

    function onSetValue(e) {
        setValue(e.target.value);
    }

    return (
        <div className="listings-page__movies">
            <View />
            <span className="listings-page__total">Всего: 129</span>
            <form action="#" className="form" onSubmit={onSetMovieItem}>
                <input type="text" 
                       className="input" 
                       placeholder='Введите название..' 
                       onChange={onSetValue}
                       value={value}/>
                <button type='submit' className="btn">Добавить</button>
            </form>
        </div>
    )
}

const View = () => {
    return (
        <ul>
            <li className="listings-page__movies-item">
                Название фильма бла бла бла бла бла 2022 год
                <button className="close-btn"></button>
            </li>
            <li className="listings-page__movies-item">
                Название фильма бла бла бла бла бла 2022 год
                <button className="close-btn"></button>
            </li>
            <li className="listings-page__movies-item">
                Название фильма бла бла бла бла бла 2022 год
                <button className="close-btn"></button>
            </li>
            <li className="listings-page__movies-item">
                Название фильма бла бла бла бла бла 2022 год
                <button className="close-btn"></button>
            </li>
        </ul>
    )
}

export default MoviesList;