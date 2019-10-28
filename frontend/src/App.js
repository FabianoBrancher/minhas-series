import React from "react";

import Header from "./Header";
import Generos from "./Generos";
import NovoGenero from "./NovoGenero";
import EditarGenero from "./EditarGenero";
import Home from "./Home";
import Series from "./Series";
import NovaSerie from "./NovaSerie";
import EditarSerie from "./EditarSerie";
import InfoSerie from "./InfoSerie";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" component={NovoGenero} />
          <Route path="/generos/:id" component={EditarGenero} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" component={NovaSerie} />
          {/* <Route path="/series/:id" component={EditarSerie} /> */}
          <Route path="/series/:id" component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
