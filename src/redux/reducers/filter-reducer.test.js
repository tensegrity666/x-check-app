import { bindActionCreators } from 'redux';
import store from '../store';
import * as actions from '../actions';

describe('filter reducer testing', () => {
  const { dispatch } = store;
  const { changeFilter, searchItem } = bindActionCreators(actions, dispatch);
  let state;

  it('should change filter', () => {
    changeFilter('filter');

    afterEach(() => {
      state = store.getState().filterReducer;
      expect(state.filter).toBe('filter');
    });
  });

  it('should change search value', () => {
    searchItem('filter');

    afterEach(() => {
      state = store.getState().filterReducer;
      expect(state.search).toBe('filter');
    });
  });
});
