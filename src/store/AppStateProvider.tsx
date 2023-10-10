import * as React from 'react';

import { StateContext, DispatchContext } from 'common/contexts';
import { menu } from 'store/reducer';

// TODO: fix type - React.Provider<typeof StateContext>
const Provider = ({ children }: any): any => {
    const [state, dispatch] = React.useReducer(menu.reducer, menu.initialStateSlice);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default Provider;
