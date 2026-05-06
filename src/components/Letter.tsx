import { useState } from "react";

const PAGES = [
  "ในที่สุดก็โตขึ้นอีกแล้วนะคนเก่ง ในปีนี้เราก็ไม่ใช่เด็กกันแล้วแต่ก็อยากให้เธอมีความเป็นเด็กอยู่ในตัว ไม่อยากให้ทิ้งเด็กน้อยที่แสนน่ารักให้ดูคนนั้นไปนะะะ อายุมากขึ้นมาพร้อมกับความคาดหวังที่มากขึ้น แต่อยากจะบอกว่า",
  "เรายังมีโอกาสผิดพลาดได้อีกเยอะ อย่าไปกดดันตัวเองให้มาก ไม่ต้องรีบโตไปมากขนาดนั้น ค่อยๆจับมือกันโตไปพร้อมๆกันนะะ ถึงมันจะมีอะไรหลายอย่างที่เราจะผิดพลาดแต่เราก็แก้ไขกันได้ เพราะงั้น เค้าจะอยู่ข้างๆเธอ แล้วก็จะอยู่ด้วยกัน คอยผลักกันทั้งในเรื่องเรียน เรื่องงาน และก็ทุกๆเรื่องเลยล่ะะะะ",
  "ใกล้เข้าสู่การใส่ครุยแดงไปอีกปีนึงแล้ว เพราะงั้น ตั้งใจฝึกงาน ไม่ต้องกังวลอะไรเลย เพราะเธอจะมีเค้าอยู่ข้างๆเสมอ บางทีมันอาจจะมีหลายเรื่องที่มันยากหรือว่ามันลำบากที่จะผ่านไป แต่เค้าจะคอยอยู่ข้างหลังเพื่อคอยซัพพอร์ตเธอ เหมือนที่เธอซัพพอร์ตเค้ามาตลอดนะคนเก่ง",
  "เธอจะเป็นคนเก่งแบบนี้เสมอ และคนเก่งก็สามารถพักได้เหมือนกันนะ เธอไม่ใช่ขี้แพ้ เธอคือคนที่สู้อย่างหนักแล้วก็ตั้งใจสู้มาตลอด ทุกๆคนรักเธอมากที่สุดเลย ทุกคนอยากเป็นกำลังใจให้เธอก้าวผ่านทุกปัญหาที่ผ่านมาในชีวิต ต่อจากนี้ แล้วก็....",
  "ถึงปีนี้เราจะไม่ได้อยู่ด้วยกันในวันเกิด แต่ก็ขอเป็นกำลังใจในฐานะแจสเปอร์และน้องหวยนะะะ เพราะงั้นๆๆๆ กอดกันเติบโตแบบนี้ต่อไปเรื่อยๆเลยนะะะ ขอให้ปีนี้เป็นปีที่ดี เป็นการเติบโตที่ได้เรียนรู้อะไรใหม่ๆ มีความสุขให้มากๆ ท้องเสียให้น้อยๆ รักษาสุขภาพแข็งแรงนะ",
  "เพราะถ้าเกิดรักษาไม่ดี เดี๋ยวเจอมิคกี้อัดยาแน่!!! 💊🐻",
];

export function Letter({ onGift }: { onGift: () => void }) {
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const isLast = page === PAGES.length - 1;

  const next = () => {
    if (page < PAGES.length - 1) {
      setPage((p) => p + 1);
      setAnimKey((k) => k + 1);
    }
  };
  const prev = () => {
    if (page > 0) {
      setPage((p) => p - 1);
      setAnimKey((k) => k + 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-float-up">
      <div
        className="relative rounded-3xl bg-card shadow-2xl px-6 py-8 sm:px-8 sm:py-10 border border-accent/40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent 0 31px, oklch(0.9 0.04 30 / 0.4) 31px 32px)",
        }}
      >
        {/* tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm bg-accent/50 backdrop-blur" />

        <div className="text-center mb-4">
          <p className="font-script text-2xl text-primary">Happy Birthday</p>
          <p className="font-hand text-xs text-muted-foreground">
            หน้า {page + 1} / {PAGES.length}
          </p>
        </div>

        <div key={animKey} className="animate-page-in min-h-[220px] sm:min-h-[260px]">
          <p className="font-hand text-xl sm:text-2xl leading-loose text-foreground whitespace-pre-line">
            {PAGES[page]}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            disabled={page === 0}
            className="font-hand text-sm px-3 py-2 rounded-full bg-muted text-muted-foreground disabled:opacity-30"
          >
            ← ย้อน
          </button>

          {!isLast ? (
            <button
              onClick={next}
              className="flex-1 font-hand text-sm px-4 py-2 rounded-full bg-secondary text-secondary-foreground active:scale-95 transition"
            >
              <span className="animate-gentle-bounce inline-block">แตะเพื่ออ่านหน้าถัดไป →</span>
            </button>
          ) : (
            <button
              onClick={onGift}
              className="flex-1 font-script text-xl px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg active:scale-95 transition animate-pop-in"
            >
              🎁 กดเพื่อดูของขวัญ!
            </button>
          )}
        </div>
      </div>

      {/* page dots */}
      <div className="flex justify-center gap-2 mt-5">
        {PAGES.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === page ? "w-6 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
