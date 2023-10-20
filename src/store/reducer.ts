import { combineReducers } from './utils';

const menu: GenericStateSliceReducer<MenuStateSlice, BaseReducerAction> = [
    (stateSlice, action) => {
        switch (action.type) {
            case 'TOGGLE_MENU_VISIBILITY':
                return {
                    ...stateSlice,
                    drawerVisible: !stateSlice.drawerVisible,
                };
            default:
                return stateSlice;
        }
    },
    { drawerVisible: false },
];

export default combineReducers({ menu });
