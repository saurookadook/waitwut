import React, { useReducer } from 'react';

import { StateContext, DispatchContext } from 'common/contexts';
import combinedReducer from 'store/reducer';

// TODO: fix type - React.Provider<typeof StateContext>
const AppStateProvider = ({ children, initialState }: any): any => {
    const [combinedReducerFunc, combinedInitialState] = combinedReducer;

    const [state, dispatch] = useReducer(combinedReducerFunc, combinedInitialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default AppStateProvider;
