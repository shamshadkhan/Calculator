import React from "react";
import "./display.css";

export default class Display extends React.Component {
  render() {
    return (
      <div className="component-display">
        <div className="component-equation">{this.props.equation}</div>
        <div>{this.props.value}</div>
      </div>
    );
  }
}