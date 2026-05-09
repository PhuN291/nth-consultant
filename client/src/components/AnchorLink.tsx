import { ReactNode, MouseEvent } from "react";
import { useLocation } from "wouter";

/**
 * AnchorLink — link smart cho hash anchor.
 * - Nếu đang trên path của target ('/'), chỉ scroll mượt tới id (không reload).
 * - Nếu khác trang, navigate sang target path rồi scroll khi tới đó.
 * - Update URL hash để có thể share/bookmark.
 *
 * Ví dụ:
 *   <AnchorLink href="#dich-vu">Xem dịch vụ</AnchorLink>
 *   <AnchorLink href="/#dich-vu">Quay về</AnchorLink>
 */
interface AnchorLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function AnchorLink({ href, className, children, onClick }: AnchorLinkProps) {
  const [location, setLocation] = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow modifier keys (open in new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.();

    // Parse href: "#id" or "/path#id"
    const hashIndex = href.indexOf("#");
    if (hashIndex < 0) {
      setLocation(href);
      return;
    }
    const targetPath = hashIndex === 0 ? location : href.slice(0, hashIndex) || "/";
    const targetId = href.slice(hashIndex + 1);

    if (targetPath !== location) {
      // Khác route: navigate trước, sau đó scroll trong useEffect của target page
      // Lưu hash vào sessionStorage để page mới scroll khi mount
      sessionStorage.setItem("__pendingScrollHash", targetId);
      setLocation(targetPath);
    } else {
      // Cùng route: scroll luôn, update hash
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update hash without triggering navigation
        try {
          history.replaceState(null, "", `#${targetId}`);
        } catch {}
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
