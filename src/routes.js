import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProfilePage from './pages/profile';
import Requests from './pages/requests';
import Reviews from './pages/reviews';
import ReviewsForm from './pages/reviews-form';
import Details from './pages/details';
import Auth from './pages/auth';
import Sessions from './pages/sessions';
import TaskPage from './pages/task';
import TasksPage from './pages/tasks';
import SelfGradePage from './pages/self-grade';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/task" exact component={TaskPage} />
        <Route path="/tasks" exact component={TasksPage} />
        <Route path="/requests" exact component={Requests} />
        <Route path="/self/:id" component={SelfGradePage} />
        <Route path="/reviews" exact component={Reviews} />
        <Route path="/reviews/edit" exact component={ReviewsForm} />
        <Route path="/details" exact component={Details} />
        <Route path="/details/:id" component={Details} />
        <Route path="/sessions/:id" component={Sessions} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Redirect to="/" exact />
    </Switch>
  );
};

export default useRoutes;
