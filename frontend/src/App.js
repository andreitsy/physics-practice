import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Tasks, About, Contact, Task} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
      
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Tasks />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/task/:id" exact component={() => <Task />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;