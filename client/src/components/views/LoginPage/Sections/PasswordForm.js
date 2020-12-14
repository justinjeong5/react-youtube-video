import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Form, Button, Checkbox } from 'antd';
import { LOGIN_USER_REQUEST } from '../../../_sagas/types';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage/LoadingPage';
import PasswordForm from './Sections/PasswordForm';
import EmailForm from './Sections/EmailForm';

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
  const { loginUserLoading, loginUserDone, loginUserError } = useSelector(state => state.user)

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
            <EmailForm />
            <PasswordForm />
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
