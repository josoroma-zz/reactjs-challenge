import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Toolbar from "./components/Toolbar/Toolbar";
import States from "./components/States/States";

function App() {
  return (
    <div>
      <CssBaseline />
      <Toolbar />
      <States />
    </div>
  );
}

export default App;
