import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2; // Small dots

    // Smooth spread when spawning
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;

    // Google Antigravity colors: Blue, Red, Yellow, Green
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.life = 1; // 1 to 0
  }

  update() {
    // Friction
    this.speedX *= 0.95;
    this.speedY *= 0.95;

    // Slight gravity
    this.speedY += 0.1;

    this.x += this.speedX;
    this.y += this.speedY;

    // Fade out
    this.life -= 0.015;
    if (this.size > 0.2) this.size -= 0.03;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particlesArray: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleInput = (x: number, y: number) => {
      // Add a burst of particles on movement
      for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle(x, y));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      handleInput(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInput(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);

        if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.2) {
          particlesArray.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    />
  );
}
