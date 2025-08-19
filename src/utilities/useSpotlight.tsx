import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

function useSpotlight(ref: React.RefObject<HTMLElement | null>): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    const node = ref.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref]);

  return position;
}

export default useSpotlight;
