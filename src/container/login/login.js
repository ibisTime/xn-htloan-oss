import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '@redux/user';
import './login.css';

const FormItem = Form.Item;

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.setState({ loading: true })
        this.props.login(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('loginName', {
              rules: [{
                required: true,
                message: '请输入用户名!'
              }]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loginPwd', {
              rules: [{
                required: true,
                message: '请输入密码!'
              }]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" loading={this.props.fetching} className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
