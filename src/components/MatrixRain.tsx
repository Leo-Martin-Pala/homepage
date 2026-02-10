'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  active: boolean;
  intensity?: number; // 0-100 percentage
}

export default function MatrixRain({ active, intensity = 15 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Normalize intensity to 0-1 range for internal calculations
  const normalizedIntensity = Math.max(0, Math.min(100, intensity)) / 100;

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Japanese Katakana characters + numbers + letters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above the screen randomly
    }

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      
      // Draw semi-transparent black to create trail effect
      // Trail opacity increases with intensity
      const trailOpacity = 0.05 + (normalizedIntensity * 0.1);
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = `${fontSize}px monospace`;

      // Calculate speed modifier based on intensity (only once)
      const speedMod = Math.max(1, Math.floor(3 - normalizedIntensity * 2));
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Only draw every few frames for slower, more mysterious effect
        // Speed increases with intensity
        if (frameCount % speedMod === 0) {
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          // Vary the green color for depth
          const green = Math.floor(Math.random() * 155 + 100);
          ctx.fillStyle = `rgba(0, ${green}, 0, ${0.3 + normalizedIntensity * 0.7})`;
          
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }

        // Move drop down
        if (frameCount % speedMod === 0) {
          drops[i]++;
        }

        // Reset drop to top with random delay when it reaches bottom
        // Lower threshold = more frequent resets = denser rain
        const resetThreshold = 0.975 - (normalizedIntensity * 0.15);
        if (drops[i] * fontSize > canvas.height && Math.random() > resetThreshold) {
          drops[i] = 0;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [active, normalizedIntensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ background: 'transparent' }}
    />
  );
}
