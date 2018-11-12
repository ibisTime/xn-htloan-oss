import React from 'react';
import { withRouter } from 'react-router-dom';
import cookies from 'browser-cookies';

@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    if (cookies.get('userId')) {
      return;
    }
    let path = this.props.location.pathname;
    if (path !== '/declare') {
      this.props.history.push('/login');
    }
  }
  render() {
    return null;
  }
}

export default AuthRoute;
