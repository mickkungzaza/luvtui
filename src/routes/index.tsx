import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Envelope } from "@/components/Envelope";
import { Letter } from "@/components/Letter";
import { GiftDialog } from "@/components/GiftDialog";
import { CursorParticles } from "@/components/CursorParticles";
import bgImage from "@/assets/bg-couple.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday ตุ๊ต๊ะ 💌" },
      { name: "description", content: "จดหมายเซอร์ไพรส์วันเกิดสำหรับคนพิเศษ" },
    ],
  }),
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [gift, setGift] = useState(false);

  // background confetti on mount
  useEffect(() => {
    const colors = ["#f9c5c5", "#fde2e4", "#fad2e1", "#fff1e6", "#f7d9c4"];
    const id = setInterval(() => {
      confetti({
        particleCount: 3,
        startVelocity: 15,
        spread: 90,
        origin: { x: Math.random(), y: -0.1 },
        colors,
        gravity: 0.5,
        scalar: 0.8,
      });
    }, 350);
    return () => clearInterval(id);
  }, []);

  const handleOpen = () => {
    setOpened(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => setShowLetter(true), 1300);
  };

  const handleGift = () => {
    setGift(true);
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, scalar: 1.2 });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10">
      <CursorParticles />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 0.025 60 / 0.8), oklch(0.95 0.05 350 / 0.8))",
          backdropFilter: "blur(2px)",
        }}
      />
      {!showLetter ? (
        <Envelope opened={opened} onOpen={handleOpen} />
      ) : (
        <Letter onGift={handleGift} />
      )}
      <GiftDialog open={gift} onClose={() => setGift(false)} />
    </main>
  );
}
