import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd';
import { REGISTER_USER_REQUEST } from '../../../_sagas/types';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function RegisterPage(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { registerUserLoading, registerUserDone } = useSelector(state => state.user)

  useEffect(() => {
    if (registerUserDone) {
      props.history.push('/login')
    }
  }, [registerUserDone])

  const onFinish = (values) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
      payload: {
        email: values.email,
        password: values.password
      }
    })
  };

  const onFinishFailed = ({ errorFields }) => {
    form.scrollToField(errorFields[0].name);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <Form
        {...layout}
        name="basic"
        style={{ width: '400px' }}
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
          label="이름"
          name="userName"
          rules={[{ required: true, message: '이름을 입력해주세요.' },
          { type: "string", max: 20, message: '이름은 20자 이내로 입력해주세요' }]}
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

        <Form.Item
          label="비밀번호 확인"
          name="passwordConfirm"
          rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('비밀번호 확인이 일치하지 않습니다.');
            },
          })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" >
            회원가입
          </Button>
        </Form.Item>
        {registerUserLoading && '회원가입중'}

      </Form>
    </div>
  )
}

export default RegisterPage