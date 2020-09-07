import React, { createContext, useReducer } from "react";
import searchValueReducer from "./searchValueReducer";

const SearchValueStateContext = createContext();
const SearchValueDispatchContext = createContext();

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
};
