import './skeleton.scss';

const Skeleton = () => {
    return (
    <div className="skeleton">
        <div className="skeleton__poster"></div>
        <div className="skeleton__name"></div>
        <div className="skeleton__name-original"></div>
        <div className="skeleton__countries"></div>
        <div className="skeleton__genres"></div>
        <div className="skeleton__length"></div>
        <div className="skeleton__rate"></div>
        <ul className="skeleton__description">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    )
}

export default Skeleton;