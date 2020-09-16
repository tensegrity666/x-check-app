/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const makeStore = (testReducer) => createStore(combineReducers(testReducer));

export function makeTestStore(opts = {}) {
  const store = makeStore(opts);
  const originalDispatch = store.dispatch;
  store.dispatch = jest.fn(originalDispatch);
  return store;
}

export function testMount(jsx, { store, ...otherOpts }) {
  return mount(<Provider store={store}>{jsx}</Provider>, otherOpts);
}

export function testShallow(jsx, { store, ...otherOpts }) {
  return shallow(<Provider store={store}>{jsx}</Provider>, otherOpts);
}

export function testRender(jsx, { store, ...otherOpts }) {
  return render(<Provider store={store}>{jsx}</Provider>, otherOpts);
}
