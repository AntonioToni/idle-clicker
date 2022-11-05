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
    ['autoClicker01', new UpgradeState(20, 1.2, 0, 0.1)],
    ['autoClicker02', new UpgradeState(100, 1.3, 0, 1)]
  ]))

  let autoIncrement : number = Math.round(
    (upgradeMap.current.get('autoClicker01')!.increment +
    upgradeMap.current.get('autoClicker02')!.increment) * 100) / 100;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Attempting to invoke autoClicker components.');
      setBalance(Math.round((balance + (autoIncrement / 10))* 100) / 100)
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
            autoIncrement = {autoIncrement}
            />
          </div>
          <div className="col-sm">
            <h1>Upgrades</h1>
            <Button
            id="clickUpgrade"
            name="Main upgrade"
            level={upgradeMap.current.get('clickUpgrade')!.level}
            cost={upgradeMap.current.get('clickUpgrade')!.currentCost}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker01"
            name="Auto Clicker 1"
            level={upgradeMap.current.get('autoClicker01')!.level}
            cost={upgradeMap.current.get('autoClicker01')!.currentCost}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker02"
            name="Auto Clicker 2"
            level={upgradeMap.current.get('autoClicker02')!.level}
            cost={upgradeMap.current.get('autoClicker02')!.currentCost}
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