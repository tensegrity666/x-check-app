/* 
  Класс отвечает за проверку прав пользователей для выполнения действий
  с кросс - чек сессиями
  Наследует класс BaseApi.

  Используются следующие роли:
  "supervisor" - право создавать, редактировать и удалять кросс - чек сессии, менять статус. 
  Для сущности кросс - чек сессия нет проверки на авторство, пользователь с ролью supervisor
  имеет полный доступ к любой кросс - чек сессии 
  "systems" - право создавать и изменять статус сессии.

  The class is responsible for checking the rights of users to perform actions
  with cross - check sessions
  Inherits the BaseApi class.

  The following roles are used:
  "supervisor" - the right to create, edit and delete a cross-session check, change the status
  For a cross - check session entity there is no authorship check, a user with the supervisor role 
  has full access to any cross - check session
  "systems" - the right to create and change session status.
*/

import BaseApi from './base-api';
import { stateList, addrList } from './constants';

const { URL_Q_USER, URL_Q_CCS, URL_ACCESS_CCS_LIST } = addrList;

export default class AccessCCSessionApi extends BaseApi {
  async userAccessCCSessionCheck({ githubId, ccSessionId = null, action }) {
    const searchUser = await this.getResource(`${URL_Q_USER}${githubId}`);

    // If the user is not found, exit with a negative check result
    if (searchUser.length === 0) {
      return false;
    }

    const searchCCSession =
      ccSessionId !== null
        ? await this.getResource(`${URL_Q_CCS}${ccSessionId}`)
        : null;

    // If a cross-check-session ID exists and a cross-check-session was not found, exit with a negative check result.
    if (searchCCSession !== null && searchCCSession.length === 0) {
      return false;
    }

    const ccSession =
      searchCCSession !== null ? this.arrToObj(searchCCSession) : null;
    const ccSessionState =
      ccSession !== null ? ccSession.state : stateList.CREATE;

    const currentUser = this.arrToObj(searchUser);
    const allowedRoles = currentUser.roles;

    const actionsData = await this.getResource(
      `${URL_ACCESS_CCS_LIST}${ccSessionState}`
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
    const isAccess = rolesForState.filter((role) =>
      allowedRoles.includes(role)
    );

    return isAccess.length > 0;
  }
}
