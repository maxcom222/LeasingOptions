
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import siteReducers from 'reducers/reducers';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

const reducer = (state, action) => {
    if (action.type === HYDRATE) {

        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        // preserve count value on client side navigation
        if (state.stickerList) nextState.stickerList = state.stickerList
        if (state.headerToggle) nextState.headerToggle = state.headerToggle
        if (state.stepIndicator) nextState.stepIndicator = state.stepIndicator
        if (state.formData) nextState.formData = state.formData
        if (state.navigationStates) nextState.navigationStates = state.navigationStates
        if (state.garageData) nextState.garageData = state.garageData
        return nextState
    } else {
        return siteReducers(state, action)
    }
}

// create a makeStore function
const makeStore: MakeStore<any> = (context: Context) => createStore(reducer, composeWithDevTools());;

// export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, { debug: false });

export default wrapper;