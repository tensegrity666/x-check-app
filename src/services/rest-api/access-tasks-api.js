/* 
  Класс отвечает за проверку прав пользователей для выполнения действий с задачами
  Наследует класс BaseApi.

  Используются следующие роли:
  "author" - право создавать задачи и редактировать задачи, созданные этим пользователем
  "supervisor" - право изменять статус задачи.

  The class is responsible for checking user rights to perform actions with tasks
  Inherits the BaseApi class.

  The following roles are used:
  "author" - the right to create tasks and edit tasks created by this user
  "supervisor" - the right to change the status of a task.
*/

import BaseApi from './base-api';

export default class AccessTasksApi extends BaseApi {
  URL_USER = '/users/?githubId=';

  URL_TASKS = '/tasks/?id=';

  URL_ACCESS_TASK_LIST = '/accessTasklist/';

  async userAccessTasksCheck({ githubId, taskId = undefined, action }) {
    const searchUser = await this.getResource(`${this.URL_USER}${githubId}`);

    // If the user is not found, exit with a negative check result
    if (searchUser.length === 0) {
      return false;
    }

    const searchTask =
      taskId !== undefined
        ? await this.getResource(`${this.URL_TASKS}${taskId}`)
        : null;

    const task =
      searchTask !== null && searchTask.length !== 0
        ? this.arrToObj(searchTask)
        : null;

    const taskState = task !== null ? task.state : 'CREATE';
    const taskAuthor = task !== null ? task.author : githubId;

    const user = this.arrToObj(searchUser);
    const userRoles =
      taskAuthor === githubId
        ? user.roles
        : user.roles.filter((role) => role !== 'author');

    const actionsData = await this.getResource(
      `${this.URL_ACCESS_TASK_LIST}${taskState}`
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
    const isAccess = rolesForState.filter((role) => userRoles.includes(role));

    return isAccess.length > 0;
  }
}
