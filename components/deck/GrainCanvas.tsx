'use client';

import React, { useEffect, useRef } from 'react';

export function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create a small offscreen noise pattern
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 128;
    patternCanvas.height = 128;
    const pCtx = patternCanvas.getContext('2d')!;
    const pImg = pCtx.createImageData(128, 128);
    const pData = pImg.data;

    let frameCount = 0;
    const render = () => {
      frameCount++;
      // Refresh noise every 4 frames for low-overhead, subtle texture without mouse glowing
      if (frameCount % 4 === 0) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < pData.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          pData[i] = val;
          pData[i + 1] = val;
          pData[i + 2] = val;
          pData[i + 3] = 7; // Extremely subtle noise texture
        }
        pCtx.putImageData(pImg, 0, 0);

        // Tile the noise texture
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
