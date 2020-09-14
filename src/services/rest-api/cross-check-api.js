/* 
  Класс для работы с сущностью CrossCheckSession
  Наследует класс AccessCCSessionApi.
  Требуется импорт actionCCSessionCheckList из constants.js
  
  *****
  Доступные методы:
  getCCSessionAll() - выводит все кросс-чек-сессии, возвращает полные данные в виде массива объектов
  
  getCCSession(id) -  выводит кросс-чек-сессию по id, возвращает полные данные в виде массива c одним объектом
  
  getCCSessionAttendees(ccSessionId) - выводит значение свойства attendees кросс-чек-сессии, требуется передача в аргументе id сессии,
    возвращает полные данные в виде массива объектов
  
  createCCSession({ githubId, data }) - создание кросс-чек-сессии, аргументы метода передаются объектом!
    СТРУКТУРА объекта в параметре data:
    {
      id: ccSessionId,            // Обязательное поле! Задается пользователем при создании кросс-чек сессии, должно быть уникальным
      taskId: "simple-task-v1",   // Обязательное поле! ID задачи на которую открывается кросс-чек сессия
      coefficient: 0.7,           // Обязательное поле! Коэфициент оценки
      startDate: "2020-07-07",    // Начало кросс-чек сессии
      endDate: "2020-07-14",      // Окончание сессии
      discardMinScore: true,     
      discardMaxScore: false,    
      minReiewsAmount: 1,        
      desiredReviewersAmount: 2, 
      attendees: []               // Обязательное поле! При создании Draf передается пустой массив
    }
    при вызове метода проводятся проверки на уникальность id сессии, на пустое поле id и taskId, роли пользователя 

  editCCSession({ githubId, ccSessionId, data }) - редактирование кросс-чек-сессии, редактируются только те поля которые переданны в data, 
    аргументы метода передаются объектом!
    Можно передавать только attendees: [{...}, {...}] после определения пар кросс-чека.
    Структура объекта в массива attendees: [] 
      {
        githubId: "ButterBrot777", // Обязательное поле!
        reviewerOf: [               // Обязательное поле!
          "torvalds",
          "cardamo"
        ]
      }

  delCCSession({ githubId, ccSessionId }) - удаление кросс-чек-сессии, удаляется полностью, аргументы метода передаются объектом!
  
  async toggleCCSessionState({
    githubId,
    ccSessionId,
    requiredState // enum DRAFT_TO_REQUESTS_GATHERING, REQUESTS_GATHERING_TO_CROSS_CHECK, CROSS_CHECK_TO_COMPLETED,
  }) - переключение статуса DRAFT, REQUESTS_GATHERING, CROSS_CHECK, COMPLETED,
    Аргумент requiredState формализован и можем принимать только перечисленные значения. 

  Последние 4 метода возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import AccessCCSessionApi from './access-cross-check-api';
import { actionCCSessionCheckList } from './constants';

export default class CCSessionApi extends AccessCCSessionApi {
  URL_BASE = '/crossCheckSessions';

  async getCCSessionAll() {
    const result = await this.getResource(this.URL_BASE);

    return result;
  }

  async getCCSession(id) {
    const result = await this.getResource(`${this.URL_BASE}/?id=${id}`);

    return result;
  }

  async getCCSessionAttendees(ccSessionId) {
    const searchCCSession = await this.getCCSession(ccSessionId);

    if (searchCCSession.length === 0) {
      return {
        error: true,
        message: `Can't show list of Attendees. No cross-check-session found with id ${ccSessionId}`,
      };
    }

    const ccSession = this.arrToObj(searchCCSession);

    return ccSession.attendees;
  }

  async checkExistenceCCSession(ccSessionId) {
    const isCCSession = await this.getCCSession(ccSessionId);

    return isCCSession.length > 0;
  }

  async createCCSession({ githubId, data }) {
    const { id, taskId } = data;

    if (!taskId) {
      return {
        error: true,
        message: `No creating possible. Property taskId not found!`,
      };
    }

    if (!id) {
      return {
        error: true,
        message: `No creating possible. Cross-check-session id not specified!`,
      };
    }

    const ccSessionCheck = await this.checkExistenceCCSession(id);

    if (ccSessionCheck) {
      return {
        error: true,
        message: `No creating possible. Found a cross-check-session with this id ${id}`,
      };
    }

    const action = actionCCSessionCheckList.CREATE_CROSSCHECK;
    const accessCheck = await this.userAccessCCSessionCheck({
      githubId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to create a cross-check-session`,
      };
    }

    const newCCSession = {
      ...data,
      state: 'DRAFT',
    };

    const result = await this.sendResource(this.URL_BASE, newCCSession);

    return result;
  }

  async editCCSession({ githubId, ccSessionId, data }) {
    const ccSessionCheck = await this.checkExistenceCCSession(ccSessionId);

    if (!ccSessionCheck) {
      return {
        error: true,
        message: `No editing possible. No cross-check-session found with id ${ccSessionId}`,
      };
    }

    const action = actionCCSessionCheckList.EDIT_CROSSCHECK;
    const accessCheck = await this.userAccessCCSessionCheck({
      githubId,
      ccSessionId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to edit a cross-check-session`,
      };
    }

    const result = await this.patchResourse(
      `${this.URL_BASE}/${ccSessionId}`,
      data
    );

    return result;
  }

  async toggleCCSessionState({
    githubId,
    ccSessionId,
    requiredState /* enum DRAFT_TO_REQUESTS_GATHERING, REQUESTS_GATHERING_TO_CROSS_CHECK, CROSS_CHECK_TO_COMPLETED */,
  }) {
    const ccSessionCheck = await this.checkExistenceCCSession(ccSessionId);

    if (!ccSessionCheck) {
      return {
        error: true,
        message: `No toggled status possible. No cross-check-session found with id ${ccSessionId}`,
      };
    }

    const action = requiredState;
    let state = null;

    switch (requiredState) {
      case 'DRAFT_TO_REQUESTS_GATHERING':
        state = 'REQUESTS_GATHERING';
        break;
      case 'REQUESTS_GATHERING_TO_CROSS_CHECK':
        state = 'CROSS_CHECK';
        break;
      case 'CROSS_CHECK_TO_COMPLETED':
        state = 'COMPLETED';
        break;
      default:
        break;
    }

    const accessCheck = await this.userAccessCCSessionCheck({
      githubId,
      ccSessionId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to toggled status a cross-check-session`,
      };
    }

    const result = await this.patchResourse(`${this.URL_BASE}/${ccSessionId}`, {
      state,
    });

    return result;
  }

  async delCCSession({ githubId, ccSessionId }) {
    const ccSessionCheck = await this.checkExistenceCCSession(ccSessionId);

    if (!ccSessionCheck) {
      return {
        error: true,
        message: `Unable to delete. No cross-check-session found with id ${ccSessionId}`,
      };
    }

    const action = actionCCSessionCheckList.DELETE_CROSSCHECK;
    const accessCheck = await this.userAccessCCSessionCheck({
      githubId,
      ccSessionId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User ${githubId} does not have sufficient rights to delete a cross-check-session`,
      };
    }

    const result = await this.delResourse(`${this.URL_BASE}/${ccSessionId}`);

    return result;
  }
}