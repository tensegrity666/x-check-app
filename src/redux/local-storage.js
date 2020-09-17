export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('loggedInUser', serializedState);
  } catch (error) {
    console.log('Could not save store');
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('loggedInUser');
    if (serializedState === null) return undefined;
    return { loginReducer: JSON.parse(serializedState) };
  } catch (error) {
    return undefined;
  }
};
