import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

// Top Header
import Toolbar from "./components/Toolbar/Toolbar";
// Content - Pages
import States from "./components/States/States";
import Counties from "./components/Counties/Counties";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <div>
          <Toolbar />
          <Switch>
            <Route path="/:stateId/counties">
              <Counties />
            </Route>
            <Route path="/">
              <States />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
