import ConditionalLink from './conditional-link';

const defaultRowsByPage = 10;

const tableColumns = [
  {
    title: 'crossCheckID',
    dataIndex: 'crossCheckID',
    isSearchable: false,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    isSearchable: true,
  },
  {
    title: 'Task',
    dataIndex: 'task',
    isSearchable: true,
  },
  {
    title: 'Status',
    dataIndex: 'state',
    isSearchable: false,
    filters: [
      {
        text: 'DRAFT',
        value: 'DRAFT',
      },
      {
        text: 'PUBLISHED',
        value: 'PUBLISHED',
      },
      {
        text: 'COMPLETED',
        value: 'COMPLETED',
      },
    ],
    onFilter: (value, record) => record.state.indexOf(value) === 0,
  },
  {
    title: 'SelfGrade',
    dataIndex: 'selfGrade',
    isSearchable: false,
    sorter: (a, b) => a.selfGrade - b.selfGrade,
  },
];

const getActionColumn = (userId) => ({
  title: 'Action',
  key: 'action',
  render: (text, { author, id }) =>
    ConditionalLink({ isDisabled: userId === author, slug: id }),
});

const pagination = {
  showSizeChanger: true,
  defaultPageSize: defaultRowsByPage,
  defaultCurrent: 1,
};

export { defaultRowsByPage, tableColumns, pagination, getActionColumn };
