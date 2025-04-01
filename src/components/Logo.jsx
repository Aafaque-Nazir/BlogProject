import React from 'react'
import logo from '../image/logo.png'

function Logo({width = '53px'}) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{width}} ></img>
    </div>
  )
}

export default Logo