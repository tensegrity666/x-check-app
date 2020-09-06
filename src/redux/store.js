import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/task-reducer';

const rootReducer = combineReducers({
  taskReducer,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(rootReducer, composeEnhancers());
/* eslint-enable */

export default store;
