import React, { FunctionComponent } from "react";

interface ButtonParams {
  id: string;
  clickHandler: (id: string) => void;
  text: string;
}

const Button: FunctionComponent<ButtonParams> = (params: ButtonParams) => {
  return(
    <>
      <button id={params.id} 
      className="upgradeButton"
      onClick={() => {params.clickHandler(params.id)}}>
        {params.text}
      </button>
    </>
  )
}

export default Button;