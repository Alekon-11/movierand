import './header.scss'
import logo from '../../resources/movierand-logo-min.png';

const Header = ({onSwitchPage, page}) => {

    const listItemsData = [
        {name: 'main',label: 'Главная'},
        {name: 'listings',label: 'Списки'}
    ]

    let listItems = listItemsData.map(({name, label}) => {
        const active = page === name;
        const clazz = active ? "page-selected" : null;

        return (
            <li key={name} data-page={name} className={`header__page ${clazz}`} onClick={onSwitchPage}>
                <a href="#">{label}</a>
            </li>
        )
    })

    return(
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo"><img src={logo} alt="movierand logo"/></div>

                <nav className="header__nav">
                    <ul className="header__list">
                        {listItems}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;