const populateRowsWithKeys = (rowsList) =>
  rowsList.map((row) => ({ ...row, key: row.id }));

export default populateRowsWithKeys;
