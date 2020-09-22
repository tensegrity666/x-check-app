/* 
  Класс для работы с сущностью Reviews 
  Наследует класс AccessReviewApi.
  Требуется импорт actionReviewList из constants.js
  
  *****
  Доступные методы:
  getReviewAll() - выводит все ревью, возвращает полные данные в виде массива объектов
  
  getReview(id) -  выводит ревью по id, возвращает полные данные в виде массива c одним объектом
  
  getReviewByAuthor(nameAuthor) - выводит все ревью созданные автором, требуется передача в аргументе поля author,
    возвращает полные данные в виде массива объектов

  getReviewByRequest(requestId) - выводит все ревью созданные на указанный запрос на ревью,
  требуется передача в аргументе поля requestId, возвращает полные данные в виде массива объектов
  
  async getSelfGradeRequest(requestId) - выводит объект selfGrade из запроса на ревью, нужен для 
    копирования самооценки selfGrade в оценку grade ревью
  
  createReview({ githubId, data }) - создание ревью, аргументы метода передаются объектом!
    СТРУКТУРА объекта в параметре data:
    {
      requestId: ..., // Обязательное поле, ссылка на запрос ревью на который создается ревью
      author: githubId,    // Обязательное поле, автор ревью
      grade: {}            // Обязательное поле, сюда передается оценка проверяющего, по структуре повторяет самооценку из запроса на ревью
    }

  editReview({ githubId, reviewId = null, data }) - редактирование ревью, редактируются только те поля которые переданны в data, 
    аргументы метода передаются объектом!
    Так как все поля заголовка не подлежат редактированию, то передавать в метод можно только grade
    СТРУКТРУРА объекта:
    data ={
      grade: {
        basic_p1: {
          score: 20,                 // Оценка проверяющего
          comment: "text...",         // Коментарий проверяющего
          protest: "text ...",        // Возражения проверяемого, заполняются в статусе диспут
          suggestedScore: 30          // Рекомендуемая оценка проверямого, заполняются в статусе диспут
        },
        extra_p1: {...},
        fines_p1: {...},
    }         

  delReview({ githubId, reviewId = null }) - удаление ревью, удаляется полностью, аргументы метода передаются объектом!
  
  async toggleReviewState({
    githubId,
    reviewId = null,
    requiredState // enum DRAFT_TO_PUBLISHED, PUBLISHED_TO_ACCEPTED, PUBLISHED_TO_DISPUTED, DISPUTED_TO_ACCEPTED, ACCEPTED_TO_REJECTED, REJECTED_TO_DISPUTED, REJECTED_TO_ACCEPTED
  }) - переключение статуса ревью DRAFT, PUBLISHED, ACCEPTED, DISPUTED, REJECTED,
    Аргумент requiredState формализован и можем принимать только перечисленные значения. 

  Последние 5 методов возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке.
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

  async getReviewByRequest(requestId) {
    const result = await this.getResource(
      `${this.URL_BASE}/?requestId=${requestId}`
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

  async getReviewByStateNoDraft() {
    const result = await this.getResource(`${this.URL_BASE}/?state_ne=DRAFT`);

    return result;
  }

  async getReviewByStateDraft() {
    const result = await this.getResource(`${this.URL_BASE}/?state=DRAFT`);

    return result;
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
