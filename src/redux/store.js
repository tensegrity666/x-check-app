import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  taskReducer,
});

const store = createStore(rootReducer);

export default store;
