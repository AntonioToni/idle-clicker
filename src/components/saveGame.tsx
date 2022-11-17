import { Button } from '@mui/material';
import UpgradeState from "../classes/upgradeState";
import { useEffect } from 'react';
export function SaveGame(props: {
  balanceRef: React.MutableRefObject<{value: number;}>,
  upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
}) {
  function handleSave() {
    localStorage.setItem("balanceRef", JSON.stringify(props.balanceRef.current.value));
    localStorage.setItem("AC1Level", JSON.stringify(props.upgradeMap.current.get('autoClicker01')!.level))
    localStorage.setItem("AC2Level", JSON.stringify(props.upgradeMap.current.get('autoClicker02')!.level))
    localStorage.setItem("AC3Level", JSON.stringify(props.upgradeMap.current.get('autoClicker03')!.level))
    localStorage.setItem("AC4Level", JSON.stringify(props.upgradeMap.current.get('autoClicker04')!.level))
  }
  function handleLoad() {
    props.balanceRef.current.value = parseInt(JSON.parse(localStorage.getItem("balanceRef") || '0'));
    loadUpgrade('autoClicker01', parseInt(JSON.parse(localStorage.getItem("AC1Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker02', parseInt(JSON.parse(localStorage.getItem("AC2Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker03', parseInt(JSON.parse(localStorage.getItem("AC3Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker04', parseInt(JSON.parse(localStorage.getItem("AC4Level") || '0')), props.upgradeMap)
  }
  useEffect(() => {
    handleLoad()
  }, []);
  function wipeSave() {
    props.balanceRef.current.value = parseInt(JSON.parse('0'));
    loadUpgrade('autoClicker01', parseInt(JSON.parse('0')), props.upgradeMap);
    loadUpgrade('autoClicker02', parseInt(JSON.parse('0')), props.upgradeMap);
    loadUpgrade('autoClicker03', parseInt(JSON.parse('0')), props.upgradeMap);
    loadUpgrade('autoClicker04', parseInt(JSON.parse('0')), props.upgradeMap);
    localStorage.removeItem("balanceRef");
    localStorage.removeItem("AC1Level");
    localStorage.removeItem("AC2Level");
    localStorage.removeItem("AC3Level");
    localStorage.removeItem("AC4Level");
  }
  handleSave();
  return(
    <>
      <Button onClick={wipeSave} size="small" style={{margin: "10px"}} variant="contained" color="error">Wipe save</Button>
    </>
  )
}

const loadUpgrade = (
  id: string,
  level: number,
  upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
) : void => {
  upgradeMap.current.get(id)!.loadUpgrade(level);
  console.log('Upgrade loaded');
}