import { bindActionCreators } from 'redux';
import store from '../store';
import * as actions from '../actions';

describe('task reducer testing', () => {
  const { dispatch } = store;
  const { addTaskItem } = bindActionCreators(actions, dispatch);
  let nextState;

  it('should add new item to array of items', () => {
    addTaskItem('inputValue', 'rangeValue', 'category');

    afterEach(() => {
      nextState = store.getState().taskReducer;
      expect(nextState.items.length).not.toEqual(null);
    });
  });
});
