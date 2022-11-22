import { Button } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {isMobile} from 'react-device-detect';
import './upgradeButton.css'
interface ButtonProps {
  id: string;
  clickHandler: (id: string) => void;
  name: string;
  level: number;
  cost: number;
  balance: number;
  increment: number;
  autoIncrementTotal: number;
}

const buttonSX = {
  "&:hover":{
    borderColor: 'rgb(255,255,255)',
    outline: '1px solid rgb(255,255,255)',
    backgroundColor: 'rgba(60, 60, 60, 0.1)',
  },
  "&:disabled":{
    color: 'rgb(185,185,185)',
  },
  "&:disabled:hover":{
    PointerEvent: 'auto',
    cursor: 'not-allowed'
  },
  color: 'rgb(255,255,255)',
  borderColor: 'rgb(223,223,223)',
  padding: '5px 0 5px 0'
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    align: 'left',
    backgroundColor: '#0F0F0F',
    color: 'rgba(255, 255, 255, 0.87)',
    maxWidth: 510,
    padding: '10px 10px 10px 10px',
    fontSize: theme.typography.pxToRem(8),
    border: '1px solid #dadde9',
  },
}));

const UpgradeButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {

  const [isVisible, setIsVisible] = useState(false);

  if (props.balance >= props.cost - Math.max(200, props.cost * 0.2) && !isVisible) {
    setIsVisible(true);
  }

  function addcomma(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  const formatNumber = (n: number) => {
    if (n < 1e6) return n;
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "G";
    if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
    if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "P";
    if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(1) + "E";
    if (n >= 1e21 && n < 1e24) return +(n / 1e21).toFixed(1) + "Z";
    if (n >= 1e24) return +(n / 1e24).toFixed(1) + "Y";
  };

  return (
    <div>
      <HtmlTooltip placement={isMobile ? 'bottom' : 'left'} title={
          <Typography variant="body2" align="left">
            {props.name} <br/>
            Owned: {props.level} <br/>
            <div style={{display: props.level === 0 ? "none": "inline-block"}}>
              <hr />
              {"Each " + props.name + " produces "} <b> {props.increment} balance </b> per second.<br/>
              {props.level}  {props.name} producing  <b>{Math.round(props.level * props.increment * 100) / 100} balance </b> per second (
              {(props.autoIncrementTotal !== 0) ? 
              <b> {Math.round(props.level * props.increment / props.autoIncrementTotal * 100 * 100) / 100}% </b> : 
              <b>0%</b>} of total BpS)
            </div>
          </Typography>
      }>
        <span style={{height: "70px", display: "inline-block", margin: "10px", padding: '0'}}>
          <Button
            variant="outlined"
            sx={buttonSX}
            style={{ display: isVisible ? "inline-block" : "none"}}
            id={props.id}
            disabled={props.balance < props.cost ? true : false}
            className="upgradeButton"
            onClick={() => { props.clickHandler(props.id) }}>
            {props.name} <br /> <hr />
            Level: {props.level} | Cost: {addcomma(formatNumber(props.cost))}
          </Button>
        </span>
      </HtmlTooltip>
    </div>
  )
}

export default UpgradeButton;
