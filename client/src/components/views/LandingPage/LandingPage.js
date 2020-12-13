import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { CodeSandboxOutlined } from '@ant-design/icons'

function LandingPage(props) {
  const { logoutUserDone } = useSelector(state => state.user)

  useEffect(() => {
    if (logoutUserDone) {
      props.history.push('/login');
    }
  }, [logoutUserDone])

  return (
    <>
      <div className="app">
        <CodeSandboxOutlined style={{ display: 'flex', fontSize: '2rem', justifyContent: 'center' }} /><br />
      </div>
    </>
  )
}

export default withRouter(LandingPage);
