import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";

interface HeaderProps {
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

const LANGUAGES = [
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

const NAV_LINKS = [
  { key: "store", path: "/store" },
  { key: "downloads", path: "/downloads" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "join", path: "/join" },
];

export function Header({
  currentLanguage: propLang,
  onLanguageChange,
}: HeaderProps) {
  const {
    t,
    currentLanguage: ctxLang,
    setLanguage: ctxSetLanguage,
  } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const [location] = useLocation();

  const lang = propLang || ctxLang;
  const setLang = onLanguageChange || ctxSetLanguage;
  const isRtl = lang === "he";

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangOpen, setLangOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".lang-dropdown")) setLangOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Set document direction
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-keren-blue text-white text-sm py-2 hidden md:block">
        <div className="container-haesh flex items-center justify-between">
          <span>🚚 {t("shippingBanner") || "Free shipping from ₪399"}</span>
          <span className="opacity-70">☎ 058-730-8000</span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`navbar-haesh ${isScrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-haesh">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="text-2xl font-extrabold text-keren-blue tracking-tight">
                🔥 {t("fire") || "האש שלי"}
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium no-underline transition-colors
                    ${
                      location === link.path
                        ? "bg-keren-orange-50 text-keren-orange"
                        : "text-gray-600 hover:text-keren-blue hover:bg-gray-50"
                    }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-keren-blue hover:bg-gray-50 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Language selector */}
              <div className="relative lang-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangOpen(!isLangOpen);
                  }}
                  className="flex items-center gap-1 p-2 rounded-lg text-gray-600 hover:text-keren-blue hover:bg-gray-50 transition-colors text-sm"
                  aria-label="Change language"
                >
                  <span>{currentLangObj.flag}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isLangOpen && (
                  <div className="absolute top-full mt-1 end-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors
                          ${lang === l.code ? "font-bold text-keren-orange bg-keren-orange-50" : "text-gray-700"}`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg text-gray-600 hover:text-keren-blue hover:bg-gray-50 transition-colors"
                aria-label={`Cart: ${totalItems} items`}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="badge-count">{totalItems}</span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-keren-blue hover:bg-gray-50 transition-colors"
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search bar (expandable) */}
          {isSearchOpen && (
            <div className="py-3 border-t border-gray-100 animate-fade-in">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder") || "Search..."}
                  className="input-clean ps-10"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
            <div className="container-haesh py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium no-underline transition-colors
                    ${
                      location === link.path
                        ? "bg-keren-orange-50 text-keren-orange"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
