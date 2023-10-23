import * as React from 'react';

import { actionTypes } from 'common/constants';

interface BaseActionArgs {
    dispatch: React.Dispatch<BaseReducerAction>;
}

export const toggleMenuDrawer = ({ dispatch }: BaseActionArgs): void => {
    return dispatch({ type: actionTypes.TOGGLE_MENU_VISIBILITY });
};

export const closeMenuDrawer = ({ dispatch }: BaseActionArgs): void => {
    return dispatch({ type: actionTypes.CLOSE_MENU });
};
