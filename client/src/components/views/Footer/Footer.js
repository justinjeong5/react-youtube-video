import React from 'react'
import {
  CodeSandboxOutlined
} from '@ant-design/icons';

function Footer() {
  return (
    <div style={{
      height: '80px', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontSize: '1rem'
    }}>
      <p> ShinyWaterJeong  <CodeSandboxOutlined /> github.com/justinjeong5</p>
    </div>
  )
}

export default Footer
