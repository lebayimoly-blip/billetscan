import React from "react";
import Html5Scanner from "./Html5Scanner";
import ReactZXingScanner from "./ReactZXingScanner";

const QrScanner = ({ onScan, mode = "react" }) => {
  return mode === "react" ? (
    <Html5Scanner onScan={onScan} />
  ) : (
    <ReactZXingScanner onScan={onScan} />
  );
};

export default QrScanner;
