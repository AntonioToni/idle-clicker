import React from "react";
import { useState, useRef, useEffect } from "react";
import "./app.css"
import UpgradeState from "./classes/upgradeState";
import Button from "./components/button";
import { ClickHandler } from "./components/clickHandler";
import { DisplayStats } from "./components/displayStats";

export function App(){
  const [balance, setBalance] = useState(0);

  const upgradeMap = useRef(new Map<string, UpgradeState>([
    ['clickUpgrade', new UpgradeState(15, 1.1, 1, 0.1)],
    ['autoClicker01', new UpgradeState(20, 1.2, 0, 0.01)]
  ]))

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Attempting to invoke autoClicker components.');
      setBalance(Math.round((balance + 
        upgradeMap.current.get('autoClicker01')!.increment) * 100) / 100)
    }, 100);
    return () => clearInterval(interval);
  });

  return(
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <ClickHandler 
            balance = {balance} 
            setBalance = {setBalance} 
            increment = {upgradeMap.current.get('clickUpgrade')!.increment}
            />
            <DisplayStats balance = {balance} 
            clickIncrement = {upgradeMap.current.get('clickUpgrade')!.increment}
            autoIncrement = {upgradeMap.current.get('autoClicker01')!.increment}
            />
          </div>
          <div className="col-sm">
            <h1>Upgrades</h1>
            <Button
            id="clickUpgrade"
            text="Main upgrade"
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker01"
            text="Auto Clicker 1"
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const upgradeInvocationHandler = (
  id: string,
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>
) : void => {
  if (!upgradeMap.current.has(id)) {
    return;
  }

  const cost = upgradeMap.current.get(id)!.currentCost;

  if (upgradeMap.current.get(id)!.upgrade(balance)) {
    console.log(`Upgraded ${id} component.`);
    setBalance(Math.round((balance - cost) * 100) / 100);
  } else {
    console.log(`Balance is too low to upgrade ${id} component.`)
  }
}