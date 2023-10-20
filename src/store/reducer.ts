import { combineReducers } from './utils';

const menu: GenericStateSliceReducer<MenuStateSlice, BaseReducerAction> = [
    (stateSlice, action) => {
        switch (action.type) {
            default:
                return stateSlice;
        }
    },
    { drawerVisible: false },
];

export default combineReducers({ menu });
