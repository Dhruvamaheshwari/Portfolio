/** @format */

"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface RainbowFlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

export const RainbowFlickeringGrid: React.FC<RainbowFlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: width || containerRef.current.clientWidth,
          height: height || containerRef.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    canvas.style.width = `${canvasSize.width}px`;
    canvas.style.height = `${canvasSize.height}px`;
    ctx.scale(dpr, dpr);

    const cols = Math.floor(canvasSize.width / (squareSize + gridGap));
    const rows = Math.floor(canvasSize.height / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);
    const squareHues = new Float32Array(cols * rows);

    for (let i = 0; i < squares.length; i++) {
      squares[i] = Math.random() * maxOpacity;
      squareHues[i] = Math.random() * 360;
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          if (Math.random() < flickerChance * 0.05) {
            squares[index] = Math.random() * maxOpacity;
          }

          // Cycle hues slightly for a "living" rainbow effect
          squareHues[index] = (squareHues[index] + 1) % 360;

          ctx.fillStyle = `hsla(${squareHues[index]}, 100%, 75%, ${squares[index]})`;
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [canvasSize, squareSize, gridGap, flickerChance, maxOpacity, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full", className)}
      {...props}>
      <canvas ref={canvasRef} />
    </div>
  );
};
