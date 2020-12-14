import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Input, } from 'antd'
import { LockOutlined } from '@ant-design/icons';

function PasswordForm() {

  const { loginUserError } = useSelector(state => state.user)

  return (
    <div>
      {(!loginUserError || loginUserError.code === 'NoSuchUser') && <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
        { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
        { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
        { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
      </Form.Item>}
      {loginUserError && loginUserError.code === 'PasswordMismatch' &&
        <Form.Item
          label="비밀번호"
          validateStatus="error"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
          { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
          { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
          { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="비밀번호가 일치하지 않습니다." />
        </Form.Item>
      }
    </div>
  )
}

export default PasswordForm
