const menu = {
    reducer: (stateSlice: MenuStateSlice, action: BaseReducerAction) => {
        switch (action.type) {
            default:
                return stateSlice;
        }
    },
    initialStateSlice: { drawerVisible: false },
};

export { menu };
