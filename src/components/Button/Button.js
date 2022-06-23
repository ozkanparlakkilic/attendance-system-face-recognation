import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <div {...props} className="button">
      {props.title}
    </div>
  );
}
