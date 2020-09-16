/* 
  Класс для работы с сущностью Tasks 
  Наследует класс AccessApi.
  Требуется импорт actionTaskList из constants.js
  
  *****
  Доступные методы:
  getRevReqAll() - выводит все запросы на ревью, возвращает полные данные в виде массива объектов
  
  getRevReq(id) -  выводит запрос на ревью по id, возвращает полные данные в виде массива c одним объектом
  
  getRevReqByAuthor(nameAuthor) - выводит все запросы на ревью созданные автором, требуется передача в аргументе поля author,
    возвращает полные данные в виде массива объектов
  
  createRevReq({ githubId, data }) - создание запроса на ревью, аргументы метода передаются объектом!
    СТРУКТУРА объекта в параметре data:
    {
      id: "rev-req-", // префикс id 
      crossCheckSessionId: null, // or id cross-check-session for example "rss2020Q3react-xcheck"
      author: githubId, // пользователь Внимание! Обязательное поле!
      task: taskId, // id задачи Внимание! Обязательное поле!
      url_pr: 'https://github...', // ссылка на пулл реквест
      url_deploy: 'https://app...', // ссылка на деплой
      selfGrade: { // в этот объект передаются id пунктов задачи, самооценка и коментарий студента
        basic_p1: {score: 20, comment: "Well done!"},
        extra_p1: {score: 15, comment: "Some things are done, some are not"},
        fines_p1: {score: 0, comment: "No ticket today"},
      }
    }

  editRevReq({ githubId, revReqId, data }) - редактирование запроса на ревью, редактируются только те поля которые переданны в data, 
    аргументы метода передаются объектом!

  delRevReq({ githubId, revReqId }) - удаление запроса на ревью, удаляется полностью, аргументы метода передаются объектом!
  
  toggleRevReqState({
    githubId,     // пользователь 
    revReqId,       // id задачи
    requiredState // enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_COMPLETED, COMPLETED_TO_PUBLISHED 
  }) - переключение статуса запроса на ревью DRAFT, PUBLISHED, COMPLETED,
    Аргумент requiredState формализован и можем принимать только перечисленные значения. 

  Последние 4 метода возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import AccessRevReqApi from './access-rev-req-api';
import { actionRevReqList } from './constants';

export default class RevReqApi extends AccessRevReqApi {
  URL_BASE = '/reviewRequests';

  async getRevReqAll() {
    const result = await this.getResource(this.URL_BASE);

    return result;
  }

  async getRevReq(id) {
    const result = await this.getResource(`${this.URL_BASE}/?id=${id}`);

    return result;
  }

  async getRevReqByAuthor(nameAuthor) {
    const result = await this.getResource(
      `${this.URL_BASE}/?author=${nameAuthor}`
    );

    return result;
  }

  async checkExistenceRevReq(revReqId) {
    const isRevReq = await this.getRevReq(revReqId);

    return isRevReq.length > 0;
  }

  async createRevReq({ githubId, data }) {
    const action = actionRevReqList.CREATE_REVREQ;
    const accessCheck = await this.userAccessRevReqCheck({
      githubId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to create a review request`,
      };
    }

    const lastTaskId = this.createId();
    const prefId = data.id;
    const newRevReq = {
      ...data,
      id: `${prefId}${lastTaskId}`,
      state: 'DRAFT',
    };

    const result = await this.sendResource(this.URL_BASE, newRevReq);

    return result;
  }

  async editRevReq({ githubId, revReqId, data }) {
    const revReqCheck = await this.checkExistenceRevReq(revReqId);

    if (!revReqCheck) {
      return {
        error: true,
        message: `No editing possible. No review request found with id ${revReqId}`,
      };
    }

    const action = actionRevReqList.EDIT_REVREQ;
    const accessCheck = await this.userAccessRevReqCheck({
      githubId,
      revReqId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to edit a review request`,
      };
    }

    const result = await this.patchResourse(
      `${this.URL_BASE}/${revReqId}`,
      data
    );

    return result;
  }

  async toggleRevReqState({
    githubId,
    revReqId,
    requiredState /* enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_COMPLETED, COMPLETED_TO_PUBLISHED */,
  }) {
    const revReqCheck = await this.checkExistenceRevReq(revReqId);

    if (!revReqCheck) {
      return {
        error: true,
        message: `No toggled status possible. No review request found with id ${revReqId}`,
      };
    }

    const action = requiredState;
    let state = null;

    switch (requiredState) {
      case 'DRAFT_TO_PUBLISHED':
        state = 'PUBLISHED';
        break;
      case 'PUBLISHED_TO_DRAFT':
        state = 'DRAFT';
        break;
      case 'PUBLISHED_TO_COMPLETED':
        state = 'COMPLETED';
        break;
      case 'COMPLETED_TO_PUBLISHED':
        state = 'PUBLISHED';
        break;
      default:
        break;
    }

    const accessCheck = await this.userAccessRevReqCheck({
      githubId,
      revReqId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to toggled status a review request`,
      };
    }

    const result = await this.patchResourse(`${this.URL_BASE}/${revReqId}`, {
      state,
    });

    return result;
  }

  async delRevReq({ githubId, revReqId }) {
    const revReqCheck = await this.checkExistenceRevReq(revReqId);

    if (!revReqCheck) {
      return {
        error: true,
        message: `Unable to delete. No review request found with id ${revReqId}`,
      };
    }

    const action = actionRevReqList.DELETE_REVREQ;
    const accessCheck = await this.userAccessRevReqCheck({
      githubId,
      revReqId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to delete a review request`,
      };
    }

    const result = await this.delResourse(`${this.URL_BASE}/${revReqId}`);

    return result;
  }
}