import React from 'react'
import logo from '../assets/ClickerLogo.png';
export function ClickHandler(params: {setBalance : any, balance : number, increment: number}) {

  function handleClick() {
    params.setBalance(Math.round((params.balance + params.increment) * 10 ) / 10);
  }

  return(
    <>
      <img onClick={handleClick} src={logo} alt="logo" className='logoImg' title='Click me!' />
    </>
  )
}