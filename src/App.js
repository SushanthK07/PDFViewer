import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import PDFViewer from "./components/PDFViewer";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/document" component={PDFViewer} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
