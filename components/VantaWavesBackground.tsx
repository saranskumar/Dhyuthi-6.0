"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const VantaNetBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Load script helper
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Initialize Vanta Net
    const initVanta = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js"
        );

        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x6103c0,
            backgroundColor: 0x1b1a22,
            points: 9.0,
            maxDistance: 10.0,
            spacing: 17.0,
          });
        }
      } catch (error) {
        console.error("Failed to load Vanta.NET:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ zIndex: -10 }}
    />
  );
};

export default VantaNetBackground;
