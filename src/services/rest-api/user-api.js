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

import { addrList } from './constants';

const { URL_BASE_USER } = addrList;

export default class UserApi extends BaseApi {
  async getUsersAll() {
    const result = await this.getResource(URL_BASE_USER);

    return result;
  }

  async getUser(githubId) {
    const result = await this.getResource(
      `${URL_BASE_USER}/?githubId=${githubId}`
    );

    return result;
  }

  async createUser(uid, displayName, screenName, email, roles = []) {
    const searchUser = await this.getUser(screenName);

    if (searchUser.length !== 0) {
      const { id } = this.arrToObj(searchUser);
      const editUser = {
        uid,
        displayName,
        email,
        roles,
      };

      const resEdit = await this.patchResourse(
        `${URL_BASE_USER}/${id}`,
        editUser
      );

      return resEdit;
    }

    const lastNumberId = this.createId();

    const newUser = {
      id: lastNumberId,
      githubId: screenName,
      uid,
      displayName,
      email,
      roles,
    };

    const result = await this.sendResource(URL_BASE_USER, newUser);

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
    const result = await this.delResourse(`${URL_BASE_USER}/${user.id}`);

    return result;
  }
}
