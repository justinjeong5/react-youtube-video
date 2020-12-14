import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHENTICATE_USER_REQUEST } from '../_sagas/types'

export default function (SpecificComponent, option, adminRoute = null) {

  // option 설명 => [null, true, false] = [로그인과 관계 없이 아무나, 로그인 한 유저만, 로그인 안한 유저만]
  // adminRoute 설명 => [null, true] = [어드민과 관계 없이 아무나, 어드민 한 유저만] , 참고로 false는 거의 있기 힘들다.


  function AuthenticationCheck(props) {

    const { currentUser } = useSelector(state => state.user)

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({
        type: AUTHENTICATE_USER_REQUEST
      })
    }, [])

    useEffect(() => {
      if (currentUser) {
        if (option === null) return;
        if (currentUser.isAuth) {
          // 로그인이 된 사용자
          if (!option) {
            // 로그인이 된 사용자 && 로그인을 안한 사용자만 사용하는 페이지
            props.history.push('/')
          }
          if (!currentUser.isAdmin) {
            // 어드민이 아닌 사용자
            if (adminRoute) {
              // 어드민이 아닌 사용자 && 어드민 권한이 필요한 페이지
              props.history.push('/')
            }
          }
        } else {
          // 로그인 하지 않은 사용자
          if (option) {
            // 로그인 하지 않은 사용자 && 로그인이 필요한 페이지
            props.history.push('/login')
          }
        }
      }
    }, [currentUser])

    return (
      <SpecificComponent />
    );
  }

  return AuthenticationCheck;
}