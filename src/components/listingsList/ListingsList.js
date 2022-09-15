import { useState } from 'react';

import './listingsList.scss';

const ListingsList = ({data, selected, setData, setSelected}) => {
    const [value, setValue] = useState('');
    const [listId, setListId] = useState(1);

    function onSetValue(e){
        setValue(e.target.value);
    }

    function onDelete(id){
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    }

    function onCreateList(e){
        e.preventDefault();
        if(!value){
            return;
        }

        const newItem = {
            name: value,
            id: listId,
            movies: {}
        };

        setListId(id => ++id + +(Math.random() * 10).toFixed());
        setData( data => [...data, newItem] );
        setValue('');
    }

    return (
        <aside className="listings-page__listings">
            <View data={data} onDelete={onDelete} setSelected={setSelected} selected={selected}/>
            <form action="#" className="form" onSubmit={onCreateList}>
                <input type="text" 
                        className="input" 
                        placeholder="Введите название.."
                        onChange={onSetValue} 
                        value={value}/>
                <button type="submit" className="btn">Создать</button>
            </form>
        </aside>
    )
}

export default ListingsList;

const View = ({data, onDelete, setSelected, selected}) => {
    return (
        <ul>
            {
                data.map(({id, name}, num) => {
                    const active = selected === id;
                    const clazz = active ? 'listings-page__listings-item selected' : 'listings-page__listings-item';

                    return (
                        <li key={id} onClick={() => setSelected(id)} tabIndex={num + 1} className={clazz}>
                            {name}
                            <button onClick={() => onDelete(id)}  tabIndex={num + 1} className="close-btn"></button>
                        </li>
                    )
                })
            }
        </ul>
    )
}