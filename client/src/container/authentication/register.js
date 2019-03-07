import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import AuthLayout from './layout';
import AuthServer from '../../server/authentication';
import PermissionServer from '../../server/permissions';

const FormItem = Form.Item;

class RegisterForm extends Component {
  state = {
    confirmDirty: false,
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        PermissionServer.getAllPermissions();
        AuthServer.register(values.username, values.email, values.password).then(success => {
          if (success === false) {
            this.setState({ loading: false });
          }
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;

    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const registerForm = (
      <Form onSubmit={this.handleSubmit} style={{ width: '500px', margin: '0 auto' }}>
        {/* Username */}
        <FormItem label="Username" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [
              {required: 'true', message: 'Username is required'},
              { min: 4, message: 'The username should be longer than or equal to 4 characters!' },
              { max: 14, message: 'The username should be no longer than 14 characters!' },
            ],
          })(
            <Input />
          )}
        </FormItem>
        {/* Email */}
        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {type: 'email', message: 'The input is not valid email!'},
              {required: 'true', message: 'Email is required'},
            ],
          })(
            <Input />
          )}
        </FormItem>
        {/* Password */}
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {required: true, message: 'Password is required'},
              { min: 8, message: 'The password should be longer than or equal to 8 characters!' },
              { max: 80, message: 'The password should not be longer than 80 characters!' },
              {validator: this.validateToNextPassword},
            ]
          })(
            <Input type="password" />
          )}
        </FormItem>
        {/* Confirm Password */}
        <FormItem label="Confirm Password" {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              {required: true, message: 'Please confirm your password!'},
              {validator: this.compareToFirstPassword},
            ],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        {/* Submit */}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={this.state.loading}>
            Register
          </Button>
        </FormItem>
        Already have an account? <a href="/login">Login now!</a>
      </Form>
    );

    return AuthLayout(registerForm);
  }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;
