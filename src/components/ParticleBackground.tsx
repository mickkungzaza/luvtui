import { useEffect, useRef } from "react";

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
    this.size = Math.random() * 3 + 1; // Small dots

    // Explode out from point of contact
    this.speedX = Math.random() * 8 - 4;
    this.speedY = Math.random() * 8 - 4;

    // Google Antigravity colors: blue, yellow, red
    const colors = ["#4285F4", "#FBBC05", "#EA4335"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.life = 1; // 1 to 0
  }

  update() {
    // Smooth friction to slow down the initial burst
    this.speedX *= 0.92;
    this.speedY *= 0.92;

    // Slowly float downwards (gentle gravity)
    this.speedY += 0.08;

    this.x += this.speedX;
    this.y += this.speedY;

    // Fade out gracefully over a second or two
    this.life -= 0.012;
    if (this.size > 0.1) this.size -= 0.02; // shrink slowly
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

export function ParticleBackground() {
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
      // Increase spawn density for a rich trail
      for (let i = 0; i < 12; i++) {
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
