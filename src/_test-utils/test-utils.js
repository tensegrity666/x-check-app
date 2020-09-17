/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

const makeStore = (testReducer) => createStore(combineReducers(testReducer));

export function makeTestStore(opts = {}) {
  const store = makeStore(opts);
  const originalDispatch = store.dispatch;
  store.dispatch = jest.fn(originalDispatch);
  return store;
}

export function testMount(ui, { store, ...otherOpts }) {
  return mount(<Provider store={store}>{ui}</Provider>, otherOpts);
}

export function testShallow(ui, { store, ...otherOpts }) {
  return shallow(<Provider store={store}>{ui}</Provider>, otherOpts);
}

export function testRender(ui, { store, ...otherOpts }) {
  return render(<Provider store={store}>{ui}</Provider>, otherOpts);
}

export function testMountWithRouter(
  ui,
  { store, initialEntries = '/', ...otherOpts }
) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntries]}>{ui}</MemoryRouter>
    </Provider>,
    otherOpts
  );
}
