import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "components/Home";
import Signup from "components/Signup";
import Login from "components/Login";
import Sidebar from "components/Sidebar";
import Showcase from "components/Showcase";
import Discussions from "components/Discussions";
import DevSelfCare from "components/DevSelfCare";
import Opportunities from "components/Opportunities";
import PeerProgramming from "components/PeerProgramming";
import Resources from "components/Resources";

export default function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/opportunities">
            <Opportunities />
          </Route>
          <Route exact path="/resources">
            <Resources />
          </Route>
          <Route exact path="/discussions">
            <Discussions />
          </Route>
          <Route exact path="/showcase">
            <Showcase />
          </Route>
          <Route exact path="/devselfcare">
            <DevSelfCare />
          </Route>
          <Route exact path="/peerprogramming">
            <PeerProgramming />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
