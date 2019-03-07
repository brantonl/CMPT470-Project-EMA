import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
import AuthLayout from './layout';
import AuthServer from '../../server/authentication';
import PermissionServer from '../../server/permissions';

const FormItem = Form.Item;

class LoginForm extends Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        PermissionServer.getAllPermissions();
        AuthServer.login(values.email, values.password).then(success => {
          if (success === false) {
            this.setState({ loading: false });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const loginForm = (
      <Form onSubmit={this.handleSubmit} style={{ width: '300px', margin: '0 auto' }}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email!' },
            ],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'The password should be longer than or equal to 8 characters!' },
              { max: 80, message: 'The password should not be longer than 80 characters!' },
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </FormItem>
      </Form>
    );

    return AuthLayout(loginForm);
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
