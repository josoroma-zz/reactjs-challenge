import React, { Suspense, lazy } from "react";

import { ContentMessage } from "components";

const CountiesLazy = lazy(() => import("./Counties.lazy"));

const CountiesFallback = () => (
  <div data-testid="id-counties-progress">
    <ContentMessage type="progress" />
  </div>
);

const Counties = () => (
  <Suspense fallback={<CountiesFallback />}>
    <div data-testid="id-counties-lazy">
      <CountiesLazy />
    </div>
  </Suspense>
);

export default Counties;
