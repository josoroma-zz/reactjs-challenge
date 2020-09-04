import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";

// Custom Global State
import { SearchValueProvider } from "context/SearchValue";
// Custom API Error Provider
import { ErrorHandler } from "context/ErrorHandler";

// Layout Components
import { ContentMessage, Toolbar } from "components";

// Route Components/Screens
const States = lazy(() => import("components/States/States"));
const Counties = lazy(() => import("components/Counties/Counties"));
const ErrorPage = lazy(() => import("components/ErrorPage/ErrorPage"));

const history = createBrowserHistory();

const App = () => (
  <div>
    <CssBaseline />
    <SearchValueProvider>
      <Suspense
        fallback={
          <div data-testid="id-app-load-page-progress">
            <ContentMessage type="progress" />
          </div>
        }
      >
        <Router history={history}>
          <Toolbar />
          <ErrorHandler>
            <Switch>
              <Route exact path="/" component={States} />
              <Route exact path="/:stateId/counties" component={Counties} />
              <Route component={ErrorPage} />
            </Switch>
          </ErrorHandler>
        </Router>
      </Suspense>
    </SearchValueProvider>
  </div>
);

export default App;
