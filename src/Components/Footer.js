import React from "react";
import { render } from "react-dom";

const footerStyle = {
    backgroundColor: "white",
    fontSize: "20px",
    color: "black",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    paddingBottom: "3%",
    paddingTop: "1%",
    // marginBottom: "3%",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "80px",
    width: "100%",
  };
  
  const phantomStyle = {
    display: "block",
    // padding: "20px",
    // height: "60px",
    width: "100%"
  };

export default function Footer({ children }) {
    return (
      <div>
        <div style={phantomStyle} />
        <div style={footerStyle}>{children}</div>
      </div>
    );
  }