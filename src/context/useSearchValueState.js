import React from "react";

import { SearchValueStateContext } from "./SearchValueContext";

const useSearchValueState = () => {
  const context = React.useContext(SearchValueStateContext);

  if (context === undefined) {
    throw new Error(
      "useSearchValueState must be used within a SearchValueProvider"
    );
  }

  return context;
};

export default useSearchValueState;
