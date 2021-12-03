import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import CC from '~/constants/constants';
import styles from './index.less';
import { Login } from '~/services/login/login';
const { Item } = Form;


const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const payload = await form.validateFields();
      const result = await Login(payload);

      if (result.status === 200) {
        message.success('登陆成功');
        localStorage.setItem('token', result.data.data.token);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
    } catch (errInfo) { }
  };

  return (
    <div className={styles.loginForm}>
      <Form
        form={form}
        labelAlign='left'
        {...CC.FORM_LAYOUT}
      >
        <Item
          label='名字'
          name='name'
          required
          rules={[
            {
              required: true,
              message: '请填写姓名'
            }
          ]}
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Input
            placeholder='请输入姓名'
          />
        </Item>
        <Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请填写密码'
            },
            {
              validator(_, value) {
                if (value && !CC.PASSWORD_REG.test(value)) {
                  return Promise.reject(new Error('密码格式错误'));
                } else {
                  return Promise.resolve();
                }
              }
            }
          ]}
          validateTrigger={['onBlur', 'onSubmit']}
          extra={'密码只能由字母、数字、下划线组成，且不能为下划线，长度在2-12之间'}
        >
          <Input.Password
            placeholder='请输入密码'
          />
        </Item>
        <Button
          type='primary'
          style={{ width: '100%' }}
          onClick={submit}
        >
          登录
        </Button>
      </Form>

    </div>
  )
}

export default LoginForm;
