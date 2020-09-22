/* 
  Класс отвечает за проверку прав пользователей для выполнения действий
  с запросами на проверку
  Наследует класс BaseApi.

  Используются следующие роли:
  "student" - право создавать и редактировать запросы на проверку созданные этим пользователем
  "supervisor" - право изменять статус запроса на проверку.

  The class is responsible for verifying the rights of users to perform actions on validation requests
  Inherits the BaseApi class.

  The following roles are used:
  "student" - the right to create and edit review requests created by this user
  "supervisor" - the right to change the status of a check request.
*/

import BaseApi from './base-api';
import { stateList } from './constants';

export default class AccessRevReqApi extends BaseApi {
  URL_USER = '/users/?githubId=';

  URL_REV_REQ = '/reviewRequests/?id=';

  URL_ACCESS_REV_REQ_LIST = '/accessRevReqlist/';

  async userAccessRevReqCheck({ githubId, revReqId = null, action }) {
    const searchUser = await this.getResource(`${this.URL_USER}${githubId}`);

    // If the user is not found, exit with a negative check result
    if (searchUser.length === 0) {
      return false;
    }

    const searchRevReq =
      revReqId !== null
        ? await this.getResource(`${this.URL_REV_REQ}${revReqId}`)
        : null;

    // If a review request ID exists and a review request was not found, exit with a negative check result.
    if (searchRevReq !== null && searchRevReq.length === 0) {
      return false;
    }
    
    const revReq = searchRevReq !== null ? this.arrToObj(searchRevReq) : null;

    const revReqState = revReq !== null ? revReq.state : stateList.CREATE;
    const revReqAuthor = revReq !== null ? revReq.author : githubId;
    const currentUser = this.arrToObj(searchUser);
    const allowedRoles =
      revReqAuthor === githubId
        ? currentUser.roles
        : currentUser.roles.filter((role) => role !== 'student');

    const actionsData = await this.getResource(
      `${this.URL_ACCESS_REV_REQ_LIST}${revReqState}`
    );
    const actionMatch = actionsData.actionList.filter(
      (item) => item.title === action
    );

    // If there are no available actions for the status of the entry, exit with a negative check result
    if (actionMatch.length === 0) {
      return false;
    }

    const actionList = this.arrToObj(actionMatch);
    const rolesForState = actionList.roles;
    const isAccess = rolesForState.filter((role) => allowedRoles.includes(role));

    return isAccess.length > 0;
  }
}
