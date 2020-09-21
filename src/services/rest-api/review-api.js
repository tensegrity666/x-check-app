/* 
  Класс для работы с сущностью Tasks 
  Наследует класс AccessReviewApi.
  Требуется импорт actionReviewList из constants.js
  
  *****
  Доступные методы:
  getRevReqAll() - выводит все запросы на ревью, возвращает полные данные в виде массива объектов
  
  getRevReq(id) -  выводит запрос на ревью по id, возвращает полные данные в виде массива c одним объектом
  
  getRevReqByAuthor(nameAuthor) - выводит все запросы на ревью созданные автором, требуется передача в аргументе поля author,
    возвращает полные данные в виде массива объектов

  getRevReqByCrossCheckId(crossCheckSessionId) - выводит все запросы на ревью созданные в рамках кросс-чек-сессии,
  требуется передача в аргументе поля crossCheckSessionId, возвращает полные данные в виде массива объектов
  
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

import AccessReviewApi from './access-review-api';
import { actionReviewList } from './constants';

export default class ReviewApi extends AccessReviewApi {
  URL_BASE = '/reviews';

  URL_REQ = '/reviewRequests';

  setState = (requiredState) => {
    switch (requiredState) {
      case 'DRAFT_TO_PUBLISHED':
        return 'PUBLISHED';
      case 'PUBLISHED_TO_ACCEPTED':
        return 'ACCEPTED';
      case 'PUBLISHED_TO_DISPUTED':
        return 'DISPUTED';
      case 'DISPUTED_TO_ACCEPTED':
        return 'ACCEPTED';
      case 'ACCEPTED_TO_REJECTED':
        return 'REJECTED';
      case 'REJECTED_TO_DISPUTED':
        return 'DISPUTED';
      case 'REJECTED_TO_ACCEPTED':
        return 'ACCEPTED';
      default:
        return null;
    }
  };

  async getReviewAll() {
    const result = await this.getResource(this.URL_BASE);

    return result;
  }

  async getReview(id) {
    const result = await this.getResource(`${this.URL_BASE}/?id=${id}`);

    return result;
  }

  async getReviewByAuthor(nameAuthor) {
    const result = await this.getResource(
      `${this.URL_BASE}/?author=${nameAuthor}`
    );

    return result;
  }

  async getReviewByRequest(revReqId) {
    const result = await this.getResource(
      `${this.URL_BASE}/?requestId=${revReqId}`
    );

    return result;
  }

  async getSelfGradeRequest(requestId) {
    const searchRequest = await this.getResource(
      `${this.URL_REQ}/?id=${requestId}`
    );

    if (searchRequest.length === 0) {
      return {
        error: true,
        message: `Can't show list of self grade. No review request found with id "${requestId}"`,
      };
    }

    const request = this.arrToObj(searchRequest);

    return request.selfGrade;
  }

  async createReview({ githubId, data }) {
    const { requestId = null, id: prefId = 'rev-id-' } = data;

    if (!requestId) {
      return {
        error: true,
        message: `No creating possible. Property requestId not found!`,
      };
    }

    const action = actionReviewList.CREATE_REVIEW;
    const accessCheck = await this.userAccessRevCheck({
      githubId,
      action,
      requestId,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to create a review`,
      };
    }

    const lastTaskId = this.createId();
    const newReview = {
      ...data,
      id: `${prefId}${lastTaskId}`,
      state: 'DRAFT',
    };

    const result = await this.sendResource(this.URL_BASE, newReview);

    return result;
  }

  async editReview({ githubId, reviewId = null, data }) {
    if (!reviewId) {
      return {
        error: true,
        message: `No editing possible. No review found with id "${reviewId}"`,
      };
    }

    const action = actionReviewList.EDIT_REVIEW;
    const accessCheck = await this.userAccessRevCheck({
      githubId,
      reviewId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to edit a review "${reviewId}"`,
      };
    }

    const result = await this.patchResourse(
      `${this.URL_BASE}/${reviewId}`,
      data
    );

    return result;
  }

  async toggleReviewState({
    githubId,
    reviewId = null,
    requiredState /* enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_ACCEPTED, PUBLISHED_TO_DISPUTED, DISPUTED_TO_ACCEPTED, ACCEPTED_TO_REJECTED, REJECTED_TO_DISPUTED, REJECTED_TO_ACCEPTED */,
  }) {
    if (!reviewId) {
      return {
        error: true,
        message: `No editing possible. No review found with id "${reviewId}"`,
      };
    }

    const accessCheck = await this.userAccessRevCheck({
      githubId,
      reviewId,
      action: requiredState,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to toggled status a review "${reviewId}"`,
      };
    }

    const state = this.setState(requiredState);

    if (state === null) {
      return {
        error: true,
        message: `Unable to change status, unknown status "${state}" a review "${reviewId}"`,
      };
    }

    const result = await this.patchResourse(`${this.URL_BASE}/${reviewId}`, {
      state,
    });

    return result;
  }

  async delReview({ githubId, reviewId = null }) {
    if (!reviewId) {
      return {
        error: true,
        message: `No editing possible. No review found with id "${reviewId}"`,
      };
    }

    const action = actionReviewList.DELETE_REVIEW;
    const accessCheck = await this.userAccessRevCheck({
      githubId,
      reviewId,
      action,
    });

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to delete a review "${reviewId}"`,
      };
    }

    const result = await this.delResourse(`${this.URL_BASE}/${reviewId}`);

    return result;
  }
}
