import { Button } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
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

const UpgradeButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {

  const [isVisible, setIsVisible] = useState(false);

  if (props.balance >= props.cost - Math.max(200, props.cost * 0.1) && !isVisible) {
    setIsVisible(true);
  }

  return (
    <div className="buttonDesc">
      <Button
        variant="outlined"
        style={{ display: isVisible ? "inline-block" : "none" , margin: "10px"}}
        id={props.id}
        disabled={props.balance < props.cost ? true : false}
        className="upgradeButton"
        onClick={() => { props.clickHandler(props.id) }}>
        {props.name} <br /> <hr />
        Level: {props.level} | Cost: {props.cost}
      </Button>
      <span className={props.level === 0 ? "buttonDescText" : "buttonDescText buttonDescTextExpanded"}>
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
      </span>
    </div>
  )
}

export default UpgradeButton;