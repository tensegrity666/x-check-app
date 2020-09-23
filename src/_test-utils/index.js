/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

import reviewRequests from './_mocks/review-requests.json';

const mockData = {
  reviewRequests,
};

const makeStore = (testReducer) => createStore(combineReducers(testReducer));

function makeTestStore(opts = {}) {
  const store = makeStore(opts);
  const originalDispatch = store.dispatch;
  store.dispatch = jest.fn(originalDispatch);
  return store;
}

function testMount(ui, { store, ...otherOpts }) {
  return mount(<Provider store={store}>{ui}</Provider>, otherOpts);
}

function testShallow(ui, { store, ...otherOpts }) {
  return shallow(<Provider store={store}>{ui}</Provider>, otherOpts);
}

function testRender(ui, { store, ...otherOpts }) {
  return render(<Provider store={store}>{ui}</Provider>, otherOpts);
}

function testMountWithRouter(
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

export {
  makeTestStore,
  testMount,
  testShallow,
  testRender,
  testMountWithRouter,
  mockData,
};
