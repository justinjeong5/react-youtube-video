import React from 'react'
import { useLoading, Oval } from '@agney/react-loading';

function LoadingPage() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="6rem" color='gray' />,
  });

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 128px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span>
        <section {...containerProps
        } >
          {indicatorEl}<br />
        </ section>
      </span>
    </div>
  )
}

export default LoadingPage
