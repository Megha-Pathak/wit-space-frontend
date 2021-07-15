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
import MiniDrawer from "components/MiniDrawer";

export default function App() {
  return (
   <MiniDrawer/>
  );
}
