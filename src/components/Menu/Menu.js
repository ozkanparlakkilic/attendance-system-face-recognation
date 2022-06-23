import React from "react";
import "./Menu.css";

export default function Menu(props) {
  return (
    <div className="menu_box" onClick={props.onClick}>
      <div
        className={props.childClass}
        style={{ width: "100%", height: "150px" }}
      >
        <div style={{ flex: "1" }}>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="icon-box">{props.icon}</div>
      </div>
    </div>
  );
}
