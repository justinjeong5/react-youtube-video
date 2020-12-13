import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { LOGIN_USER_REQUEST } from '../../../_sagas/types';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage/LoadingPage';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loginUserLoading, loginUserDone } = useSelector(state => state.user)

  useEffect(() => {
    if (loginUserDone) {
      props.history.push('/')
    }
  }, [loginUserDone])

  const initialValues = () => {
    return {
      remember: true,
      email: localStorage.getItem('rememberMe'),
    }
  }

  const onFinish = (values) => {
    localStorage.setItem('rememberMe', values.email);
    dispatch({
      type: LOGIN_USER_REQUEST,
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
    <>
      {loginUserLoading && <LoadingPage />}
      {!loginUserLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
          <Form
            {...layout}
            name="normal_login"
            className="login-form"
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
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email" />
            </Form.Item>

            <Form.Item
              label="비밀번호"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' },
              { type: "string", message: '비밀번호의 형식이 올바르지 않습니다.' },
              { whitespace: false, message: '비밀번호의 형식이 올바르지 않습니다.' },
              { min: 6, message: '비밀번호는 6글자보다 길어야합니다.' }]}
            >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="password" />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>아이디 기억하기</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                로그인
          </Button>
              <Link to='/register'>아직 회원이 아니시라면</Link>
            </Form.Item>
          </Form>
        </div >
      }
    </>
  )
}

export default withRouter(LoginPage);
