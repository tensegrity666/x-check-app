/* 
  Класс для работы с сущностью Tasks 
  Наследует класс AccessApi.
  Требуется импорт actionTaskList из constants.js
  Внимание, класс генерирует стандартный Error в случае возврата ошибок
  Необходимо предусмотреть перехват и обработку таких ошибок.
  *****
  Доступные методы:
  getTasksAll() - выводит все задачи, возвращает полные данные в виде массива объектов
  getTask(id) -  выводит задачу по id, возвращает полные данные в виде массива c одним объектом
  getTaskByAuthor(nameAuthor) - выводит все задачи созданные автором требуется передача в аргументе поля author,
    возвращает полные данные в виде массива объектов
  createTaskHeader({ githubId, data }) - создание карточки задачи, можно создавать как заголовок, 
    тогда необходимо в data передавать пустой массив items: []
    или можно передавать полные данный задачи с заполненным массивом items
    аргументы метода передаются объектом
  editTaskHeader({ githubId, taskId, data }) - редактирование карточки задачи, редактируются только те поля которые переданны в data, 
    аргументы метода передаются объектом
  delTask({ githubId, taskId }) - удаление задачи, удаляется полностью, аргументы метода передаются объектом
  toggleTaskState({
    githubId,     // пользователь 
    taskId,       // id задачи
    requiredState // enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_ARCHIVED, ARCHIVED_TO_PUBLISHED 
  }) - переключение статуса задачи DRAFT, PUBLISHED, ARCHIVED,
    Аргумент requiredState формализован и можем принимать только перечисленные значения. 

  Последние 4 метода возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке 
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

  // Cannot edit "state", "author" property, "state", "author" property is read-only
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

  /* 
    Нужна еше проверка на статус записи, невозможно перепрыгнуть через уровень
    Или реализовать это на клиенте, показывать возможный переход на статус.
    Аргумент requiredState формализован и можем принимать только перечисленные значения,

  */
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
