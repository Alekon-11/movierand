import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';

import "./app.scss";

const App = () => {

    return (
        <div className="app">
            <Header />
            <div className="container">
                <MainPage />
            </div>
        </div>
    )

}

export default App;