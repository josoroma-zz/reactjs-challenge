import React, { Suspense, lazy } from "react";

import { Progress } from "components";

const StatesLazy = lazy(() => import("./States.lazy"));

const States = () => (
  // Progress Component contains `data-testid="id-request-progress"`
  <Suspense fallback={<Progress />}>
    <div data-testid="id-states-lazy">
      <StatesLazy />
    </div>
  </Suspense>
);

export default States;
