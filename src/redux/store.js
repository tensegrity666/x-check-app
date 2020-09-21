import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task-reducer';
import filterReducer from './reducers/filter-reducer';
import loginReducer from './reducers/login-reducer';
import reviewRequestsReducer from './reducers/review-requests-reducer';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils';

const rootReducer = combineReducers({
  taskReducer,
  filterReducer,
  loginReducer,
  reviewRequestsReducer,
});

const persistedState = loadStateFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveStateToLocalStorage(store.getState().loginReducer);
});

export default store;
