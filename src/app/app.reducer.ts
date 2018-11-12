export interface State {
    isLoading: boolean
}

const initialState: State = {
    isLoading: false
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING':
            // return a NEW state (state is immutable)
            return {
                isLoading: true
            };

        case 'STOP_LOADING':
            // return a NEW state (state is immutable)
            return {
                isLoading: false
            };
        default:
            //return the old state
            return state;
    }
}