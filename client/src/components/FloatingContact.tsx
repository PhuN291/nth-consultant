import { Phone } from "lucide-react";

/**
 * Nút gọi điện thoại nổi cố định ở góc dưới phải.
 * Hiện trên mobile + desktop. Có pulse animation để thu hút mắt.
 */
export function FloatingContact() {
  return (
    <a
      href="tel:0344130989"
      aria-label="Gọi ngay 0344 130 989"
      className="fixed z-40 bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/40 transition-all hover:scale-110 active:scale-95"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping"></span>
      <Phone className="w-6 h-6 relative z-10" />
    </a>
  );
}
