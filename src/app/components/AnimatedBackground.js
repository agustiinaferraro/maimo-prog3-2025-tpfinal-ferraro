"use client";

import { useEffect, useRef } from "react";

const BEAMS = 6;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const beams = Array.from({ length: BEAMS }, () => ({
      points: Array.from({ length: 4 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      })),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.2,
      hue: Math.floor(Math.random() * 80) + 200,
      alpha: Math.random() * 0.25 + 0.15,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      for (const b of beams) {
        for (const p of b.points) {
          p.x += b.vx + Math.sin(t + p.y * 0.005) * 0.5;
          p.y += b.vy + Math.cos(t + p.x * 0.005) * 0.4;

          if (p.x < -200) p.x = canvas.width + 200;
          if (p.x > canvas.width + 200) p.x = -200;
          if (p.y < -200) p.y = canvas.height + 200;
          if (p.y > canvas.height + 200) p.y = -200;
        }

        const [p1, p2, p3, p4] = b.points;
        const midX = (p1.x + p2.x + p3.x + p4.x) / 4;
        const midY = (p1.y + p2.y + p3.y + p4.y) / 4;

        const grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, 350);
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 60%, ${b.alpha + 0.1})`);
        grad.addColorStop(0.3, `hsla(${b.hue + 20}, 70%, 50%, ${b.alpha * 0.6})`);
        grad.addColorStop(0.6, `hsla(${b.hue + 40}, 60%, 40%, ${b.alpha * 0.3})`);
        grad.addColorStop(1, `hsla(${b.hue + 60}, 50%, 30%, 0)`);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
        ctx.quadraticCurveTo(p4.x, p4.y, p1.x, p1.y);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedBackground;
