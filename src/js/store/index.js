import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
    return store;
}
