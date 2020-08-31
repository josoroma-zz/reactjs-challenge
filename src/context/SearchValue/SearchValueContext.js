import React, { createContext, useReducer } from "react";

const SearchValueStateContext = createContext();
const SearchValueDispatchContext = createContext();

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

const SearchValueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchValueReducer, { searchValue: "" });

  return (
    <SearchValueStateContext.Provider value={state}>
      <SearchValueDispatchContext.Provider value={dispatch}>
        {children}
      </SearchValueDispatchContext.Provider>
    </SearchValueStateContext.Provider>
  );
};

export {
  SearchValueStateContext,
  SearchValueDispatchContext,
  SearchValueProvider,
  searchValueReducer,
};
