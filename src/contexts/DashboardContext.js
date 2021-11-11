import React, {useState} from 'react';

export const DashboardContext = React.createContext({year:{}, setYear:()=>{}, toolTip:{}, setToolTip:()=>{}});

export const DashboardProvider = (props) => {
    const [year, setYear] = useState({selected: 2020, hover: undefined});
    const [toolTip, setToolTip] = useState(undefined);
    return (<DashboardContext.Provider value={{year, setYear, toolTip, setToolTip}}>
        {props.children}
    </DashboardContext.Provider>);
}
