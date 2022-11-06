import React, { FunctionComponent } from "react";

interface ButtonProps {
  id: string;
  clickHandler: (id: string) => void;
  name: string;
  level: number;
  cost: number;
  balance: number;
}

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return(
    <>
      <button id={props.id} 
      className={props.balance < props.cost ? "upgradeButton upgradeButtonDisabled" : "upgradeButton"}
      onClick={() => {props.clickHandler(props.id)}}>
        {props.name} <br/> <hr />
        Level: {props.level} | Cost: {props.cost} 
      </button>
    </>
  )
}

export default Button;