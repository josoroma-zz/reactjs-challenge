import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { SearchValueProvider } from "context/SearchValue";

import { Counties, States, Toolbar } from "components";

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
