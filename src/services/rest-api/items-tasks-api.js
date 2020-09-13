/* 
  Класс для работы с сущностью Items Tasks 
  Наследует класс TasksApi.
  Требуется импорт actionTaskList из constants.js

  *****
  Доступные методы:

  createTaskItem({ githubId, taskId, data }) - создание подзадачи в задаче с id - taskId, аргументы метода передаются объектом
  editTaskItem({ githubId, taskId, data }) - редактирование подзадачи в задаче с id - taskId, редактируются только те поля которые переданны в data, 
    необходимо обязательно! передать в data поле id подзадачи по этому полю будет осуществлен поиск подзадачи, аргументы метода передаются объектом
  delTaskItem({ githubId, taskId, itemId }) - удаление подзадачи с id - itemId  задачи c id - taskId, аргументы метода передаются объектом
  
  Методы возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке 
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import TasksApi from './tasks-api';
import actionTaskList from './constants';

export default class ItemsTasksApi extends TasksApi {
  URL_BASE = '/tasks/';

  ACTION = actionTaskList.EDIT_TASK;

  async getTargetTask(taskId) {
    const response = await this.getTask(taskId);

    return response;
  }

  async createTaskItem({ githubId, taskId, data }) {
    const searchTask = await this.getTargetTask(taskId);

    if (searchTask.length === 0) {
      return {
        error: true,
        message: `Creation is impossible. No task found with id ${taskId}`,
      };
    }

    const task = this.arrToObj(searchTask);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to create items a task`,
      };
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
    const searchTask = await this.getTargetTask(taskId);

    if (searchTask.length === 0) {
      return {
        error: true,
        message: `No editing possible. No task found with id ${taskId}`,
      };
    }

    const task = this.arrToObj(searchTask);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to edit items a task`,
      };
    }

    const oldTaskItems = task.items;

    if (oldTaskItems.filter((item) => item.id === data.id).length === 0) {
      return {
        error: true,
        message: `No editing possible. No editable subtask id found`,
      };
    }

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
    const searchTask = await this.getTargetTask(taskId);

    if (searchTask.length === 0) {
      return {
        error: true,
        message: `Unable to delete. No task found with id ${taskId}`,
      };
    }

    const task = this.arrToObj(searchTask);

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: this.ACTION,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to delete items a task`,
      };
    }

    const oldTaskItems = task.items;
    const newTaskItems = oldTaskItems.filter((item) => item.id !== itemId);

    if (oldTaskItems.length === newTaskItems.length) {
      return {
        error: true,
        message: `Unable to delete. No editable subtask id found`,
      };
    }

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
