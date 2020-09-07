const searchValueReducer = (state, action) => {
  switch (action.type) {
    case "setSearchValueReducer": {
      return { searchValue: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default searchValueReducer;
