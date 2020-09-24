const getInitialGrade = (selfGradeList) =>
  selfGradeList.map((item) => ({
    ...item,
    protest: '',
    suggestedScore: 0,
  }));

export default getInitialGrade;
