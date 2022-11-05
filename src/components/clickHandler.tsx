import React from 'react'
import logo from '../assets/ClickerLogo.png';
export function ClickHandler(props: {setBalance : any, balance : number, increment: number}) {

  function handleClick() {
    props.setBalance(Math.round((props.balance + props.increment) * 10 ) / 10);
  }

  return(
    <>
      <img onClick={handleClick} src={logo} alt="logo" className='logoImg' title='Click me!' />
    </>
  )
}