import { useEffect, useState } from "react";
import { useDemoModal } from "@/components/LeadFormModal";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useDemoModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#F8F7F4]/80 border-b border-[rgba(26,26,26,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-heading text-2xl md:text-[28px] tracking-tight text-[#1A1A1A] leading-none"
        >
          coliberal<span className="text-[#D94832]">.</span>ai
        </a>

        <nav className="hidden md:flex items-center gap-9 text-sm text-[#1A1A1A]/80">
          <a href="#solutions" data-testid="nav-solutions" className="hover:text-[#D94832] transition">Solutions</a>
          <a href="#how" data-testid="nav-how" className="hover:text-[#D94832] transition">How it works</a>
          <a href="#roi" data-testid="nav-roi" className="hover:text-[#D94832] transition">ROI</a>
          <a href="#faq" data-testid="nav-faq" className="hover:text-[#D94832] transition">FAQ</a>
        </nav>

        <button
          onClick={open}
          data-testid="nav-cta-button"
          className="btn-primary !py-2.5 !px-5 text-sm"
        >
          Book demo
        </button>
      </div>
    </header>
  );
};

export default Nav;
