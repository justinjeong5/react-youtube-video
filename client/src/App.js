import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import wrapper from './store/configureStore';

import LandingPage from './components/views/LandingPage/LandingPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import Auth from './hoc/auth'
import LoadingPage from './components/views/LoadingPage/LoadingPage';
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NavBar />
      <div style={{ paddingTop: '49px', minHeight: 'calc(100vh - 80px)' }} >
        <Router>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </Suspense>
  );
}

export default wrapper.withRedux(App);
