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
    ['autoClicker01', new UpgradeState(15, 1.15, 0, 0.1)],
    ['autoClicker02', new UpgradeState(100, 1.15, 0, 1)],
    ['autoClicker03', new UpgradeState(1100, 1.15, 0, 8)],
    ['autoClicker04', new UpgradeState(12000, 1.15, 0, 45)]
  ]))

  let autoIncrement : number = Math.round(
    (upgradeMap.current.get('autoClicker01')!.increment +
    upgradeMap.current.get('autoClicker02')!.increment +
    upgradeMap.current.get('autoClicker03')!.increment +
    upgradeMap.current.get('autoClicker04')!.increment
    ) * 100) / 100;

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
            name="Click upgrade"
            level={upgradeMap.current.get('clickUpgrade')!.level}
            cost={upgradeMap.current.get('clickUpgrade')!.currentCost}
            increment={upgradeMap.current.get('clickUpgrade')!.incrementAdd}
            balance={balance}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker01"
            name="Auto Clicker 1"
            level={upgradeMap.current.get('autoClicker01')!.level}
            cost={upgradeMap.current.get('autoClicker01')!.currentCost}
            increment={upgradeMap.current.get('autoClicker01')!.incrementAdd}
            balance={balance}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker02"
            name="Auto Clicker 2"
            level={upgradeMap.current.get('autoClicker02')!.level}
            cost={upgradeMap.current.get('autoClicker02')!.currentCost}
            increment={upgradeMap.current.get('autoClicker02')!.incrementAdd}
            balance={balance}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker03"
            name="Auto Clicker 3"
            level={upgradeMap.current.get('autoClicker03')!.level}
            cost={upgradeMap.current.get('autoClicker03')!.currentCost}
            increment={upgradeMap.current.get('autoClicker03')!.incrementAdd}
            balance={balance}
            clickHandler={(id) => {upgradeInvocationHandler(id,balance,setBalance,upgradeMap);}}
            /> <br/>
            <Button
            id="autoClicker04"
            name="Auto Clicker 4"
            level={upgradeMap.current.get('autoClicker04')!.level}
            cost={upgradeMap.current.get('autoClicker04')!.currentCost}
            increment={upgradeMap.current.get('autoClicker04')!.incrementAdd}
            balance={balance}
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