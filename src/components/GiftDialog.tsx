interface Props {
  open: boolean;
  onClose: () => void;
}

export function GiftDialog({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/40 backdrop-blur-sm animate-pop-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl bg-card p-8 shadow-2xl text-center border-4 border-accent/60"
      >
        <div className="text-6xl mb-4">🐻💖🐻</div>
        <p className="font-script text-3xl text-primary leading-tight">ตึงตังและครอบครัวหมี</p>
        <p className="font-hand text-xl mt-2 text-foreground">รักตุ๊ต๊ะที่สุดในพหุจักรวาลลล</p>
        <button
          onClick={onClose}
          className="mt-6 font-hand px-6 py-2 rounded-full bg-primary text-primary-foreground active:scale-95"
        >
          ปิด
        </button>
      </div>
    </div>
  );
}
