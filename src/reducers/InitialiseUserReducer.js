export default(state = [{ gender: 'default' }], action) => {
  switch (action.type) {
    case 'initUser':
      return action.payload;
    default:
      return state;
  }
};
