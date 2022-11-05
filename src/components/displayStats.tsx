import React from "react";

export function DisplayStats(props : {balance : number, clickIncrement : number, autoIncrement: number}){
  return(
    <>
      <h1>Balance: {props.balance}</h1>
      <h2>Balance per click: {props.clickIncrement}</h2>
      <h2>Balance per second: {props.autoIncrement}</h2>
    </>
  )
}