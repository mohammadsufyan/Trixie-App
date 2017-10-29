export default(state = ['5794782751.5b31fb0.139f495e24984eadbfaece520dcdb64d'], action) => {
  switch (action.type) {
    case 'accessToken':
      return action.payload;
    default:
      return state;
  }
};
