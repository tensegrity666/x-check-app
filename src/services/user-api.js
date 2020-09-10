/* 
  Класс для работы с сущностью user
  Наследует базовый класс BaseApi.

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

  async createUser(githubId, roles = []) {
    const lastNumberId = this.createId();
    const newUser = {
      id: lastNumberId,
      githubId,
      roles,
    };

    const result = await this.sendResource(this.URL_BASE, newUser);

    return result;
  }

  async deleteUser(githubId) {
    const searchUser = await this.getResource(
      `${this.URL_BASE}/?githubId=${githubId}`
    );

    if (searchUser.length === 0) {
      throw new Error(
        `The user ${githubId} to be deleted was not found in the database`
      );
    }

    const user = this.arrToObj(searchUser);
    const result = await this.delResourse(`${this.URL_BASE}/${user.id}`);

    return result;
  }
}
