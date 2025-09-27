"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA?: {
      NET: (options: VantaOptions) => VantaEffect;
      WAVES: (options: VantaOptions) => VantaEffect;
    };
    THREE?: unknown;
  }
}

// Minimal typing for Vanta effect
interface VantaEffect {
  destroy: () => void;
}

interface VantaOptions {
  el: HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
}

const VantaNetBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });

    const initVanta = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js"
        );

        if (vantaRef.current && window.VANTA?.NET) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            color: 0xb86ee5,
            backgroundColor: 0x151518,
            points: 18,
            maxDistance: 10,
            spacing: 17,
          });
        }
      } catch (err) {
        console.error("Failed to load Vanta.NET:", err);
      }
    };

    initVanta();

    return () => {
      vantaEffect.current?.destroy();
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
