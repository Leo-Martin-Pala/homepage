'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  active: boolean;
  intensity?: number;
}

export default function MatrixRain({ active, intensity = 0.15 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05 * intensity * 10})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Only draw every few frames for slower, more mysterious effect
        if (frameCount % 2 === 0) {
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          // Vary the green color for depth
          const green = Math.floor(Math.random() * 155 + 100);
          ctx.fillStyle = `rgba(0, ${green}, 0, ${intensity})`;
          
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        }

        // Move drop down
        if (frameCount % 2 === 0) {
          drops[i]++;
        }

        // Reset drop to top with random delay when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
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
  }, [active, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ background: 'transparent' }}
    />
  );
}
