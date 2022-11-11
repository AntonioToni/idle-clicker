import React from 'react'
import logo from '../assets/ClickerLogo.png';
export function ClickHandler(props: {
  balanceRef: React.MutableRefObject<{value: number;}>,
  increment: number
}) {

  function handleClick() {
    /**
     * Should not be using setBalance directly since it would force a re-render of the parent component (<App>)!
     */
    props.balanceRef.current.value = Math.round((props.balanceRef.current.value + props.increment) * 100 ) / 100
  }

  return (
    <>
      <img onClick={handleClick} src={logo} alt="logo" className='logoImg' title='Click me!' />
    </>
  )
}