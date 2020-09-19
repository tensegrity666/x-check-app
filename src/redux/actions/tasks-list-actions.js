import { actionTypes } from '../constants';
import { TasksApi } from '../../services/rest-api';

const { FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS } = actionTypes;
const api = new TasksApi();

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasksList) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasksList,
});

export const fetchTasks = () => (dispatch) => {
  dispatch(fetchTasksRequest());
  api.getTasksAll().then((result) => dispatch(fetchTasksSuccess(result)));
};
