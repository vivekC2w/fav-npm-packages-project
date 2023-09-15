import React, { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: IconDefinition;
  text: string;
  className: string;
}

function Button({ onClick, icon, text, className } : ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {icon && <FontAwesomeIcon icon={icon} />} {text}
    </button>
  );
}

export default Button;
