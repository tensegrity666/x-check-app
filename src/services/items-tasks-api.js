/* 
  Класс для работы с сущностью Items Tasks 
  Наследует класс TasksApi.
  Требуется импорт actionTaskList из constants.js
*/

import TasksApi from './tasks-api';
import actionTaskList from './constants';

export default class ItemsTasksApi extends TasksApi {
  URL_BASE = '/tasks/';

  ACTION = actionTaskList.EDIT_TASK;

  async getTargetTask(taskId) {
    const response = await this.getTask(taskId);

    if (response.length === 0) {
      throw new Error(`No task found with id ${taskId}`);
    }

    const result = this.arrToObj(response);

    return result;
  }

  async createTaskItem({ githubId, taskId, data }) {
    const task = await this.getTargetTask(taskId);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to create items a task`;
    }

    const lastItemId = this.createId();
    const prefId = data.id;

    const newTaskItem = {
      ...data,
      id: `${prefId}${lastItemId}`,
    };

    const newItems = {
      items: [...task.items, newTaskItem],
    };

    const result = await this.patchResourse(
      `${this.URL_BASE}${taskId}`,
      newItems
    );

    return result;
  }

  async editTaskItem({ githubId, taskId, data }) {
    const task = await this.getTargetTask(taskId);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to edit items a task`;
    }

    const oldTaskItems = task.items;
    const newTaskItems = oldTaskItems.map((item) =>
      item.id === data.id ? data : item
    );

    const newItems = {
      items: [...newTaskItems],
    };

    const result = await this.patchResourse(
      `${this.URL_BASE}${taskId}`,
      newItems
    );

    return result;
  }

  async delTaskItem({ githubId, taskId, itemId }) {
    const task = await this.getTargetTask(taskId);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to delete items a task`;
    }

    const oldTaskItems = task.items;
    const newTaskItems = oldTaskItems.filter((item) => item.id !== itemId);

    const newItems = {
      items: [...newTaskItems],
    };

    const result = await this.patchResourse(
      `${this.URL_BASE}${taskId}`,
      newItems
    );

    return result;
  }
}
