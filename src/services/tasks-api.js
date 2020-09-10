/* 
  Класс для работы с сущностью Tasks 
  Наследует класс AccessApi.
  Требуется импорт actionTaskList из constants.js
*/

import AccessTasksApi from './access-tasks-api';
import actionTaskList from './constants';

export default class TasksApi extends AccessTasksApi {
  URL_BASE = '/tasks';

  async getTasksAll() {
    const result = await this.getResource(this.URL_BASE);

    return result;
  }

  async getTask(id) {
    const result = await this.getResource(`${this.URL_BASE}/?id=${id}`);

    return result;
  }

  async getTaskByAuthor(nameAuthor) {
    const result = await this.getResource(
      `${this.URL_BASE}/?author=${nameAuthor}`
    );

    return result;
  }

  async checkExistenceTask(taskId) {
    const response = await this.getTask(taskId);

    if (response.length === 0) {
      throw new Error(`No task found with id ${taskId}`);
    }

    return undefined;
  }

  async createTaskHeader({ githubId, data }) {
    const action = actionTaskList.CREATE_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      action,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to create a task`;
    }

    const lastTaskId = this.createId();
    const prefId = data.id;
    const newTaskHeader = {
      ...data,
      id: `${prefId}${lastTaskId}`,
    };

    const result = await this.sendResource(this.URL_BASE, newTaskHeader);

    return result;
  }

  // Cannot edit state property, state property is read-only
  async editTaskHeader({ githubId, taskId, data }) {
    this.checkExistenceTask(taskId);

    const action = actionTaskList.EDIT_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to edit a task`;
    }

    const result = await this.patchResourse(`${this.URL_BASE}/${taskId}`, data);

    return result;
  }

  // Нужна еше проверка на статус записи, невозможно перепрыгнуть через уровень
  // Или реализовать это на клиенте, показывать возможный переход на статус.
  async toggleTaskState({
    githubId,
    taskId,
    requiredState /* enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_ARCHIVED, ARCHIVED_TO_PUBLISHED */,
  }) {
    this.checkExistenceTask(taskId);

    const action = requiredState;
    let state = null;

    switch (requiredState) {
      case 'DRAFT_TO_PUBLISHED':
        state = 'PUBLISHED';
        break;
      case 'PUBLISHED_TO_DRAFT':
        state = 'DRAFT';
        break;
      case 'PUBLISHED_TO_ARCHIVED':
        state = 'ARCHIVED';
        break;
      case 'ARCHIVED_TO_PUBLISHED':
        state = 'PUBLISHED';
        break;
      default:
        break;
    }

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to toggled status a task`;
    }

    const result = await this.patchResourse(`${this.URL_BASE}/${taskId}`, {
      state,
    });

    return result;
  }

  async delTask({ githubId, taskId }) {
    this.checkExistenceTask(taskId);

    const action = actionTaskList.DELETE_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action,
    });

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to delete a task`;
    }

    const result = await this.delResourse(`${this.URL_BASE}/${taskId}`);

    return result;
  }
}
