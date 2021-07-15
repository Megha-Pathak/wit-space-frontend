import { Auth } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import MiniDrawer from "components/MiniDrawer";
import { useState, useEffect, Fragment } from "react";

export default function App() {
  // State Variables
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  // Props for Session Management
  const authProps = {
    isAuthenticated,
    user,
    setUser,
    setAuthenticated,
  };

  useEffect(() => {
    async function sessionChecker() {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
      setAuthenticating(false);
    }
    sessionChecker();
  }, []);

  return (
    <Fragment>
      {isAuthenticating === false && (
        <Router>
          <MiniDrawer auth={authProps} />
        </Router>
      )}
    </Fragment>
  );
}
