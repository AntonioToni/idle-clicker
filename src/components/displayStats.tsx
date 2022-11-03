import React from "react";
import { useState } from "react";

export function DisplayStats({ balance: balance }: {balance : number;}){
  return(
    <>
      <h1>Balance: {balance}</h1>
    </>
  )
}