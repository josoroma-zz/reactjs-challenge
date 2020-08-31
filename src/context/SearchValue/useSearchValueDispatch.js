import React from "react";

import { SearchValueDispatchContext } from "./SearchValueContext";

const useSearchValueDispatch = () => {
  const context = React.useContext(SearchValueDispatchContext);

  if (context === undefined) {
    throw new Error(
      "useSearchValueDispatch must be used within a SearchValueProvider"
    );
  }

  return context;
};

export default useSearchValueDispatch;
