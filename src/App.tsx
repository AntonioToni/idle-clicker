import React from "react";
import { useRef, useEffect, useReducer } from "react";
import "./App.css"
import UpgradeState from "./classes/upgradeState";
import UpgradeButton from "./components/upgradeButton";
import { ClickHandler } from "./components/clickHandler";
import { DisplayStats } from "./components/displayStats";
import { SaveGame } from "./components/saveGame";

export function App() {

  /*
    balanceRef is tracking the balance amount.
  */
  const balanceRef = useRef({ value: 0 });

  const forceUpdate = useReducer(x => x + 1, 0)[1];

  const upgradeMap = useRef(new Map<string, UpgradeState>([
    ['clickUpgrade', new UpgradeState(15, 1.1, 1, 0.1)],
    ['autoClicker01', new UpgradeState(15, 1.15, 0, 0.1)],
    ['autoClicker02', new UpgradeState(100, 1.15, 0, 1)],
    ['autoClicker03', new UpgradeState(1100, 1.15, 0, 8)],
    ['autoClicker04', new UpgradeState(12000, 1.15, 0, 45)]
  ]))

  let autoIncrement: number = Math.round(
    (upgradeMap.current.get('autoClicker01')!.increment +
      upgradeMap.current.get('autoClicker02')!.increment +
      upgradeMap.current.get('autoClicker03')!.increment +
      upgradeMap.current.get('autoClicker04')!.increment
    ) * 100) / 100;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Attempting to invoke autoClicker components.');
      balanceRef.current.value = Math.round((balanceRef.current.value + (autoIncrement / 10)) * 100) / 100;
      forceUpdate();
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <ClickHandler
              balanceRef={balanceRef}
              increment={upgradeMap.current.get('clickUpgrade')!.increment}
            />
            <DisplayStats 
              balanceRef={balanceRef}
              clickIncrement={upgradeMap.current.get('clickUpgrade')!.increment}
              autoIncrement={autoIncrement}
            />
            <SaveGame 
              balanceRef={balanceRef}
              upgradeMap={upgradeMap}
            />
          </div>
          <div className="col-sm">
            <h1>Upgrades</h1>
            <UpgradeButton
              id="autoClicker01"
              name="Auto Clicker 1"
              level={upgradeMap.current.get('autoClicker01')!.level}
              cost={upgradeMap.current.get('autoClicker01')!.currentCost}
              increment={upgradeMap.current.get('autoClicker01')!.incrementAdd}
              balance={balanceRef.current.value}
              autoIncrementTotal={autoIncrement}
              clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, balanceRef); }}
            /> <br />
            <UpgradeButton
              id="autoClicker02"
              name="Auto Clicker 2"
              level={upgradeMap.current.get('autoClicker02')!.level}
              cost={upgradeMap.current.get('autoClicker02')!.currentCost}
              increment={upgradeMap.current.get('autoClicker02')!.incrementAdd}
              balance={balanceRef.current.value}
              autoIncrementTotal={autoIncrement}
              clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, balanceRef); }}
            /> <br />
            <UpgradeButton
              id="autoClicker03"
              name="Auto Clicker 3"
              level={upgradeMap.current.get('autoClicker03')!.level}
              cost={upgradeMap.current.get('autoClicker03')!.currentCost}
              increment={upgradeMap.current.get('autoClicker03')!.incrementAdd}
              balance={balanceRef.current.value}
              autoIncrementTotal={autoIncrement}
              clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, balanceRef); }}
            /> <br />
            <UpgradeButton
              id="autoClicker04"
              name="Auto Clicker 4"
              level={upgradeMap.current.get('autoClicker04')!.level}
              cost={upgradeMap.current.get('autoClicker04')!.currentCost}
              increment={upgradeMap.current.get('autoClicker04')!.incrementAdd}
              balance={balanceRef.current.value}
              autoIncrementTotal={autoIncrement}
              clickHandler={(id) => { upgradeInvocationHandler(id, upgradeMap, balanceRef); }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const upgradeInvocationHandler = (
  id: string,
  upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
  balanceRef: React.MutableRefObject<{value: number;}>,
): void => {
  if (!upgradeMap.current.has(id)) {
    return;
  }

  const cost = upgradeMap.current.get(id)!.currentCost;

  if (upgradeMap.current.get(id)!.upgrade(balanceRef.current.value)) {
    console.log(`Upgraded ${id} component.`);
    balanceRef.current.value = Math.round((balanceRef.current.value - cost) * 100) / 100;
  } else {
    console.log(`Balance is too low to upgrade ${id} component.`)
  }
}
