// import { actionTypes } from '../constants';

const selfGrade = {
  totalScore: null,
  summaryComment: '',
  items: [
    {
      comment: '',
      score: null,
      status: null,
      suggestedScore: null,
    },
  ],
};

const selfGradeReducer = (state = selfGrade, { type }) => {
  // const {} = actionTypes;

  switch (type) {
    default:
      return state;
  }
};

export default selfGradeReducer;
