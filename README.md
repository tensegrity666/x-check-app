# [>>>Task Board<<<](https://github.com/tensegrity666/x-check-app/projects/1)
### [Naming convention and code organization](CONTRIBUTING.md)

### https://x-check-app.netlify.app/
---
### [Changelog](https://github.com/tensegrity666/x-check-app/blob/dev/CHANGELOG.md)
---

#### Clone repo
`$ git clone git@github.com:tensegrity666/x-check-app.git`<br>
<br>
_then checkout to_ __origin/dev__:<br>
`$ git fetch origin`<br>
`$ git checkout -b dev origin/dev`

#### Install
`$ npm i`

#### Start server
`$ npm start`<br>
_Open_ [http://localhost:3000](http://localhost:3000) _to view it in the browser._

#### Build project
`$ npm run build`

- - -
## Working with REST API by [DEnFUrt](https://github.com/DEnFUrt)

The basic rest api methods are implemented: GET, POST, PUT, PATCH, DELETE.
Methods for working with the user entity, tasks, subtasks have been implemented.

Примечание: ItemsTasksApi можно не использовать, для работы с задачами достаточно TasksApi, но тогда при редактировании конкретного item в массиве items нужно передавать весь массив целиком.

Все методы GET возвращают массив объектов.
Методы create, edit - возвращают объект аналогичный переданному в случае успеха, или текст с сообщением об ошибке.
Методы DELETE возвращают стандартный объект response

Некоторые методы в случае ошибки генерируют объект Error необходимо использовать перехват ошибок для избежания краха приложения, текст ошибки в error.message

Note: ItemsTasksApi can be omitted, TasksApi is enough to work with tasks, but then when editing a dream specific item in the items array, you need to transfer the entire array as a whole.

All GET methods return an array of objects.
Methods create, edit - return an object similar to the passed one in case of success, or a text with an error message.
DELETE methods return standard response object

Some methods generate an Error object in case of an error, you must use error interception to avoid crashing the application, the error text is in error.message

To use, import the module into a component
```javascript
import { 
  UserApi, // For the entity user
  TasksApi, // For the entity tasks
  ItemsTasksApi // For the entity itemsTasks
} from '../../services';

const userApi = new UserApi();
const taskApi = new TasksApi();
const itemsTasksApi = new ItemsTasksApi();
```
User creation example:
```javascript
const onCreateUser = () => {
    const githubId = 'author';
    const roles = ['author', 'supervizor'];

   userApi.createUser(githubId, roles).then((res) => 
      console.log(res);
);
```
```javascript
// returns 
  {
    githubId: "author 1",
    id: 1599462175345.309,
    roles: ["author", "supervisor"]
  }
```
    
### Get a list of all users:
```javascript
const onGetUsersAll = () => {
    userApi.getUsersAll().then((res) => console.log(res));
};
```
```javascript
// returns 
  [
    {
      githubId: "author 1",
      id: 1599462175345.309,
      roles: ["author", "supervisor"]
    },
    {
      githubId: "author 2",
      id: 1599462175345.559,
      roles: ["author"]
    },
  ]
```

### Get a specific user:
```javascript
const onGetUser = (githubId) => {
    userApi.getUser(githubId).then((res) => 
      console.log(res);
    );
  };
```
```javascript
// returns 
  {
    githubId: "author 1",
    id: 1599462175345.309,
    roles: ["author", "supervisor"]
  }
```

### Delete a specific user:
(Note: before deleting, a check is made for the existence of the user)
```javascript
  const onDeletUser = (githubId) => {
    userApi.deleteUser(githubId).then((res) => {
      if (res.ok) {
        alert(
          `Delete user: ${githubId}`
        );       
      } else {
        alert(res);
      }
    });
  };
```

### Methods of working with tasks
**Getting a list of tasks:**
```javascript
const onGetTasksAll = () => {
    taskApi.getTasksAll().then((res) => {
      console.table(res);
    });
  };
```
```javascript
//returns
[
  {
    {
    id: "simple-task-v...",
    author: "cardamo",
    state: "DRAFT", //enum DRAFT, PUBLISHED, ARCHIVED
    categoriesOrder: [
      "Basic Scope",
      "Extra Scope",
      "Fines"
    ],
    items: [
      {
        id: "basic_p...",
        minScore: 0,
        maxScore: 20,
        category: "Basic Scope",
        description: "You need to make things right, not wrong"
      },
      {
        id: "extra_p...",
        minScore: 0,
        maxScore: 30,
        category: "Extra Scope",
        description: "Be creative and make up some more awesome things"
      },
      {
        id: "fines_p1",
       "minScore: -10,
        maxScore: 0,
        category: "Fines",
        description: "App causes BSoD!"
      }
    ]
  },
  },
  {
  //...
  }
]
```

**Getting a specific task:**
```javascript
const onGetTask = (id) => {
     taskApi.getTask(id).then((res) => console.log(res));
 };
```
```javascript
//returns
{
   id: "simple-task-v...",
   author: "cardamo",
   state: "DRAFT", //enum DRAFT, PUBLISHED, ARCHIVED
   categoriesOrder: [
     "Basic Scope",
     "Extra Scope",
     "Fines"
   ],
   items: [
     {
       id: "basic_p...",
       minScore: 0,
       maxScore: 20,
       category: "Basic Scope",
       description: "You need to make things right, not wrong"
     },
     {
       id: "extra_p...",
       minScore: 0,
       maxScore: 30,
       category: "Extra Scope",
       description: "Be creative and make up some more awesome things"
     },
     {
       id: "fines_p1",
      "minScore: -10,
       maxScore: 0,
       category: "Fines",
       description: "App causes BSoD!"
     }
   ]
 }
```

**Getting a list of tasks created by the author**
```javascript
const onGetTaskByAuthor = (nameAuthor) => {
    taskApi.getTaskByAuthor(nameAuthor).then((res) => {
      console.log(res);
    });
  };
//the result is similar to the method onGetTask
```

**Creating a task card:**
(Note: the roles of the user is checked, so you must pass the user ID as an argument)
```javascript
const onCreateTaskHeader = (githubId) => {
  const newData = {
    id: 'simple-task-v', //task id prefix
    author: 'cardamo',
    state: 'DRAFT',
    categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
    items: [], //required field, empty array!
  };
  taskApi.createTaskHeader(githubId, newData).then((res) => console.log(res));
};
```
```javascript
//returns
{
  id: "simple-task-v1599463912121.8909",
  author: "cardamo",
  state: "DRAFT",
  categoriesOrder: [
    "Basic Scope",
    "Extra Scope",
    "Fines"
  ],
  items: []
}
```

Editing the task header, if successful, returns an object similar to the passed one
```javascript
const onEditTaskHeader = (githubId) => {
    const data = {
      taskTitle: 'EDIT__Very difficult task',
      state: 'DRAFT',
      deadline: '01.12.2021',
      totalScore: 100,
      // items: [] //It is strictly forbidden to pass empty items in this method,
      // There is an onEditTaskItem method for editing items.
    };
    taskApi
      .editTaskHeader({ githubId, taskId, data })
      .then((res) => console.log(res));
  };
```

**Toggle task status DRAFT, PUBLISHED, ARCHIVED,**
The requiredState argument is formalized and can only take the listed values:
[DRAFT_TO_PUBLISHED, PUBLISHED_TO_DRAFT, PUBLISHED_TO_ARCHIVED, ARCHIVED_TO_PUBLISHED ]
```javascript
const onToggleTaskState = (githubId) => {
  taskApi
    .toggleTaskState({ githubId, taskId, requiredState })
    .then((res) => console.log(res));
};
```

**Delete task**
```javascript
  const onDelTask = (githubId) => {
   taskApi
      .delTask({ githubId, taskId })
      .then((res) => console.log(res));
  };
```

**Create a subtask in a task card:**
(Note: the roles of the user is checked, so you must pass the user ID as an argument)
```javascript
const onCreateTaskItem = (githubId) => {
   const data = {
     id: 'basic_p', //task id prefix
     minScore: 0,
     maxScore: 20,
     category: 'Basic Scope',
     description: 'You need to make things right, not wrong',
   };
    itemsTasksApi.createTaskItem({ githubId, taskId, data }) //you need to pass arguments as an object: user id, task id, subtask as an object
     .then((res) => console.log(res));
 };
```
```javascript
//returns 
{
   "id": "simple-task-v1599463912121.8909",
   "author": "cardamo",
   "state": "DRAFT",
   "categoriesOrder": [
     "Basic Scope",
     "Extra Scope",
     "Fines"
   ],
   "items": [
     {
       id: "basic_p1599464109071.7922",
       minScore: 0,
       maxScore: 20,
       category: "Basic Scope",
       description: "You need to make things right, not wrong"
     }
   ]
 }
```

**Editing a subtask**
(Note: the roles of the user is checked, so you must pass the user ID as an argument)
```javascript
const onEditTaskItem = (githubId, taskItemId ) => {
    const data = {
      id: taskItemId, //id subtask
      minScore: 0,
      maxScore: 200,
      category: 'EDIT_Basic Scope',
      description: 'You need to make things right, not wrong',
    };
     itemsTasksApi.editTaskItem({ githubId, taskId, data })
      .then((res) => console.log(res));
  };
//returns a task object with overwritten items
```

**Deleting a subtask**
(Note: the roles of the user is checked, so you must pass the user ID as an argument)
```javascript
const onDelTaskItem = (githubId, taskItemId) => {
 itemsTasksApi.delTaskItem({ githubId, taskId, taskItemId })
    .then((res) => console.log(res));
//returns a task object with overwritten items
```
There are 3 user roles (the rest is under discussion ...)
student - view tasks, create review requests, cross check;
author - task management;
supervisor - change task statuses;

User roles are checked for any actions with tasks and subtasks.
A user with the author role can create, edit, delete tasks and subtasks created only by himself, as well as change the status of a task from draft to published
The supervisor can change the status of the task from draft to published, to archive and vice versa

For a more detailed description of the api, see the modules themselves

