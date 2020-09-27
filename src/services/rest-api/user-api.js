/* 
  Класс для работы с сущностью user
  Наследует базовый класс BaseApi.
  Доступные методы:
  getUsersAll() - вывод всех пользователей списком, возвращает массив объектов
  getUser(githubId) - вывод конкретного пользователя, возвращает массив с одним объектом
  createUser(
    uid,
    displayName, 
    screenName, // имя пользователя на гитхабе
    email,
    roles = []  // массив ролей, возможные значения ["student", "author", "supervizor"]
  ) - возвращает созданный объект, если пользователь с screenName уже есть БД возвращается сообщение об ошибке 
  deleteUser(githubId) - удаление пользователя, возвращает стандартный response можно вытянуть response.status = OK,
  или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import BaseApi from './base-api';

export default class UserApi extends BaseApi {
  URL_BASE = '/users';

  async getUsersAll() {
    const result = await this.getResource(this.URL_BASE);

    return result;
  }

  async getUser(githubId) {
    const result = await this.getResource(
      `${this.URL_BASE}/?githubId=${githubId}`
    );

    return result;
  }

  async createUser(uid, displayName, screenName, email, roles = []) {
    // const searchUser = await this.getUser(screenName);

    // if (searchUser.length !== 0) {
    //   return searchUser;
    // }

    const lastNumberId = this.createId();

    const newUser = {
      id: lastNumberId,
      githubId: screenName,
      uid,
      displayName,
      email,
      roles,
    };

    const result = await this.sendResource(this.URL_BASE, newUser);

    return result;
  }

  async deleteUser(githubId) {
    const searchUser = await this.getUser(githubId);

    if (searchUser.length === 0) {
      return {
        error: true,
        message: `The user ${githubId} to be deleted was not found in the database`,
      };
    }

    const user = this.arrToObj(searchUser);
    const result = await this.delResourse(`${this.URL_BASE}/${user.id}`);

    return result;
  }
}
