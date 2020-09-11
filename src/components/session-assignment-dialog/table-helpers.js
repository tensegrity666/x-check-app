import TableStudentsCell from './table-students-cell';

export const tableColumns = [
  { title: 'Reviewer', dataIndex: 'githubId' },
  {
    title: 'Students',
    dataIndex: 'reviewerOf',
    render: (students) => TableStudentsCell({ students }),
  },
];

export const populateWithKeys = (attendeesList) =>
  attendeesList.map((attendee) => ({ ...attendee, key: attendee.githubId }));
