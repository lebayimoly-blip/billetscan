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
            if (result?.getText()) {
              const scannedText = result.getText();
              console.log("✅ QR détecté :", scannedText);
              onScan(scannedText);
            } else if (error && error.name !== "NotFoundException") {
              console.error("❌ Erreur de scan :", error);
              onError?.(error);
            } else {
              console.warn("⚠️ Aucun QR détecté");
            }
          }
        );
        controlsRef.current = controls; // ✅ stocker pour l'arrêt
      } catch (err) {
        console.error("❌ Erreur initialisation scanner :", err);
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
