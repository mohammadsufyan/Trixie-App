export default(state = [null], action) => {
  switch (action.type) {
    case 'loginStatus':
      return action.payload;
    default:
      return state;
  }
};
