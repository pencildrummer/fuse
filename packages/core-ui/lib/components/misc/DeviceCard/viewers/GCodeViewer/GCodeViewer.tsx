import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function GCodeViewer({ className, ...props }) {
  const canvas = useRef<HTMLCanvasElement>();

  useEffect(() => {
    // Set canvas size
    let size = canvas.current.parentElement.getBoundingClientRect();
    canvas.current.width = size.width;
    canvas.current.height = size.height;

    // Get canvas bounding rect
    let canvasRect = canvas.current.getBoundingClientRect();
    let centerX = canvasRect.width / 2;
    let centerY = canvasRect.height / 2;

    let radius = 30;
    let angle = 0;
    const k = 100;

    let draw = () => {
      if (radius < 1.0) {
        clearInterval(timer);
        return;
      }

      let ctx = canvas.current.getContext("2d");

      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "#164e63";

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle, angle + Math.PI / k);
      ctx.closePath();
      ctx.stroke();

      radius -= Math.PI / k;
      angle += Math.PI / k;
    };

    let timer = setInterval(draw, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={classNames("relative", "bg-gray-500", className)}
      {...props}
    >
      <canvas ref={canvas} className="absolute inset-0" />
    </div>
  );
}
