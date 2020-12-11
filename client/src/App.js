import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import wrapper from './store/configureStore';

import LandingPage from './components/views/LandingPage/LandingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import LoginPage from './components/views/LoginPage/LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default wrapper.withRedux(App);
