import React, { FunctionComponent, useState } from "react";

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

  if (props.balance >= props.cost - 200) {
    setIsVisible(true);
  }

  return (
    <>
      <button
        style={{display: isVisible ? "block" : "none"}} // not sure wether it should be block or something else
        id={props.id}
        className={props.balance < props.cost ? "upgradeButton upgradeButtonDisabled" : "upgradeButton"}
        title={props.id !== "clickUpgrade" ? "Adds +" + props.increment.toString() + " to balance per second." :
          "Adds +" + props.increment.toString() + " to balance per click."
        }
        onClick={() => { props.clickHandler(props.id) }}>
        {props.name} <br /> <hr />
        Level: {props.level} | Cost: {props.cost}
      </button>
    </>
  )
}

export default Button;