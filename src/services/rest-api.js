export default class RestApi {
  API_BASE = 'https://json-x-check-app.herokuapp.com';

  CREATE_TASK = ['author', 'supervisor'];

  EDIT_TASK = ['author', 'supervisor'];

  FULL_ACCESS_TASK = ['supervisor'];

  arrToObj = (data) => {
    return {
      ...data.reduce((acc, item) => ({ ...acc, ...item }), {}),
    };
  };

  setPrivilegeForTasks = (taskState) => {
    switch (taskState) {
      case 'DRAFT':
        return this.EDIT_TASK;

      case 'PUBLISHED':
        return this.FULL_ACCESS_TASK;

      default:
        return [];
    }
  };

  createId = () => {
    return Date.now() + Math.random(0.5);
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

  // Помечено на удаление, проверяю
  async getLastNumberId(url) {
    const response = await this.getResource(url);
    const result = response.length !== 0 ? response.length + 1 : 1;

    return result;
  }

  async userAccessCheck(githubId, roles) {
    const response = await this.getUser(githubId);
    const userRoles = response.roles;
    const isAccess = roles.filter((role) => userRoles.includes(role));

    return isAccess.length > 0;
  }

  // Methods for the user entity
  async getUsersAll() {
    const result = await this.getResource('/users/');

    return result;
  }

  async getUser(githubId) {
    const result = await this.getResource(`/users/?githubId=${githubId}`);

    return this.arrToObj(result);
  }

  async createUser(githubId, roles) {
    const lastNumberId = this.createId();
    const newUser = {
      id: lastNumberId,
      githubId,
      roles,
    };

    const result = await this.sendResource('/users', newUser);

    return result;
  }

  async deleteUser(githubId) {
    const searchUser = await this.getResource(`/users/?githubId=${githubId}`);

    if (searchUser.length === 0) {
      return 'The record to be deleted was not found in the database';
    }

    const user = this.arrToObj(searchUser);
    const result = await this.delResourse(`/users/${user.id}`);

    return result;
  }

  // Methods for task entity
  async getTasksAll() {
    const result = await this.getResource('/tasks/');

    return result;
  }

  async getTask(id) {
    const result = await this.getResource(`/tasks/?id=${id}`);

    return this.arrToObj(result);
  }

  async createTaskHeader(githubId, data) {
    const accessCheck = await this.userAccessCheck(githubId, this.CREATE_TASK);

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to create a task`;
    }

    const lastTaskId = this.createId();

    const prefId = data.id;

    const newTaskHeader = {
      ...data,
      id: `${prefId}${lastTaskId}`,
    };

    const result = await this.sendResource('/tasks', newTaskHeader);

    return result;
  }

  async createTaskItem({ githubId, taskId, data }) {
    const task = await this.getTask(taskId);

    const privilege = this.setPrivilegeForTasks(task.state);
    const accessCheck = await this.userAccessCheck(githubId, privilege);

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to create items a task`;
    }

    const lastItemId = this.createId();
    const prefId = data.id;

    const newTaskItem = {
      ...data,
      id: `${prefId}${lastItemId}`,
    };

    const newItems = {
      items: [...task.items, newTaskItem],
    };

    const result = await this.patchResourse(`/tasks/${taskId}`, newItems);

    return result;
  }

  async editTaskItem({ githubId, taskId, data }) {
    const task = await this.getTask(taskId);

    const privilege = this.setPrivilegeForTasks(task.state);
    const accessCheck = await this.userAccessCheck(githubId, privilege);

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to edit items a task`;
    }

    const oldTaskItems = task.items;
    const newTaskItems = oldTaskItems.map((item) =>
      item.id === data.id ? data : item
    );

    const newItems = {
      items: [...newTaskItems],
    };

    const result = await this.patchResourse(`/tasks/${taskId}`, newItems);

    return result;
  }

  async delTaskItem({ githubId, taskId, itemId }) {
    const task = await this.getTask(taskId);

    const privilege = this.setPrivilegeForTasks(task.state);
    const accessCheck = await this.userAccessCheck(githubId, privilege);

    if (!accessCheck) {
      return `User ${githubId} does not have sufficient rights to delete items a task`;
    }

    const oldTaskItems = task.items;
    const newTaskItems = oldTaskItems.filter((item) => item.id !== itemId);

    const newItems = {
      items: [...newTaskItems],
    };

    const result = await this.patchResourse(`/tasks/${taskId}`, newItems);

    return result;
  }
}
