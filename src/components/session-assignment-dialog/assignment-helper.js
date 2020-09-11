const getAuthorsList = (requestsList) =>
  requestsList.map(({ author }) => author);

const shuffleArray = (List) =>
  List.map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);

const getStudents = (reviewCount, reviewerIndex, authorsList) => {
  const authors = [...authorsList];
  const lastElementIndex = authorsList.length - 1;
  let students = [];
  for (let count = 1; count <= reviewCount; ) {
    const nextIndex = reviewerIndex + count;
    if (nextIndex <= lastElementIndex) {
      students = [...students, authors[nextIndex]];
      count += 1;
    } else {
      const indexFromStart = nextIndex - lastElementIndex;
      if (
        indexFromStart !== lastElementIndex &&
        indexFromStart !== reviewerIndex
      ) {
        students = [...students, authors[indexFromStart]];
      }
      count += 1;
    }
  }
  return students.filter(Boolean);
};

const getMappedAssignments = (authorsList, reviewCount) => {
  return authorsList.reduce((assignments, author, index, array) => {
    return [
      ...assignments,
      {
        githubId: author,
        reviewerOf: getStudents(reviewCount, index, array),
      },
    ];
  }, []);
};

const getAssignments = (requestsList, reviewCount = 4) => {
  const authors = getAuthorsList(requestsList);
  const shuffledAuthors = shuffleArray(authors);
  return getMappedAssignments(shuffledAuthors, reviewCount);
};

export default getAssignments;
