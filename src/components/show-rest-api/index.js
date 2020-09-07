import React, { useState, useRef } from 'react';
import RestApi from '../../services/rest-api';

const restApi = new RestApi();

const ShowRestApi = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const refContainer = useRef(null);

  // const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [taskItemId, setTaskItemId] = useState('');

  const onGetUsersAll = () => {
    restApi.getUsersAll().then((res) => setUsers(res));
  };

  const onGetUser = (githubId) => {
    restApi.getUser(githubId).then((res) => {
      setUser(githubId);
      alert(
        `Найден пользователь с githubId: ${res.githubId}, смотри в консоли полные данные`
      );
      console.log('Обрати внимание, возвращается объект', res);
    });
  };

  const onCreateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(refContainer.current);
    const githubId = formData.get('githubId');
    const roles = [
      formData.get('role1'),
      formData.get('role2'),
      formData.get('role3'),
      formData.get('role4'),
    ].filter(Boolean);

    restApi.createUser(githubId, roles).then((res) => {
      alert(
        `Создан пользователь с с githubId: ${res.githubId}, смотри в консоли полные данные`
      );
      console.log('Обрати внимание, какие данные возвращаются', res);
      setUsers([]);
    });

    refContainer.current.reset();
  };

  const onDeletUser = (githubId) => {
    restApi.deleteUser(githubId).then((res) => {
      if (res.ok) {
        alert(
          `Удален пользователь с githubId: ${githubId}, смотри в консоли полные данные`
        );
        console.log('DELETE result', res);
      } else {
        alert(res);
      }
      setUser('');
      setUsers([]);
    });
  };

  const onGetTasksAll = () => {
    restApi.getTasksAll().then((res) => {
      // setTasks(res);
      console.table(res);
    });
  };

  const onGetTask = (id) => {
    if (!id) {
      return;
    }
    restApi.getTask(id).then((res) => {
      alert(`Найдена задача с id: ${res.id}, смотри в консоли полные данные`);
      console.log('Обрати внимание, возвращается объект', res);
    });
  };

  const onCreateTaskHeader = (githubId) => {
    const newData = {
      id: 'simple-task-v',
      author: 'cardamo',
      state: 'DRAFT',
      categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
      items: [],
    };
    restApi.createTaskHeader(githubId, newData).then((res) => console.log(res));
  };

  const onCreateTaskItem = (githubId) => {
    const data = {
      id: 'basic_p',
      minScore: 0,
      maxScore: 20,
      category: 'Basic Scope',
      title: 'Basic things',
      description: 'You need to make things right, not wrong',
    };
    restApi
      .createTaskItem({ githubId, taskId, data })
      .then((res) => console.log(res));
  };

  const onEditTaskItem = (githubId) => {
    const data = {
      id: taskItemId,
      minScore: 0,
      maxScore: 200,
      category: 'EDIT_Basic Scope',
      title: 'Basic things',
      description: 'You need to make things right, not wrong',
    };
    restApi
      .editTaskItem({ githubId, taskId, data })
      .then((res) => console.log(res));
  };

  const onDelTaskItem = (githubId) => {
    const itemId = taskItemId;
    restApi
      .delTaskItem({ githubId, taskId, itemId })
      .then((res) => console.log(res));
  };

  return (
    <div>
      <button type="button" onClick={() => onGetUsersAll()}>
        Show all users
      </button>
      <button type="button" onClick={() => setUsers([])}>
        Clear
      </button>
      <button type="button" onClick={() => onDeletUser(user)}>
        Delete user
      </button>
      <input value={user} />
      <ul>
        {users.map((item) => (
          <li key={item.githubId}>
            <button
              type="button"
              style={{ border: 'solid 1px black', cursor: 'pointer' }}
              title="View all user data"
              onClick={() => onGetUser(item.githubId)}>
              User: {item.githubId}
            </button>
            <ul>
              Roles:
              {item.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => onCreateUser(e)} ref={refContainer}>
        <div>
          <label htmlFor="btn">
            New user
            <input type="text" name="githubId" required />
            <div>Select roles</div>
            <label htmlFor="role1">
              author
              <input id="role1" type="checkbox" name="role1" value="author" />
            </label>
            <label htmlFor="role2">
              student
              <input id="role2" type="checkbox" name="role2" value="student" />
            </label>
            <label htmlFor="role3">
              supervisor
              <input
                id="role3"
                type="checkbox"
                name="role3"
                value="supervisor"
              />
            </label>
            <label htmlFor="role4">
              course_manager
              <input
                id="role4"
                type="checkbox"
                name="role4"
                value="course_manager"
              />
            </label>
            <button type="submit">Create user</button>
          </label>
        </div>
      </form>
      <div style={{ border: 'solid 1px black' }}>
        <span style={{ display: 'block' }}>Show RestApi Tasks</span>
        <button type="button" onClick={() => onGetTasksAll()}>
          Show All Tasks
        </button>
        <button type="button" onClick={() => onGetTask(taskId)}>
          Show Task
        </button>
        <input
          placeholder="taskId"
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button type="button" onClick={() => onCreateTaskHeader(user)}>
          Create Task Header
        </button>
        <button type="button" onClick={() => onCreateTaskItem(user)}>
          Create Task Item
        </button>
        <button type="button" onClick={() => onEditTaskItem(user)}>
          Edit Task Item
        </button>
        <button type="button" onClick={() => onDelTaskItem(user)}>
          Del Task Item
        </button>
        <input
          placeholder="taskItemId"
          type="text"
          value={taskItemId}
          onChange={(e) => setTaskItemId(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ShowRestApi;
