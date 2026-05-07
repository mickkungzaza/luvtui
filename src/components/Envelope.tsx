interface Props {
  opened: boolean;
  onOpen: () => void;
}

export function Envelope({ opened, onOpen }: Props) {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <button
        onClick={onOpen}
        disabled={opened}
        aria-label="เปิดซองจดหมาย"
        className="relative w-72 h-48 sm:w-96 sm:h-64 transition-transform active:scale-95 cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        {/* envelope body */}
        <div
          className="absolute inset-0 rounded-lg shadow-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.92 0.06 25), oklch(0.86 0.09 30))",
          }}
        />
        {/* letter peeking */}
        <div
          className={`absolute left-3 right-3 top-3 bottom-3 rounded-md bg-card transition-all duration-700 ${opened ? "animate-letter-rise" : ""}`}
        >
          <div className="flex items-center justify-center h-full">
            <span className="font-script text-3xl sm:text-4xl text-primary">♡</span>
          </div>
        </div>
        {/* flap */}
        <div
          className={`absolute inset-x-0 top-0 h-1/2 origin-top ${opened ? "animate-flap-open" : ""}`}
          style={{
            background: "linear-gradient(180deg, oklch(0.88 0.08 28), oklch(0.82 0.1 25))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            zIndex: opened ? 1 : 3,
          }}
        />
        {/* wax seal */}
        {!opened && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.65 0.2 25), oklch(0.45 0.18 22))",
            }}
          >
            <span className="font-script text-primary-foreground text-xl">♥</span>
          </div>
        )}
      </button>
      {!opened && (
        <p className="mt-8 font-hand text-lg text-foreground/80 animate-soft-blink">
          แตะเพื่อเปิดซอง ✨
        </p>
      )}
    </div>
  );
}
