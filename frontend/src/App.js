import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Problems, About, Contact, Problem, Profile} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
      
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Problems />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/profile" exact component={() => <Profile />} />
          <Route path="/problem/:id" exact component={() => <Problem />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;