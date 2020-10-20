import { actionTypes } from '../constants';
import { TasksApi } from '../../services/rest-api';
import { receiveApiErrorResponse } from './error-actions';

const {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_ONE_TASK_SUCCESS,
} = actionTypes;
const api = new TasksApi();

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasksList) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasksList,
});

export const fetchOneTaskSuccess = (taskData) => ({
  type: FETCH_ONE_TASK_SUCCESS,
  payload: taskData,
});

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(fetchTasksRequest());
    const result = await api.getTasksAll();
    dispatch(fetchTasksSuccess(result));
  } catch (error) {
    dispatch(receiveApiErrorResponse(error));
  }
};

export const fetchTaskById = (taskId) => async (dispatch) => {
  try {
    dispatch(fetchTasksRequest());
    const [result] = await api.getTask(taskId);
    dispatch(fetchOneTaskSuccess(result));
  } catch (error) {
    dispatch(receiveApiErrorResponse(error));
  }
};
