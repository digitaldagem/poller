import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UrlOutput from "./sections/urlOutputByNameTable";
import urlInput from "./sections/urlInputForm";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UrlOutput} />
        <Route exact path="/input" component={urlInput} />
      </Switch>
    </Router>
  );
}

export default App;
