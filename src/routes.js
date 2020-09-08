import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './pages/profile';
import Requests from './pages/requests/requests';
import Reviews from './pages/reviews';
import ReviewerDetails from './pages/reviewer-details';
import Auth from './pages/auth';
import Sessions from './pages/sessions';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/reviews" exact component={Reviews} />
        <Route path="/details/:id" component={ReviewerDetails} />
        <Route path="/sessions/:id" component={Sessions} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
