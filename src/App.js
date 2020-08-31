import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

// Context - Providers
import { SearchValueProvider } from "./context/SearchValueContext";
// Top Header
import Toolbar from "./components/Toolbar/Toolbar";
// Content - Pages
import States from "./components/States/States";
import Counties from "./components/Counties/Counties";

const App = () => (
  <div>
    <CssBaseline />
    <SearchValueProvider>
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
    </SearchValueProvider>
  </div>
);

export default App;
