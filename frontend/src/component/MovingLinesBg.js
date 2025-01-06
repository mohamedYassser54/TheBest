import React, { useRef, useEffect } from "react";

const MovingLinesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lines = [];
    const numLines = 50;

    for (let i = 0; i < numLines; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 300 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.5,
        color: `rgba(255, 255, 0, ${Math.random() * 0.5 + 0.5})`, 
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (
          line.x > canvas.width ||
          line.y > canvas.height ||
          line.x < 0 ||
          line.y < 0
        ) {
          line.x = Math.random() * canvas.width;
          line.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

   
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // التأكد من أن الخلفية تحت جميع العناصر
      }}
    />
  );
};

export default MovingLinesBackground;
