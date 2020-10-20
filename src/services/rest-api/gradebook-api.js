/* 
  Модуль рассчета финальной оценки по кросс-чек сессии
  Наследует класс BaseApi
  Требуется импорт из constants.js

  *****
  Доступные методы:
  getGradebookAll() - выводит все журналы оценок, возвращает полные данные в виде массива объектов

  getGradebook(id) - выводит журналы оценок по id, возвращает полные данные в виде массива c одним объектом

  getGradebookByCCSession(ccSessionId) - выводит журналы оценок созданный по конкретной кросс-чек-сессии, возвращает полные данные в виде массива c одним объектом
  }

  createGradebook({githubId, ccSessionId = null}) -создание журнала оценок, аргументы метода передаются объектом!
    Метод производит вычисления финальных оценок и создает запись в базе данных
  СТРУКТУРА объекта:
  {
    "id": "gradebook-...",
    "ccsId": "crossCheckTest", // ссылка на кросс-чек-сессию
    "authorOfCalc": "admin",   // пользователь создавший журнал
    "authorOfRecalc": null,    // последний пользователь производивший перерасчет
    "dataOfCalc": "26.09.2020", // дата создания журнала
    "dateOfRecalc": null,       // дата последнего перерасчета
    "scoreOf": [                // массив оценок работ
      {
        "requestId": "rev-req-...",  // ссылка на ревью реквест
        "reguestAuthor": "student",
        "acceptedRevCount": 1,      // количество ревью принятых к зачету
        "finalRating": 32,          // финальная оценка
        "reviews": [                // ссылки на ревью созданные по ревью реквест для контроля
          {
            "reviewAuthor": "student 3",
            "reviewId": "rev-id-...",
            "reviewGrade": 35,       // сумма баллов по ревью
            "reviewState": "PUBLISHED"
          },
          {
            "reviewAuthor": "student 2",
            "reviewId": "rev-id-...",
            "reviewGrade": 35,
            "reviewState": "ACCEPTED"
          },
          {
            "reviewAuthor": "student 4",
            "reviewId": "rev-id-...",
            "reviewGrade": 15,
            "reviewState": "ACCEPTED"
          }
        ],
        "comment": ""                       // коментарии с пояснениями расчета
      },
      {...}
    ]
  }

  editGradebook({githubId, gradebookId = null}) - перерасчет оценок, вносит изменения в журнал,
  аргументы метода передаются объектом!

  delGradebook({githubId, gradebookId = null}) - удаляет журнал, аргументы метода передаются объектом! 

  Последние 3 метода возвращают объект идентичный переданному в случае успеха, или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import BaseApi from './base-api';

import { addrList, rolesList, stateList } from './constants';

const { URL_BASE_SCORE, URL_Q_USER, URL_Q_CCS } = addrList;

export default class GradebookApi extends BaseApi {
  computeReviews = (reviews) => {
    const result = reviews.map((review) => {
      const { state, grade } = review;
      let sumScore = null;

      switch (state) {
        case stateList.DRAFT:
        case stateList.REJECTED:
          sumScore = null;
          break;
        case stateList.PUBLISHED:
        case stateList.ACCEPTED:
          sumScore = grade.reduce((sum, item) => sum + item.score, 0);
          break;
        case stateList.DISPUTED:
          sumScore = grade.reduce((sum, item) => sum + item.suggestedScore, 0);
          break;
        default:
          break;
      }

      return {
        reviewAuthor: review.author,
        reviewId: review.id,
        reviewGrade: sumScore,
        reviewState: state,
      };
    });

    return result;
  };

  computeRating = ({
    arrReviews,
    coefficient,
    discardMinScore,
    discardMaxScore,
    minReiewsAmount,
  }) => {
    const reviewsCount = arrReviews.length;

    const calc = (reviews) => {
      return Math.round(
        (reviews.reduce((sum, item) => sum + item.reviewGrade, 0) /
          reviews.length) *
          coefficient
      );
    };

    if (reviewsCount < minReiewsAmount) {
      return {
        acceptedRevCount: reviewsCount,
        finalRating: 0,
        reviews: arrReviews,
        comment:
          'The rating is not taken into account, the number of reviews is less than the specified threshold',
      };
    }

    const paramCount = +discardMinScore + +discardMaxScore;

    if (reviewsCount - paramCount < minReiewsAmount) {
      return {
        acceptedRevCount: reviewsCount,
        finalRating: calc(arrReviews),
        reviews: arrReviews,
        comment:
          'The parameters were not taken into account when calculating the rating, as there are not enough reviews',
      };
    }

    let newArrReviews = null;
    const sortArrReviews = [...arrReviews].sort(
      (a, b) => a.reviewGrade - b.reviewGrade
    );

    if (discardMinScore && discardMaxScore) {
      newArrReviews = sortArrReviews.slice(1, sortArrReviews.length - 1);
    } else if (discardMinScore && !discardMaxScore) {
      newArrReviews = sortArrReviews.slice(1, sortArrReviews.length);
    } else if (!discardMinScore && discardMaxScore) {
      newArrReviews = sortArrReviews.slice(0, sortArrReviews.length - 1);
    } else {
      newArrReviews = sortArrReviews;
    }

    return {
      acceptedRevCount: newArrReviews.length,
      finalRating: calc(newArrReviews),
      reviews: arrReviews,
      comment: '',
    };
  };

  async userAccessGradebookCheck(githubId) {
    const searchUser = await this.getResource(`${URL_Q_USER}${githubId}`);

    // If the user is not found, exit with a negative check result
    if (searchUser.length === 0) {
      return false;
    }

    const userRoles = this.arrToObj(searchUser).roles;
    const allowedRoles = [rolesList.SUPERVISOR, rolesList.SYSTEMS];

    const isAccess = allowedRoles.filter((role) => userRoles.includes(role));

    return isAccess.length > 0;
  }

  async onGetCCSession(ccSessionId) {
    const searchCCSession = await this.getResource(
      `${URL_Q_CCS}${ccSessionId}`
    );
    const ccSession =
      searchCCSession.length > 0 ? this.arrToObj(searchCCSession) : null;

    if (ccSession === null) {
      return {
        error: true,
        message: `It is impossible to make a calculation, there is no necessary data for the calculation (no cross-check-session found with id ${ccSessionId})!`,
      };
    }

    return ccSession;
  }

  async onGetArrReq(ccSessionId) {
    const result = await this.getResource(
      `/requests/?crossCheckSessionId=${ccSessionId}&state=PUBLISHED&_embed=reviews`
    );

    return result;
  }

  async calcScore(ccSessionId) {
    const {
      coefficient = 1,
      discardMinScore = false,
      discardMaxScore = false,
      minReiewsAmount = 0,
    } = await this.onGetCCSession(ccSessionId);

    const arrReq = await this.onGetArrReq(ccSessionId);

    try {
      const newScoreOf = arrReq.map((request) => {
        const { id, author, reviews } = request;
        const arrReviewsDirty = this.computeReviews(reviews);

        // Удаляем из массива объект со свойством reviewGrade === null
        const arrReviews = arrReviewsDirty.filter(
          (item) => item.reviewGrade !== null
        );

        const finalRating = this.computeRating({
          arrReviews,
          coefficient,
          discardMinScore,
          discardMaxScore,
          minReiewsAmount,
        });

        return {
          requestId: id,
          reguestAuthor: author,
          ...finalRating,
        };
      });

      return newScoreOf;
    } catch (err) {
      return {
        error: true,
        message: `Result calculation error a final grade! ${err}`,
      };
    }
  }

  async getGradebookAll() {
    const result = await this.getResource(URL_BASE_SCORE);

    return result;
  }

  async getGradebook(id) {
    const result = await this.getResource(`${URL_BASE_SCORE}/?id=${id}`);

    return result;
  }

  async getGradebookByCCSession(ccSessionId) {
    const result = await this.getResource(
      `${URL_BASE_SCORE}/?ccsId=${ccSessionId}`
    );

    return result;
  }

  async createGradebook({ githubId, ccSessionId = null }) {
    if (!ccSessionId) {
      return {
        error: true,
        message: `No creating possible. Property ccSessionId not found!`,
      };
    }

    const ccSessionCheck = await this.getGradebookByCCSession(ccSessionId);

    if (ccSessionCheck.length > 0) {
      return {
        error: true,
        message: `No creating possible. There is already a scorebook for the cross-check-session with id ${ccSessionId}`,
      };
    }

    const accessCheck = await this.userAccessGradebookCheck(githubId);

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to create a final grade`,
      };
    }

    const scoreOf = await this.calcScore(ccSessionId);

    if (scoreOf.error) {
      return scoreOf;
    }

    const lastId = this.createId();
    const newGradeBook = {
      id: `gradebook-${lastId}`,
      ccsId: ccSessionId,
      authorOfCalc: githubId,
      authorOfRecalc: null,
      dataOfCalc: new Date().toLocaleDateString(),
      dateOfRecalc: null,
      scoreOf,
    };

    const result = await this.sendResource(URL_BASE_SCORE, newGradeBook);

    return result;
  }

  async editGradebook({ githubId, gradebookId = null }) {
    if (!gradebookId) {
      return {
        error: true,
        message: `No editing possible. Property gradebookId not found!`,
      };
    }

    const accessCheck = await this.userAccessGradebookCheck(githubId);

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to editing a final grade ${gradebookId}`,
      };
    }

    const searchGradebook = await this.getGradebook(gradebookId);

    if (searchGradebook.length === 0) {
      return {
        error: true,
        message: `No editing possible. GradeBook with id ${gradebookId} not found!`,
      };
    }

    const gradebook = this.arrToObj(searchGradebook);
    const scoreOf = await this.calcScore(gradebook.ccsId);

    if (scoreOf.error) {
      return scoreOf;
    }

    const newGradeBook = {
      dateOfRecalc: new Date().toLocaleDateString(),
      authorOfRecalc: githubId,
      scoreOf,
    };

    const result = await this.patchResourse(
      `${URL_BASE_SCORE}/${gradebookId}`,
      newGradeBook
    );

    return result;
  }

  async delGradebook({ githubId, gradebookId = null }) {
    if (!gradebookId) {
      return {
        error: true,
        message: `No delete possible. Property gradebookId not found!`,
      };
    }

    const accessCheck = await this.userAccessGradebookCheck(githubId);

    if (!accessCheck) {
      return {
        error: true,
        message: `User "${githubId}" does not have sufficient rights to delete a final grade ${gradebookId}`,
      };
    }

    const result = await this.delResourse(`${URL_BASE_SCORE}/${gradebookId}`);

    return result;
  }
}
