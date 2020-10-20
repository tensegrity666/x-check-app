/* 
  Базовый класс Rest API проекта x-check-app
  остальные классы Rest API наследуют методы базового класса.
  Возвращает ответ сервера или сообщение об ошибке.
  Формат сообщения - объект вида {error: true, message: 'text ...'}
*/

import { addrList } from './constants';

export default class BaseApi {
  API_BASE = addrList.API_BASE;

  // Secondary functions
  arrToObj = (data) => {
    return {
      ...data.reduce((acc, item) => ({ ...acc, ...item }), {}),
    };
  };

  createId = () => {
    return Date.now() + Math.random(0.5);
  };

  // Base method API
  async getResource(url) {
    const response = await fetch(`${this.API_BASE}${url}`);

    if (!response.ok) {
      return {
        error: true,
        message: `Could not fetch ${this.API_BASE}${url}, status: ${response.status}`,
      };
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
      return {
        error: true,
        message: `Could not create resource ${this.API_BASE}${url}, status: ${response.status}`,
      };
    }

    const result = await response.json();

    return result;
  }

  async delResourse(url) {
    const response = await fetch(`${this.API_BASE}${url}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return {
        error: true,
        message: `Could not delete resource ${this.API_BASE}${url}, status: ${response.status}`,
      };
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
      return {
        error: true,
        message: `Could not patched resource ${this.API_BASE}${url}, status: ${response.status}`,
      };
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
      return {
        error: true,
        message: `Could not edit resource ${this.API_BASE}${url}, status: ${response.status}`,
      };
    }

    const result = await response.json();

    return result;
  }
}
