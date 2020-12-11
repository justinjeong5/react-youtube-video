import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function LoginPage() {
  const [form] = Form.useForm();

  const initialValues = () => {
    return {
      remember: true,
      email: localStorage.getItem('rememberMe'),
    }
  }

  const onFinish = (values) => {
    localStorage.setItem('rememberMe', values.email);


  };

  const onFinishFailed = ({ errorFields }) => {
    // console.log(errorFields);
    form.scrollToField(errorFields[0].name);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <Form
        {...layout}
        name="basic"
        style={{ width: '400px' }}
        initialValues={initialValues()}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: '이메일을 입력해주세요.' },
          { type: "email", message: '이메일의 형식이 올바르지 않습니다.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
          { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
          { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
          { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>아이디 기억하기</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
