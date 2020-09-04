import React, { Suspense, lazy } from "react";

import { Progress } from "components";

const CountiesLazy = lazy(() => import("./Counties.lazy"));

const Counties = () => (
  // Progress Component contains `data-testid="id-request-progress"`
  <Suspense fallback={<Progress />}>
    <div data-testid="id-counties-lazy">
      <CountiesLazy />
    </div>
  </Suspense>
);

export default Counties;
