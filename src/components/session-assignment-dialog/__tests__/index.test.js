import React from 'react';

import {
  makeTestStore,
  testMountWithRouter,
  mockData,
} from '../../../_test-utils';
import SessionAssignmentDialog from '../index';
import reviewRequestsReducer from '../../../redux/reducers/review-requests-reducer';
import { fetchReviewRequestsSuccess } from '../../../redux/actions/review-requests-actions';

describe('SessionAssignmentDialog component', () => {
  let wrapper;
  const { reviewRequests } = mockData;
  const store = makeTestStore({ reviewRequestsReducer });
  const mockId = reviewRequests[0].crossCheckSessionId;
  const path = `/sessions/${mockId}`;

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

  it('Save button is disabled without generated data', () => {
    wrapper = testMountWithRouter(<SessionAssignmentDialog />, {
      store,
      initialEntries: path,
    });
    const saveButtonProps = wrapper
      .find({ children: 'Save attendees' })
      .filter('Button')
      .props();
    const tableProps = wrapper.find('Table').at(0).props();
    if (tableProps.dataSource.length === 0) {
      expect(saveButtonProps.disabled).toBeTruthy();
    } else {
      expect(saveButtonProps.disabled).toBeFalsy();
    }
  });

  it('Generates attendees list on button click', () => {
    wrapper = testMountWithRouter(<SessionAssignmentDialog />, {
      store,
      initialEntries: path,
    });
    store.dispatch(fetchReviewRequestsSuccess(reviewRequests));
    wrapper
      .find({ children: 'Assign attendees' })
      .filter('Button')
      .simulate('click');
    const tableProps = wrapper.find('Table').at(0).props();
    const { dataSource } = tableProps;
    expect(dataSource).toHaveLength(reviewRequests.length);
  });

  it('Generated attendees list has valid structure', () => {
    wrapper = testMountWithRouter(<SessionAssignmentDialog />, {
      store,
      initialEntries: path,
    });
    store.dispatch(fetchReviewRequestsSuccess(reviewRequests));
    wrapper
      .find({ children: 'Assign attendees' })
      .filter('Button')
      .simulate('click');
    const tableProps = wrapper.find('Table').at(0).props();
    const { dataSource } = tableProps;
    expect(dataSource).not.toHaveLength(0);
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
