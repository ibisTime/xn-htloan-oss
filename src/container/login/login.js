import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '@redux/user';
import './login.css';
// import logoWhite from '../../images/logo-white.png';

const FormItem = Form.Item;

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-body">
                <div className='logo-wrap'>
                    {/* <img src={logoWhite}/> */}
                    <p>后台管理系统</p>
                </div>
                <div className="login-wrap">
                    <div className="title">用户登录</div>
                    {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem className="form-item">
                            <div className="icon icon-user"></div>
                            {getFieldDecorator('loginName', {
                                rules: [{
                                    required: true,
                                    message: '请输入用户名!'
                                }]
                            })(
                                <Input placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem className="form-item">
                            <div className="icon icon-pwd"></div>
                            {getFieldDecorator('loginPwd', {
                                rules: [{
                                    required: true,
                                    message: '请输入密码!'
                                }]
                            })(
                                <Input type="password"
                                       placeholder="密码"/>
                            )}
                        </FormItem>
                        <div className="remember-wrap">
                        </div>
                        <FormItem className="button-wrap">
                            <Button type="primary" htmlType="submit" loading={this.props.fetching}
                                    className="login-form-button">
                                立即登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
