/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BackTop, LocaleProvider } from 'antd';
import asyncComponent from 'component/async-component/async-component';
import reducers from './reducer';
import AuthRoute from 'component/authroute/authroute';
import './index.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';
moment.locale('zh-cn');

const store = createStore(reducers, compose(
  applyMiddleware(thunk)
));
const Login = asyncComponent(() => import('container/login/login'));
const Dashboard = asyncComponent(() => import('component/dashboard/dashboard'));
const Declare = asyncComponent(() => import('container/declare/declare'));

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/declare' component={Declare}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
          <BackTop />
        </div>
      </BrowserRouter>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);
