import React from "react";
import { useState } from "react";
import "./app.css"
import { ClickHandler } from "./components/clickHandler";
import { DisplayStats } from "./components/displayStats";

export function App(){
  const [balance, setBalance] = useState(0);

  return(
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm">
          <ClickHandler balance = {balance} setBalance = {setBalance} />
          <DisplayStats balance = {balance}/>
        </div>
        <div className="col-sm">
          <h1>Upgrades</h1>
        </div>
      </div>
    </div>
    </>
  )
}