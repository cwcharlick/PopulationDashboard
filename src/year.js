import React, {useState} from 'react';

export const YearContext = React.createContext([{}, ()=>{}]);

export const YearProvider = (props) => {
    const [year, setYear] = useState({selected: 2020, hover: undefined});
    return (<YearContext.Provider value={[year, setYear]}>
        {props.children}
    </YearContext.Provider>);
}