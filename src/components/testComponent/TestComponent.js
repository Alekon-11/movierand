import { useState, useEffect } from 'react';

import './testComponent.scss';

function TestComponent() {

    const [total, setTotal]= useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // useEffect(() => {
    //     console.log('total');
    //     document.title = total;
    // },[total]);

    function changeTotal(i){
        setTotal(total => total + i);
    }

    function changeAutoplay(){
        setAutoplay(autoplay => !autoplay);
    }

     return (
        <>
            <Container>
                <button onClick={changeAutoplay} className="test__btn">Autoplay</button>
                <div className="test__text">{autoplay ? 'on' : 'off'}</div>
            </Container>
          
            <Container>
                <button onClick={() => changeTotal(-1)} className="test__btn">-</button>
                <div className="test__text">{total}</div>
                <button onClick={() => changeTotal(1)} className="test__btn">+</button>
            </Container>
        </>
     )
}

function Container(props){
    return (
        <div className="test">
            {props.children}
        </div>
    )
}

export default TestComponent;