/* 
  Класс отвечает за проверку прав пользователей для выполнения действий
  с результатами проверки
  Наследует класс BaseApi.

  Используются следующие роли:
  "student" - право создавать и редактировать проверки созданные этим пользователем
  "supervisor" - право изменять статус запроса на проверку.

  
*/

import BaseApi from './base-api';
import { actionReviewList, rolesList, stateList } from './constants';

export default class AccessReviewApi extends BaseApi {
  URL_USER = '/users/?githubId=';

  URL_REV = '/reviews/?id=';

  URL_REV_REQ = '/reviewRequests/?id=';

  URL_ACCESS_REV_LIST = '/accessRevlist/';

  onSetUserRoles = ({
    reviewState,
    reviewAuthor,
    githubId,
    currentUser,
    action,
    requestAuthor,
  }) => {
    let userRoles = null;
    switch (true) {
      // Если пользователь выполняющий изменения не автор ревью, то список ролей обнуляется и никто не может редактировать
      case reviewState === stateList.DRAFT:
        userRoles = reviewAuthor === githubId ? currentUser.roles : [];
        break;

      // Если пользователь выполняющий изменения не автор ревью реквест, то список ролей обнуляется и никто не может редактировать
      case reviewState === stateList.PUBLISHED &&
        action === actionReviewList.PUBLISHED_TO_DISPUTED: // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles = requestAuthor === githubId ? currentUser.roles : [];
        // };
        break;

      // Если пользователь выполняющий изменения не автор ревью реквест, то из списка ролей убирается роль student и author
      case reviewState === stateList.PUBLISHED &&
        action === actionReviewList.PUBLISHED_TO_ACCEPTED: // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles =
          requestAuthor === githubId
            ? currentUser.roles
            : currentUser.roles.filter(
                (role) => ![rolesList.AUTHOR, rolesList.STUDENT].includes(role)
              );
        // };
        break;

      // Если пользователь выполняющий изменения не автор ревью или ревью реквест, то список ролей обнуляется и никто не может редактировать
      case reviewState === stateList.DISPUTED &&
        action === actionReviewList.EDIT_REVIEW: // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles =
          requestAuthor === githubId || reviewAuthor === githubId
            ? currentUser.roles
            : [];
        // };
        break;

      // Если пользователь выполняющий изменения не автор ревью или ревью реквест, то из списка ролей удаляются author, student
      case reviewState === stateList.DISPUTED &&
        action === actionReviewList.DISPUTED_TO_ACCEPTED: // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles =
          requestAuthor === githubId || reviewAuthor === githubId
            ? currentUser.roles
            : currentUser.roles.filter(
                (role) => ![rolesList.AUTHOR, rolesList.STUDENT].includes(role)
              );
        // };
        break;

      // авторство не проверяется, отдается список ролей пользователя выполняющего изменения
      case reviewState === stateList.ACCEPTED:
      case reviewState === stateList.REJECTED:
      case reviewState === stateList.CREATE:
        userRoles = currentUser.roles;
        break;
      default:
        userRoles = [];
        break;
    }
    return userRoles;
  };

  async onGetRevReg(requestId) {
    const result = await this.getResource(`${this.URL_REV_REQ}${requestId}`);

    return result;
  }

  async onSetRequestAuthor(requestId) {
    const searchRevReq = await this.onGetRevReg(requestId);
    const revReq = searchRevReq.length > 0 ? this.arrToObj(searchRevReq) : null;
    const requestAuthor = revReq !== null ? revReq.author : null;

    return requestAuthor;
  }

  async userAccessRevCheck({ githubId, reviewId = null, action }) {
    const searchUser = await this.getResource(`${this.URL_USER}${githubId}`); // ищем юзера от имени которого делаются изменения

    // If the user is not found, exit with a negative check result
    if (searchUser.length === 0) {
      return false;
    }

    const searchReviewId =
      reviewId !== null
        ? await this.getResource(`${this.URL_REV}${reviewId}`)
        : null;

    const review =
      searchReviewId !== null && searchReviewId.length !== 0
        ? this.arrToObj(searchReviewId)
        : null;

    const reviewState = review !== null ? review.state : stateList.CREATE; // статус записи
    const reviewAuthor = review !== null ? review.author : githubId; // автор записи
    const requestId = review !== null ? review.requestId : null; // ссылка на запрос ревью

    const currentUser = this.arrToObj(searchUser); // юзер от имени которого делаются изменения
    // отсюда начинается новая логика

    // Проверка на возможные действия в текущем состоянии записи
    const actionsData = await this.getResource(
      `${this.URL_ACCESS_REV_LIST}${reviewState}`
    );
    const actionMatch = actionsData.actionList.filter(
      (item) => item.title === action
    );

    // If there are no available actions for the status of the entry, exit with a negative check result
    if (actionMatch.length === 0) {
      return false;
    }

    const requestAuthor =
      requestId !== null ? await this.onSetRequestAuthor(requestId) : null;

    const userRoles = this.onSetUserRoles({
      reviewState,
      reviewAuthor,
      githubId,
      currentUser,
      action,
      requestAuthor,
    });

    /* switch (true) {
      // Если пользователь выполняющий изменения не автор ревью, то список ролей обнуляется и никто не может редактировать
      case (reviewState === stateList.DRAFT): 
        userRoles = reviewAuthor === githubId
          ? currentUser.roles : [];
        break;
      
        // Если пользователь выполняющий изменения не автор ревью реквест, то список ролей обнуляется и никто не может редактировать
      case (
        reviewState === stateList.PUBLISHED 
        && action === actionReviewList.PUBLISHED_TO_DISPUTED
      ): // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles = requestAuthor === githubId
          ? currentUser.roles : [];
      // };
        break;
      
        // Если пользователь выполняющий изменения не автор ревью реквест, то из списка ролей убирается роль student и author
      case (reviewState === stateList.PUBLISHED
        && action === actionReviewList.PUBLISHED_TO_ACCEPTED
      ): // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles = (requestAuthor === githubId)
          ? currentUser.roles : currentUser.roles.filter((role) => ![rolesList.AUTHOR, rolesList.STUDENT].includes(role)); 
      // };
        break;
      
        // Если пользователь выполняющий изменения не автор ревью или ревью реквест, то список ролей обнуляется и никто не может редактировать
      case (reviewState === stateList.DISPUTED
        && action === actionReviewList.EDIT_REVIEW
      ): // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles = (requestAuthor === githubId || reviewAuthor === githubId)
          ? currentUser.roles : [];
      // };
        break;
      
        // Если пользователь выполняющий изменения не автор ревью или ревью реквест, то из списка ролей удаляются author, student
      case (reviewState === stateList.DISPUTED
        && action === actionReviewList.DISPUTED_TO_ACCEPTED
      ): // {
        // const requestAuthor = await this.onSetRequestAuthor(requestId);
        userRoles = (requestAuthor === githubId || reviewAuthor === githubId)
          ? currentUser.roles : currentUser.roles.filter((role) => ![rolesList.AUTHOR, rolesList.STUDENT].includes(role));
      // };
        break;
      
        // авторство не проверяется, отдается список ролей пользователя выполняющего изменения
      case (reviewState === stateList.ACCEPTED):
      case (reviewState === stateList.REJECTED):
      case (reviewState === stateList.CREATE): 
        userRoles = currentUser.roles;
        break;  
      default:
        userRoles = [];
        break;
    }; */

    const actionList = this.arrToObj(actionMatch);
    const rolesForState = actionList.roles;
    const isAccess = rolesForState.filter((role) => userRoles.includes(role));

    return isAccess.length > 0;
  }
}
