import {Component} from 'react';

import Header from '../header/Header';
import KinopoiskService from '../../services/KinopoiskService';

import "./app.scss";

class App extends Component {
    kinopoiskService = new KinopoiskService();

    componentDidMount(){
        this.kinopoiskService.getAllMovie()
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