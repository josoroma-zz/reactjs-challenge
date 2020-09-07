import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createBrowserHistory } from "history";

// Route Components
import Routes from "routes/Routes";
// Custom Global State
import { SearchValueProvider } from "context/SearchValue";
// Layout Components
import { Toolbar } from "components";

const history = createBrowserHistory();

const Layout = {
  Toolbar: Toolbar,
};

const App = () => (
  <>
    <CssBaseline />
    <SearchValueProvider>
      <Routes Layout={Layout} history={history} />
    </SearchValueProvider>
  </>
);

export default App;
