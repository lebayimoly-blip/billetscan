import React, { useEffect, useRef } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

function ZXingScanner({ onScan, onError }) {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const controlsRef = useRef(null); // ✅ pour stocker les controls

  useEffect(() => {
    codeReader.current = new BrowserQRCodeReader();

    const startScanner = async () => {
      try {
        const controls = await codeReader.current.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, error) => {
            if (result) onScan(result.getText());
            if (error && error.name !== "NotFoundException") onError?.(error);
          }
        );
        controlsRef.current = controls; // ✅ stocker pour l'arrêt
      } catch (err) {
        onError?.(err);
      }
    };

    startScanner();

    return () => {
      controlsRef.current?.stop(); // ✅ méthode officielle pour arrêter le scanner
    };
  }, [onScan, onError]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
    </div>
  );
}

export default ZXingScanner;
