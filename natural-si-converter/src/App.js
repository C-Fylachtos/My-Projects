import "./App.css";
import Navbar from "./Navbar";
import History from "./History";
import Authors from "./Authors";
import { Route, Switch } from "react-router-dom";
import Calculator from "./Calculator";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Calculator />} />
        <Route exact path="/History" render={() => <History />} />
        <Route exact path="/Authors" render={() => <Authors />} />
      </Switch>
    </div>
  );
}

export default App;
