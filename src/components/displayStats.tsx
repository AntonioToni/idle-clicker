import React from "react";

export function DisplayStats(props : {balance : number, clickIncrement : number, autoIncrement: number}){
  function addcomma(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  return(
    <>
      <h1>Balance: {addcomma(Math.trunc(props.balance))}</h1>
      <h2>Balance per click: {props.clickIncrement}</h2>
      <h2>Balance per second: {props.autoIncrement}</h2>
    </>
  )
}