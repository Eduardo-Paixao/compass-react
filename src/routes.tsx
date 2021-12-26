import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SearchProfile from "./pages/SearchProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Header>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile-search/:name" exact component={SearchProfile} />
        </Header>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
