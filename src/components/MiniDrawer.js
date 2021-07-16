import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BuildIcon from "@material-ui/icons/Build";
import ForumIcon from "@material-ui/icons/Forum";
import WorkIcon from "@material-ui/icons/Work";
import LinkIcon from "@material-ui/icons/Link";
import CodeIcon from "@material-ui/icons/Code";
import Devselfcare from "assets/icons/devselfcare.png";
import Button from "@material-ui/core/Button";
import { Switch, Route } from "react-router-dom";
import Home from "components/Home";
import Signup from "components/Signup";
import Login from "components/Login";
import Showcase from "components/Showcase";
import Discussions from "components/Discussions";
import DevSelfCare from "components/DevSelfCare";
import Opportunities from "components/Opportunities";
import PeerProgramming from "components/PeerProgramming";
import Resources from "components/Resources";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
toast.configure();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    height: 32,
    width: 32,
    color: "#ececec",
  },
}));

export default function MiniDrawer({ auth }) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      auth.setAuthenticated(false);
      auth.setUser(null);
      let message = "Logged Out Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: "Showcase",
      icon: BuildIcon,
      onClick: () => history.push("/showcase"),
    },
    {
      text: "Discussion",
      icon: ForumIcon,
      onClick: () => history.push("/discussions"),
    },
    {
      text: "Opportunities",
      icon: WorkIcon,
      onClick: () => history.push("/opportunities"),
    },
    {
      text: "Resources",
      icon: LinkIcon,
      onClick: () => history.push("/resources"),
    },
    // {
    //   text: "Peer Programming",
    //   icon: CodeIcon,
    //   onClick: () => history.push("/peerprogramming"),
    // },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WIT SPACE
          </Typography>
          {auth.isAuthenticated ? (
            <>
              {" "}
              <Button
                variant="outlined"
                className={classes.button}
                href="/login"
                onClick={(e) => handleLogout(e)}
              >
                Logout
              </Button>{" "}
            </>
          ) : (
            <>
              {" "}
              <Button
                variant="outlined"
                className={classes.button}
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                href="/signup"
              >
                Create an account
              </Button>{" "}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map(({ text, icon: Icon, onClick }, index) => (
            <ListItem button key={text} onClick={onClick}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem
            button
            key="DevSelfCare"
            onClick={() => history.push("/devselfcare")}
          >
            <ListItemIcon>
              <img
                src={Devselfcare}
                alt="devselfcare"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText primary="DevSelfCare" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route
            path="/login"
            render={(props) => <Login {...props} auth={auth} />}
            exact
          />
          <Route
            path="/opportunities"
            render={(props) => <Opportunities {...props} auth={auth} />}
            exact
          />
          <Route
            path="/resources"
            render={(props) => <Resources {...props} auth={auth} />}
            exact
          />
          <Route
            path="/discussions"
            render={(props) => <Discussions {...props} auth={auth} />}
            exact
          />
          <Route
            path="/showcase"
            render={(props) => <Showcase {...props} auth={auth} />}
            exact
          />
          <Route
            path="/devselfcare"
            render={(props) => <DevSelfCare {...props} auth={auth} />}
            exact
          />
          <Route
            path="/peerprogramming"
            render={(props) => <PeerProgramming {...props} auth={auth} />}
            exact
          />
        </Switch>
      </main>
    </div>
  );
}
