import './header.scss'
import logo from '../../resources/movierand-logo.png';

const Header = () => {
    return(
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo"><img src={logo} alt="movierand logo"/></div>

                <nav className="header__nav">
                    <ul className="header__list">
                        <li className="header__page"><a href="#">Главная</a></li> 
                        <li className="header__page"><a href="#">Список</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;