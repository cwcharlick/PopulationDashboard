import React, { useState } from 'react';

export const AppContext = React.createContext({
  toolTip: {},
  setToolTip: () => {},
});

export const AppProvider = (props) => {
  const [toolTip, setToolTip] = useState(undefined);
  return (
    <AppContext.Provider value={{ toolTip, setToolTip }}>
      {props.children}
    </AppContext.Provider>
  );
};
