import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import taskReducer from './reducers/task-reducer';

const rootReducer = combineReducers({
  taskReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
