import TableStudentsCell from './table-students-cell';

export const tableColumns = [
  { title: 'Reviewer', dataIndex: 'githubId' },
  {
    title: 'Students',
    dataIndex: 'reviewerOf',
    render: (students) => TableStudentsCell({ students }),
  },
];

export const populateRowsWithKeys = (attendeesList) =>
  attendeesList.map((attendee) => ({ ...attendee, key: attendee.githubId }));

export const dynamicSort = (property) => {
  return (a, b) => {
    if (a[property].toUpperCase() > b[property].toUpperCase()) return 1;
    if (a[property].toUpperCase() < b[property].toUpperCase()) return -1;
    return 0;
  };
};
