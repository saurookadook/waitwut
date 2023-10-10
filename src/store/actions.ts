import * as React from 'react';

interface BaseActionArgs {
    dispatch: React.Dispatch<BaseReducerAction>;
}

export const toggleMenuDrawer = ({ dispatch }: BaseActionArgs): void => dispatch({ type: 'TOGGLE_MENU_VISIBILITY' });
