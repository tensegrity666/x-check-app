import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import taskReducer from './reducers/task-reducer';
import filterReducer from './reducers/filter-reducer';

const rootReducer = combineReducers({
  taskReducer,
  filterReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
