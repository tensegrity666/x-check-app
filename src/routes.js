import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './pages/profile';
import Requests from './pages/requests';
import Reviews from './pages/reviews';
import ReviewerDetails from './pages/reviewer-details';
import Auth from './pages/auth';
import Sessions from './pages/sessions';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/requests" exact>
          <Requests />
        </Route>
        <Route path="/reviews" exact>
          <Reviews />
        </Route>
        <Route path="/details/:id">
          <ReviewerDetails />
        </Route>
        <Route path="/sessions/:id">
          <Sessions />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
