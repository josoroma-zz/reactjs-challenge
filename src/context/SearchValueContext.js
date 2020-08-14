import React, { createContext, useContext, useReducer } from "react";

const SearchValueStateContext = createContext();
const SearchValueDispatchContext = createContext();

function searchValueReducer(state, action) {
  switch (action.type) {
    case "setSearchValueReducer": {
      console.log("=======888> action.payload", action.payload);
      return { searchValue: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SearchValueProvider({ children }) {
  const [state, dispatch] = useReducer(searchValueReducer, { searchValue: "" });

  return (
    <SearchValueStateContext.Provider value={state}>
      <SearchValueDispatchContext.Provider value={dispatch}>
        {children}
      </SearchValueDispatchContext.Provider>
    </SearchValueStateContext.Provider>
  );
}

function useSearchValueState() {
  const context = useContext(SearchValueStateContext);
  if (context === undefined) {
    throw new Error(
      "useSearchValueState must be used within a SearchValueProvider"
    );
  }
  return context;
}

function useSearchValueDispatch() {
  const context = useContext(SearchValueDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSearchValueDispatch must be used within a SearchValueProvider"
    );
  }
  return context;
}

export {
  SearchValueProvider,
  useSearchValueState,
  useSearchValueDispatch,
  searchValueReducer,
};
