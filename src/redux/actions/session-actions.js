import { actionTypes } from '../constants';
import { CCSessionApi } from '../../services/rest-api';

const { FETCH_STUDENTS_BY_REVIEWER } = actionTypes;
const api = new CCSessionApi();

const fetchStudentsByReviewer = (attendees) => ({
  type: FETCH_STUDENTS_BY_REVIEWER,
  payload: attendees,
});

const fetchSessionAttendeesByReviewer = (sessionId, userGithubId) => async (
  dispatch
) => {
  const result = await api.getCCSessionAttendees(sessionId);
  const userAttendees = result.find(
    ({ githubId }) => githubId === userGithubId
  );
  if (userAttendees) {
    const { reviewerOf } = userAttendees;
    const students = [...reviewerOf];
    dispatch(fetchStudentsByReviewer(students));
  }
};

export default fetchSessionAttendeesByReviewer;
