import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task-reducer';
import filterReducer from './reducers/filter-reducer';
import loginReducer from './reducers/login-reducer';
import reviewRequestsReducer from './reducers/review-requests-reducer';

const rootReducer = combineReducers({
  taskReducer,
  filterReducer,
  loginReducer,
  reviewRequestsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
