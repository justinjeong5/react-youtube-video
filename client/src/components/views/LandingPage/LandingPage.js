import React from 'react'
import { useDispatch } from 'react-redux'
import { LOGOUT_USER_REQUEST } from '../../../_sagas/types';

function LandingPage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER_REQUEST })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <h2>시작 페이지</h2>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default LandingPage
