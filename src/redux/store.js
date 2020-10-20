import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task-reducer';
import tasksListReducer from './reducers/tasks-list-reducer';
import filterReducer from './reducers/filter-reducer';
import loginReducer from './reducers/login-reducer';

import selfGradeReducer from './reducers/self-grade-reducer';

import reviewRequestsReducer from './reducers/review-requests-reducer';
import crossCheckSessionReducer from './reducers/cross-check-session-reducer';
import reviewReducer from './reducers/review-reducer';
import errorsReducer from './reducers/errors-reducer';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '../utils';

const rootReducer = combineReducers({
  taskReducer,
  tasksListReducer,
  filterReducer,
  loginReducer,
  selfGradeReducer,

  reviewRequestsReducer,
  crossCheckSessionReducer,
  reviewReducer,
  errorsReducer,
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
