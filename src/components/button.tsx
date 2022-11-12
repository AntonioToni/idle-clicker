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
      <span className="buttonDescText">
        {props.id !== "clickUpgrade" ? "Adds +" + props.increment.toString() + " to balance per second." :
          "Adds +" + props.increment.toString() + " to balance per click."
        }</span>
    </div>
  )
}

export default Button;