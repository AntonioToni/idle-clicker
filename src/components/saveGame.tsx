import { Button, Box, Typography, Modal } from '@mui/material';
import UpgradeState from "../classes/upgradeState";
import React, { useEffect, useRef } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'rgb(14, 16, 17)',
  border: '2px solid rgb(141, 130, 114)',
  boxShadow: 24,
  p: 3,
};

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
    console.log("Game saved");
    //TODO add pop-up or popover confirming save
  }
  function handleLoad() {
    props.balanceRef.current.value = parseInt(JSON.parse(localStorage.getItem("balanceRef") || '0'));
    loadUpgrade('autoClicker01', parseInt(JSON.parse(localStorage.getItem("AC1Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker02', parseInt(JSON.parse(localStorage.getItem("AC2Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker03', parseInt(JSON.parse(localStorage.getItem("AC3Level") || '0')), props.upgradeMap)
    loadUpgrade('autoClicker04', parseInt(JSON.parse(localStorage.getItem("AC4Level") || '0')), props.upgradeMap)
    console.log("Game loaded");
  }

  useEffect(() => { //loads latest save on app startup
    handleLoad();
    // eslint-disable-next-line
  }, []);
  /*
    Game is autosaved every 1 minute to increase
    time change 1400 to a higher number, to decrease time between
    saves change 1400 to a lower number.
  */
  const counter = useRef({ value: 0})
  counter.current.value+=1;
  if (counter.current.value >= 1400) {
    handleSave();
    counter.current.value=0;
  }

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
    props.balanceRef.current.value = parseInt(JSON.parse('0'));
    console.log("Game wiped");
    window.location.reload();
    handleClose();
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
    <>
      <Button onClick={handleSave} style={{margin: "10px 10px 30px 10px"}} variant="contained">Save</Button> <br/>
      <Button onClick={handleOpen} size="small" style={{margin: "10px"}} variant="contained" color="error">Wipe save</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            WARNING
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you REALLY want to wipe your save?
          </Typography>
          <Typography variant='caption'>
            You will lose your progress, there is no going back!
          </Typography>
          <Button onClick={wipeSave}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </Box>
      </Modal>
    </>
  )
}

const loadUpgrade = (
  id: string,
  level: number,
  upgradeMap: React.MutableRefObject<Map<string, UpgradeState>>,
) : void => {
  upgradeMap.current.get(id)!.loadUpgrade(level);
}