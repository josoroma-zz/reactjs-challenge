import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";

import { ErrorHandler } from "context/ErrorHandler";
import { Progress } from "components";

// Route Components
const routes = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("components/States/States")),
  },
  {
    exact: true,
    path: "/:stateId/counties",
    component: lazy(() => import("components/Counties/Counties")),
  },
  {
    component: lazy(() => import("components/ErrorPage/ErrorPage")),
  },
];

const Routes = ({ history, Layout }) => (
  <>
    <Suspense fallback={<Progress />}>
      <Router history={history}>
        <ErrorHandler>
          <Layout.Toolbar />
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </ErrorHandler>
      </Router>
    </Suspense>
  </>
);

Routes.propTypes = {
  history: PropTypes.object,
  Layout: PropTypes.any,
};

export default Routes;
