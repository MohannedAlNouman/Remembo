import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navbar from "./components/Navbar.js";
import HomePage from "./components/HomePage.js";
import LoginPage from "./components/LoginPage.js";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/about">
          <About />
        </Route>
        <Route path="/settings">
          <Setting />
        </Route>
      </Switch>
    </Router>
  );
};

const Home = () => {
  return <HomePage>Home Page</HomePage>;
};

const About = () => {
  return <HomePage>About Page</HomePage>;
};

const Setting = () => {
  return <HomePage>Settings Page</HomePage>;
};

export default App;
