/* 
  Базовый класс Rest API проекта x-check-app
  остальные классы Rest API наследуют методы базового класса.
  Внимание, класс генерирует стандартный Error в случае возврата ошибок
  Необходимо предусмотреть перехват и обработку таких ошибок.
*/

export default class BaseApi {
  API_BASE = 'https://json-x-check-app.herokuapp.com';

  // Secondary functions
  arrToObj = (data) => {
    return {
      ...data.reduce((acc, item) => ({ ...acc, ...item }), {}),
    };
  };

  createId = () => {
    return Math.trunc(Date.now() + Math.random(0.5));
  };

  // Base method API
  async getResource(url) {
    const response = await fetch(`${this.API_BASE}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${this.API_BASE}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }

  async sendResource(url, data) {
    const response = await fetch(`${this.API_BASE}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Could not create resource ${this.API_BASE}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }

  async delResourse(url) {
    const response = await fetch(`${this.API_BASE}${url}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Could not delete resource ${this.API_BASE}${url}, status: ${response.status}`
      );
    }

    return response;
  }

  async patchResourse(url, data) {
    const response = await fetch(`${this.API_BASE}${url}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Could not patched resource ${this.API_BASE}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }

  async putResourse(url, data) {
    const response = await fetch(`${this.API_BASE}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Could not edit resource ${this.API_BASE}${url}, status: ${response.status}`
      );
    }

    const result = await response.json();

    return result;
  }
}
