import React, { useRef, useEffect, useState } from "react";

type OneToFiveScale = 1 | 2 | 3 | 4 | 5;
type CanvasSize = { width: number; height: number };

export type RadarData = {
  x: OneToFiveScale;
  y: OneToFiveScale;
  weight: OneToFiveScale;
};

const Radar = ({ data }: { data: RadarData[] }) => {
  const container = useRef(null);
  const canvas = useRef(null);
  const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0 });
  useEffect(() => {
    if (!container || !container.current) {
      return;
    }
    setSize({height: container.current.clientHeight, width: container.current.clientWidth});
    console.log("new canvas size", size)
  }, [container]);
  useEffect(() => {
    if (!canvas || !canvas.current) {
      return;
    }
  }, [canvas, size]);
  return (
    <div className="h-full w-full" ref={container}>
      <canvas ref={canvas} width={size.width} height={size.height} />
    </div>
  );
};

export default Radar;
