import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import MobViewChatBox from "../Pages/MobViewChatBox/MobViewChatBox";
import Signup from "../Pages/Singup/Signup";

const AppRouter = ({ isActive }) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {isActive ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/dashboard">
            {isActive ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/signup" component={Signup}>
            {isActive ? <Redirect to="/dashboard" /> : <Signup />}
          </Route>
          <Route path="/dashboard/:id">
            {isActive ? <MobViewChatBox /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
