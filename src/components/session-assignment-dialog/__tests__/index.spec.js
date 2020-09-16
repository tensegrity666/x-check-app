import React from 'react';
import toJson from 'enzyme-to-json';

import { makeTestStore, testMount } from '../../../_test-utils/test-utils';
import SessionAssignmentDialog from '../index';
import reviewRequestsReducer from '../../../redux/reducers/review-requests-reducer';

describe('SessionAssignmentDialog component', () => {
  let wrapper;
  const store = makeTestStore({ reviewRequestsReducer });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('Should match the snapshot', () => {
    wrapper = testMount(<SessionAssignmentDialog />, { store });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Generates attendees list on button click', () => {
    wrapper = testMount(<SessionAssignmentDialog />, { store });
    wrapper
      .find({ children: 'Распределить проверяющих' })
      .filter('Button')
      .simulate('click');
    const tableProps = wrapper.find('Table').at(0).props();
    const { dataSource } = tableProps;
    expect(dataSource).not.toHaveLength(0);
  });

  it('Generated attendees list is valid', () => {
    wrapper = testMount(<SessionAssignmentDialog />, { store });
    wrapper
      .find({ children: 'Распределить проверяющих' })
      .filter('Button')
      .simulate('click');
    const tableProps = wrapper.find('Table').at(0).props();
    const { dataSource } = tableProps;
    expect(
      dataSource.every(
        (element) =>
          Object.prototype.hasOwnProperty.call(element, 'githubId') &&
          Object.prototype.hasOwnProperty.call(element, 'reviewerOf') &&
          element.reviewerOf.length > 0
      )
    ).toBeTruthy();
  });
});
