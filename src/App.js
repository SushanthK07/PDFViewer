import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import PDFViewer from "./components/PDFViewer";

function App() {
  const pdfUrl = '/compressed.tracemonkey-pldi-09.pdf';
  return (
    <>
      <Switch>
        <Route exact path="/document">
          <PDFViewer src={pdfUrl} />
        </Route>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
