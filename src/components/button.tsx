import React, { FunctionComponent, useState } from "react";
import './button.css'
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

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {

  const [isVisible, setIsVisible] = useState(false);

  if (props.balance >= props.cost - 200 && !isVisible) {
    setIsVisible(true);
  }

  return (
    <div className="buttonDesc">
      <button
        type="button"
        style={{ display: isVisible ? "inline-block" : "none" }}
        id={props.id}
        data-toggle="tooltip"
        data-placement="left"
        className={props.balance < props.cost ? "upgradeButton upgradeButtonDisabled" : "upgradeButton"}
        onClick={() => { props.clickHandler(props.id) }}>
        {props.name} <br /> <hr />
        Level: {props.level} | Cost: {props.cost}
      </button>
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

export default Button;