import React, { FunctionComponent } from "react";

interface ButtonProps {
  id: string;
  clickHandler: (id: string) => void;
  text: string;
}

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return(
    <>
      <button id={props.id} 
      className="upgradeButton"
      onClick={() => {props.clickHandler(props.id)}}>
        {props.text}
      </button>
    </>
  )
}

export default Button;