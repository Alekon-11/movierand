import {Component} from 'react';

import Header from '../header/Header';
import KinopoiskService from '../../services/KinopoiskService';

import "./app.scss";

class App extends Component {
    kinopoiskService = new KinopoiskService();
    // 479801
    componentDidMount(){
        // const max = 479801;
        const max = 1300;
        const min = 298;
        const randomId = +(Math.random() * (max - min) + min).toFixed();

        this.kinopoiskService.getOneMovie(randomId)
        .then(data => console.log(data));
    }

    render(){

        return (
            <div className="app">
                <Header />
            </div>
        )
    }
}

export default App;