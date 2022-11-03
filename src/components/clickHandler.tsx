import React, { useState } from 'react'
import logo from '../assets/ClickerLogo.png';
export function ClickHandler(params: {setBalance : any, balance : number}) {

  function handleClick() {
    params.setBalance(params.balance + 1);
  }

  return(
    <>
      <img onClick={handleClick} src={logo} alt="logo" className='logoImg' title='Click me!' />
    </>
  )
}