export default(state = [null], action) => {
  switch (action.type) {
    case 'newUser':
      return action.payload;
    default:
      return state;
  }
};
