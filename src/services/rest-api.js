export default class RestApi {
  apiBase = 'https://json-x-check-app.herokuapp.com';

  async getResource(url) {
    const response = await fetch(`${this.apiBase}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${this.apiBase}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }

  async sendResource(url, data) {
    const response = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Could not create resource ${this.apiBase}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }

  async delResourse(url) {
    const response = await fetch(`${this.apiBase}${url}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Could not delete resource ${this.apiBase}${url}, status: ${response.status}`
      );
    }

    return response;
  }

  async getUsersAll() {
    const result = await this.getResource('/users/');

    return result;
  }

  async getUser(githubId) {
    const result = await this.getResource(`/users/?githubId=${githubId}`);

    return result;
  }

  async createUser(githubId, roles) {
    const newUser = {
      githubId,
      roles,
    };

    const result = await this.sendResource('/users', newUser);

    return result;
  }

  async deleteUser(githubId) {
    const searchResults = await this.getResource(
      `/users/?githubId=${githubId}`
    );

    if (searchResults.length === 0) {
      return 'Удаляемая запись не найдена в базе данных';
    }

    const user = {
      ...searchResults.reduce((acc, item) => ({ ...acc, ...item }), {}),
    };

    const result = await this.delResourse(`/users/${user.id}`);

    return result;
  }
}
