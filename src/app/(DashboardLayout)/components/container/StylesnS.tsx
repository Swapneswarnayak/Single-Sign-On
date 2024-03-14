import React from "react";

export const numStyle = {
    "& input[type=number]": {
        "-moz-appearance": "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
}

export  const Asterisk = function () {
  return <span style={{ color: "red" }}>*</span>;
};

export const onKeyDown = (e: any) => {
  if (e.key == "." || e.key === "-" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};