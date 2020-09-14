import TaskApi from './rest-api/user-api';

const TIMER = 20 * 60 * 1000;

const keepAwake = () => {
  const api = new TaskApi();

  setInterval(() => {
    api.getUser('Neo');
  }, TIMER);
};

export default keepAwake;
