import React, {useEffect, useState} from "react";

export function DisplayStats(props : {
  clickIncrement : number, 
  autoIncrement: number
  balanceRef: React.MutableRefObject<{value: number;}>
}){

  function addcomma(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  /*
    displayBalance and setDisplayBalance is used to keep
    displayed balanced updated every 10ms so user doesn't feel the UI lag.
    This will keep the app feeling instantaneous while in fact only this component
    is reloaded every 10ms while the whole app is only updated every 100ms. 
  */
  const [displayBalance, setDisplayBalance] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayBalance(props.balanceRef.current.value);
    }, 10);

    return () => clearInterval(interval);
  })

  return(
    <>
      <h1>Balance: {addcomma(Math.trunc(displayBalance))}</h1>
      <h2>Balance per click: {props.clickIncrement}</h2>
      <h2>Balance per second: {props.autoIncrement}</h2>
    </>
  )
}