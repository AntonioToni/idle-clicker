import React, {useEffect, useState} from "react";
import './displayStats.css';

export function DisplayStats(props : {
  clickIncrement : number, 
  autoIncrement: number
  balanceRef: React.MutableRefObject<{value: number;}>
}){

  function addcomma(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  const formatNumber = (n: number) => {
    if (n < 1e6) return n;
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "G";
    if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
    if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "P";
    if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(1) + "E";
    if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(1) + "Z";
    if (n >= 1e24) return +(n / 1e24).toFixed(1) + "Y";
  };
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
    <div className="stats">
      <h1>Balance: {addcomma(formatNumber(Math.trunc(displayBalance)))}</h1>
      <h4>per second: {addcomma(formatNumber(props.autoIncrement))}</h4>
    </div>
  )
}