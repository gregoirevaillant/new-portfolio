import { useState, useEffect, useRef } from "react";

import styles from './Cursor.module.css';

const Cursor = () => {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });

  const [renderPos, setRenderPos] = useState({ x: 0, y: 0 });

  const SMOOTHNESS = 0.2;

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, SMOOTHNESS);
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, SMOOTHNESS);

      setRenderPos({ x: dotPosition.current.x, y: dotPosition.current.y });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        className={styles.cursor}
        style={{
          transform: "translate(-50%, -50%)",
          left: `${renderPos.x}px`,
          top: `${renderPos.y}px`,
        }}
      />
    </div>
  );
};

export default Cursor;
