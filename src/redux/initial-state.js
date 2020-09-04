const initialState = {
  task: {
    id: new Date().toString(),
    creteriaText: '',
    search: '',
    filter: 'all',
    important: false,
    done: false,
    printDate: new Date().toLocaleDateString(),
    items: [{ id: 1 }, { id: 2 }, { id: 3 }],
  },
};

export default initialState;
