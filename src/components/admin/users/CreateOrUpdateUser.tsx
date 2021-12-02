import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { UserModel } from './UserTableProps';
import CC from '~/constants/constants';
import * as userService from '~/services/admin/users';

const { Item } = Form;

interface Props {
  roleList: string[];
  selectedUser?: UserModel | null;
  isUpdate?: boolean;
  onSucess: Function;
}

const CreateOrUpdateUser = ({
  roleList,
  selectedUser,
  isUpdate,
  onSucess
}: Props) => {
  const [form] = Form.useForm();

  const roleOptions = roleList.map((role, index) => {
    return {
      label: role,
      value: index
    };
  });

  const submit = async () => {
    try {
      const payload = await form.validateFields();
      let action = userService.CreateUser;
      if (isUpdate) {
        action = userService.UpdateUser;
        payload['id'] = selectedUser?.id;
      }
      const result = await action(payload);

      if (result.status === 200) {
        if (result.data.data === 'yes') {
          message.success(isUpdate ? '用户修改成功' : '用户创建成功');
          onSucess();
        }
      }
    } catch (errInfo) {
    }
  };

  return (
    <div>
      <Form
        data-testid='test-user-table-create-update-form'
        form={form}
        name='create-or-update-user-form'
        style={{
          width: '80%',
          margin: '0 auto'
        }}
        {...CC.FORM_LAYOUT}
        labelAlign='left'
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
          initialValue={isUpdate ? selectedUser?.name : ''}
        >
          <Input
            data-testid='test-user-table-name-input'
            placeholder='请输入姓名'
            disabled={isUpdate}
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
          initialValue={isUpdate ? selectedUser?.password : ''}
        >
          <Input.Password
            data-testid='test-user-table-password-input'
            placeholder='请输入密码'
          />
        </Item>
        <Item
          label='用户角色'
          name='role'
          required
          initialValue={isUpdate ? selectedUser?.role : roleOptions[0]?.value}
        >
          <Select
            options={roleOptions}
            placeholder={'请选择用户角色'}
          />
        </Item>
        <Item
          {...CC.FORM_TAIL_LAYOUT}
        >
          <Button
            data-testid='test-user-table-create-update-form-btn'
            type='primary'
            onClick={submit}
            style={{ width: '100%' }}>
            {isUpdate ? '修改' : '创建'}
          </Button>
        </Item>
      </Form>
    </div>
  )
}

export default CreateOrUpdateUser;
