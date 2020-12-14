import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons';

function EmailForm() {

  const { loginUserError } = useSelector(state => state.user)

  return (
    <div>
      {(!loginUserError || loginUserError.code === 'PasswordMismatch') &&
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' },
          { type: "email", message: '이메일의 형식이 올바르지 않습니다.' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
        </Form.Item>
      }
      {loginUserError && loginUserError.code === 'NoSuchUser' &&
        < Form.Item
          label="이메일"
          validateStatus="error"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' },
          { type: "email", message: '이메일의 형식이 올바르지 않습니다.' }]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="존재하지 않는 사용자입니다." />
        </Form.Item>
      }
    </div>
  )
}

export default EmailForm
