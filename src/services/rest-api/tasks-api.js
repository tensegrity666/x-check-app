/* 
  Класс для работы с сущностью Tasks 
  Наследует класс AccessApi.
  Требуется импорт actionTaskList из constants.js
  
  *****
  Доступные методы:
  getTasksAll() - выводит все задачи, возвращает полные данные в виде массива объектов
  
  getTask(id) -  выводит задачу по id, возвращает полные данные в виде массива c одним объектом
  
  getTaskByAuthor(nameAuthor) - выводит все задачи созданные автором, требуется передача в аргументе поля author,
    возвращает полные данные в виде массива объектов

  async getTaskByStateNoDraft() - возвращает задачи в статусе отличном от статуса DRAFT

  async getTaskByStateDraft() - возвращает задачи в статусе DRAFT

  createTaskHeader({ githubId, data }) - создание карточки задачи, можно создавать как заголовок задачи, 
    тогда необходимо в объект data поля заголовка задачи и передавать пустой массив items: []
    {
      author: 'name',
      args: empty,
      ...
      items: [] 
    }
    или можно передавать полные данные задачи в объект data с заполненным массивом items 
    {
      author: 'name',
      args: empty,
      ...
      items: [
        {...},
        {...}
      ] 
    }
    аргументы метода передаются объектом!
  
    editTaskHeader({ githubId, taskId, data }) - редактирование карточки задачи, редактируются только те поля которые переданы в объект data,
    если для редактирования items пользуются этим методом, то массив items нужно передавать полностью, т.е. не только изменяемую запись, 
    но и все записи которые там были. Для удаления всех items, можно передать объект дата с пустым массивом {items: []} 
    аргументы метода передаются объектом!
  
    delTask({ githubId, taskId }) - удаление задачи, удаляется полностью, аргументы метода передаются объектом!
  
    toggleTaskState({
    githubId,     // пользователь 
    taskId,       // id задачи
    requiredState // enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_ARCHIVED, ARCHIVED_TO_PUBLISHED 
  }) - переключение статуса задачи DRAFT, PUBLISHED, ARCHIVED,
    Аргумент requiredState формализован и можем принимать только перечисленные значения. 

  Последние 4 метода возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import AccessTasksApi from './access-tasks-api';
import { actionTaskList, addrList } from './constants';

const { URL_BASE_TASK } = addrList;

export default class TasksApi extends AccessTasksApi {
  setState = (requiredState) => {
    switch (requiredState) {
      case 'DRAFT_TO_PUBLISHED':
        return 'PUBLISHED';
      case 'PUBLISHED_TO_DRAFT':
        return 'DRAFT';
      case 'PUBLISHED_TO_ARCHIVED':
        return 'ARCHIVED';
      case 'ARCHIVED_TO_PUBLISHED':
        return 'PUBLISHED';
      default:
        return null;
    }
  };

  async getTasksAll() {
    const result = await this.getResource(URL_BASE_TASK);

    return result;
  }

  async getTask(id) {
    const result = await this.getResource(`${URL_BASE_TASK}/?id=${id}`);

    return result;
  }

  async getTaskByAuthor(nameAuthor) {
    const result = await this.getResource(
      `${URL_BASE_TASK}/?author=${nameAuthor}`
    );

    return result;
  }

  async getTaskByStateNoDraft() {
    const result = await this.getResource(`${URL_BASE_TASK}/?state_ne=DRAFT`);

    return result;
  }

  async getTaskByStateDraft() {
    const result = await this.getResource(`${URL_BASE_TASK}/?state=DRAFT`);

    return result;
  }

  async createTaskHeader({ githubId, data }) {
    const { id: prefId = 'simple-task-' } = data;
    const action = actionTaskList.CREATE_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to create a task`,
      };
    }

    const lastTaskId = this.createId();
    const newTaskHeader = {
      ...data,
      id: `${prefId}${lastTaskId}`,
      state: 'DRAFT',
      dateOfCreate: new Date().toLocaleDateString(),
    };

    const result = await this.sendResource(URL_BASE_TASK, newTaskHeader);

    return result;
  }

  async editTaskHeader({ githubId, taskId = null, data }) {
    if (!taskId) {
      return {
        error: true,
        message: `No editing possible. No task found with id "${taskId}"`,
      };
    }

    const action = actionTaskList.EDIT_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to edit a task`,
      };
    }

    const result = await this.patchResourse(`${URL_BASE_TASK}/${taskId}`, data);

    return result;
  }

  async toggleTaskState({
    githubId,
    taskId = null,
    requiredState /* enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_ARCHIVED, ARCHIVED_TO_PUBLISHED */,
  }) {
    if (!taskId) {
      return {
        error: true,
        message: `No editing possible. No task found with id "${taskId}"`,
      };
    }

    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action: requiredState,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to toggled status a task`,
      };
    }

    const state = this.setState(requiredState);

    if (state === null) {
      return {
        error: true,
        message: `Unable to change status, unknown status "${state}" a task "${taskId}"`,
      };
    }

    const result = await this.patchResourse(`${URL_BASE_TASK}/${taskId}`, {
      state,
    });

    return result;
  }

  async delTask({ githubId, taskId = null }) {
    if (!taskId) {
      return {
        error: true,
        message: `Unable to delete. No task found with id "${taskId}"`,
      };
    }

    const action = actionTaskList.DELETE_TASK;
    const accessCheck = await this.userAccessTasksCheck({
      githubId,
      taskId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to delete a task`,
      };
    }

    const result = await this.delResourse(`${URL_BASE_TASK}/${taskId}`);

    return result;
  }
}
