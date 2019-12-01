import { Meteor } from 'meteor/meteor';
import React from 'react';

import Signup from '../ui/Signup';
import Login from '../ui/Login';
import Overview from '../ui/Overview';
import Insights from '../ui/Insights';
import Offset from '../ui/Offset';
import Settings from '../ui/Settings';
import NotFound from '../ui/NotFound';

import { Router, Route, browserHistory, Switch, Redirect } from 'react-router';

import createBrowserHistory from 'history/createBrowserHistory';

browserHistory = createBrowserHistory();

export const funcReplace = (route) => {
browserHistory.replace(route);
};

const unauthenticatedPages = ['/login', '/signup'];
const authenticatedPages = ['/overview', '/offset', '/settings', '/insights'];

const allUsers = (Component) => {

const pathname = browserHistory.location.pathname;
const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
const isAuthenticatedPage = authenticatedPages.includes(pathname);

let isAuthenticated = Session.set('loggedin');

  // console.log('userId', isAuthenticated);
  //
  //
  // if (isAuthenticated && isUnauthenticatedPage) {
  // browserHistory.replace('/');
  // console.log('replace home')
  // }
  // if (!isAuthenticated && isAuthenticatedPage) {
  // browserHistory.replace('/login');
  // console.log('replace login')
  // }

  /* let location = browserHistory.location.pathname.slice(1, browserHistory.location.pathname.length); */
  /* Session.set('currentPage', location); */
  return <Component />;
};

/*

export const onAuthChange = (isAuthenticated) => {
const pathname = browserHistory.location.pathname;
const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
const isAuthenticatedPage = authenticatedPages.includes(pathname);

if (isAuthenticated && isUnauthenticatedPage) {
browserHistory.replace('/');
}
if (!isAuthenticated && isAuthenticatedPage) {
browserHistory.replace('/login');
}
};

*/

export const routes = (
    <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" render={() => allUsers(Login)}/>
          <Route exact path="/overview" render={() => allUsers(Overview)}  />
          <Route path="/insights/:id" render={() => allUsers(Insights)} />
          <Route path="/offset" render={() => allUsers(Offset)} />
          <Route path="/settings" render={() => allUsers(Settings)} />
          <Route path="/signup" render={() => allUsers(Signup)} />
          <Route path="/login" render={() => allUsers(Login)} />

          <Route path="*" render={() => allUsers(NotFound)}  />
        </Switch>
    </Router>
);
