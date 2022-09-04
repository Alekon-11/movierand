import './header.scss'
import logo from '../../resources/movierand-logo-min.png';

const Header = ({onSwitchPage}) => {
    return(
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo"><img src={logo} alt="movierand logo"/></div>

                <nav className="header__nav">
                    <ul className="header__list">
                        <li data-page='main' className="header__page" onClick={onSwitchPage}>
                            <a href="#">Главная</a>
                        </li> 
                        <li data-page='listings' className="header__page" onClick={onSwitchPage}>
                            <a href="#">Списки</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;