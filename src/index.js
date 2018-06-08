/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BackTop } from 'antd';
import asyncComponent from 'component/async-component/async-component';
import reducers from './reducer';
import AuthRoute from 'component/authroute/authroute';
import './index.css';

const store = createStore(reducers, compose(
  applyMiddleware(thunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const Login = asyncComponent(() => import('container/login/login'));
const Dashboard = asyncComponent(() => import('component/dashboard/dashboard'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
        <BackTop />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
