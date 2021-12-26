import React from "react";
import "../styles/input.scss";
interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string | undefined;
}

const Input = ({ placeholder, ...props }: IPropsInput) => {
  return (
    <input
      type="text"
      className="form-control input-border"
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
