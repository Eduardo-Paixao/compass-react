import React, { ReactNode } from "react";
import '../styles/spiner.scss'

interface IPropsSpiner {
  message: string;
  loading: boolean;
}

const Spiner = ({loading, message, ...props }: IPropsSpiner) => {
  return (
    <div
      className={`justify-content-center align-items-center modal background ${
        loading && "loading"
      }`}
      tabIndex={-1}
      {...props}
    >
      <div className="spinner-border text-warning" role="status"></div>
      <strong className="text-warning mx-3">{message}</strong>
    </div>
  );
};

export default Spiner;
