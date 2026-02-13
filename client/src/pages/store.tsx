import {
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import type { Product } from "../../../shared/schema";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";
import { realBreslovProducts } from "../data/realProducts";
import { useSEO } from "../hooks/useSEO";
import { getInterfaceDisplayTitle } from "../utils/bookTitleHelper";
import { getFirstProductImage } from "../utils/imagePathHelper";

/* ═══════════════════════════════════════════
   STORE — OZ VEHADAR CLEAN DESIGN
   Clean white background, design token sidebar,
   ProductCard-style grid, generous whitespace
   ═══════════════════════════════════════════ */

interface Filters {
  categories: string[];
  formats: string[];
  sizes: string[];
  priceRange: [number, number];
  searchQuery: string;
  languages: string[];
  authors: string[];
}

// ── Store Text (translations) ──
const storeText: Record<string, Record<string, string>> = {
  he: {
    title: "ספרי ברסלב",
    subtitle: "האוסף המקיף ביותר של ספרי רבנו הקדוש",
    searchPlaceholder: "חיפוש ספרים...",
    filters: "מסננים",
    clearAll: "נקה הכל",
    priceRange: "טווח מחירים",
    categories: "קטגוריות",
    languages: "שפות",
    authors: "סופרים",
    sizes: "גדלים",
    formats: "כריכות",
    hebrew: "עברית",
    english: "אנגלית",
    french: "צרפתית",
    russian: "רוסית",
    spanish: "ספרדית",
    results: "ספרים",
    of: "מתוך",
    noResults: "לא נמצאו תוצאות",
    tryDifferent: "נסו לשנות את מסנני החיפוש",
    clearFilters: "נקה הכל",
    viewDetails: "צפייה בפרטים",
    addToCart: "הוסף לסל",
    moreHelp: "מחפשים ספר נוסף? צרו קשר ונמצא עבורכם!",
    contactUs: "צרו קשר",
  },
  en: {
    title: "Breslov Books",
    subtitle: "The most comprehensive collection of our holy Master's books",
    searchPlaceholder: "Search books...",
    filters: "Filters",
    clearAll: "Clear All",
    priceRange: "Price Range",
    categories: "Categories",
    languages: "Languages",
    authors: "Authors",
    sizes: "Sizes",
    formats: "Formats",
    hebrew: "Hebrew",
    english: "English",
    french: "French",
    russian: "Russian",
    spanish: "Spanish",
    results: "books",
    of: "of",
    noResults: "No results found",
    tryDifferent: "Try changing the search filters",
    clearFilters: "Clear All",
    viewDetails: "View Details",
    addToCart: "Add to Cart",
    moreHelp: "Looking for another book? Contact us!",
    contactUs: "Contact Us",
  },
  fr: {
    title: "Livres Breslov",
    subtitle: "La collection la plus complète des livres saints",
    searchPlaceholder: "Rechercher des livres...",
    filters: "Filtres",
    clearAll: "Tout effacer",
    priceRange: "Gamme de prix",
    categories: "Catégories",
    languages: "Langues",
    authors: "Auteurs",
    sizes: "Tailles",
    formats: "Reliures",
    hebrew: "Hébreu",
    english: "Anglais",
    french: "Français",
    russian: "Russe",
    spanish: "Espagnol",
    results: "livres",
    of: "sur",
    noResults: "Aucun résultat",
    tryDifferent: "Essayez de modifier les filtres",
    clearFilters: "Tout effacer",
    viewDetails: "Voir les détails",
    addToCart: "Ajouter au panier",
    moreHelp: "Vous cherchez un autre livre ? Contactez-nous !",
    contactUs: "Contactez-nous",
  },
  es: {
    title: "Libros Breslov",
    subtitle: "La colección más completa de libros sagrados",
    searchPlaceholder: "Buscar libros...",
    filters: "Filtros",
    clearAll: "Borrar todo",
    priceRange: "Rango de precios",
    categories: "Categorías",
    languages: "Idiomas",
    authors: "Autores",
    sizes: "Tamaños",
    formats: "Encuadernaciones",
    hebrew: "Hebreo",
    english: "Inglés",
    french: "Francés",
    russian: "Ruso",
    spanish: "Español",
    results: "libros",
    of: "de",
    noResults: "Sin resultados",
    tryDifferent: "Intente cambiar los filtros",
    clearFilters: "Borrar todo",
    viewDetails: "Ver detalles",
    addToCart: "Añadir al carrito",
    moreHelp: "¿Buscas otro libro? ¡Contáctanos!",
    contactUs: "Contáctenos",
  },
  ru: {
    title: "Книги Бреслов",
    subtitle: "Самая полная коллекция священных книг",
    searchPlaceholder: "Поиск книг...",
    filters: "Фильтры",
    clearAll: "Очистить",
    priceRange: "Диапазон цен",
    categories: "Категории",
    languages: "Языки",
    authors: "Авторы",
    sizes: "Размеры",
    formats: "Переплеты",
    hebrew: "Иврит",
    english: "Английский",
    french: "Французский",
    russian: "Русский",
    spanish: "Испанский",
    results: "книг",
    of: "из",
    noResults: "Ничего не найдено",
    tryDifferent: "Попробуйте изменить фильтры",
    clearFilters: "Очистить все",
    viewDetails: "Подробнее",
    addToCart: "В корзину",
    moreHelp: "Ищете другую книгу? Свяжитесь с нами!",
    contactUs: "Свяжитесь с нами",
  },
};

// ── Helper: Normalize language ──
function normalizeLanguage(lang: string | undefined): string {
  if (!lang) return "";
  const l = lang.toLowerCase();
  if (l.includes("français") || l.includes("french") || l.includes("צרפתית"))
    return "Français";
  if (l.includes("hebrew") || l.includes("עברית")) return "עברית";
  if (l.includes("english") || l.includes("אנגלית")) return "English";
  if (l.includes("russian") || l.includes("רוסית")) return "Russian";
  if (l.includes("spanish") || l.includes("español") || l.includes("ספרדית"))
    return "Spanish";
  return lang;
}

// ── FilterSection Component ──
function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 px-1 text-sm font-semibold text-gray-700 hover:text-keren-blue transition-colors"
        aria-expanded={expanded}
      >
        {title}
        {expanded ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {expanded && <div className="pb-3 px-1">{children}</div>}
    </div>
  );
}

// ── Checkbox Item Component ──
function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-keren-orange focus:ring-keren-orange accent-keren-orange"
      />
      <span className="text-sm text-gray-600 group-hover:text-keren-blue transition-colors">
        {label}
      </span>
    </label>
  );
}

// ── Store Product Card (uses design tokens + product data) ──
function StoreProductCard({
  product,
  lang,
  txt,
}: {
  product: Product;
  lang: string;
  txt: Record<string, string>;
}) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const displayTitle = getInterfaceDisplayTitle(product, lang);
  const image = getFirstProductImage(product.images);
  const minPrice = product.variants?.length
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;
  const maxPrice = product.variants?.length
    ? Math.max(...product.variants.map((v) => v.price))
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants && product.variants.length > 0) {
      const v = product.variants[0];
      addItem({
        productId: product.id,
        variantId: v.id,
        name: product.name,
        nameEnglish: product.nameEnglish || product.name,
        image,
        price: v.price,
        quantity: 1,
      });
    }
  };

  return (
    <Link href={`/product/${product.id}`} className="no-underline block">
      <div className="product-card group">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50">
          {image ? (
            <img
              src={image}
              alt={displayTitle}
              className="product-image"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <span className="text-5xl opacity-30">📖</span>
            </div>
          )}
          {/* Quick Add overlay */}
          <div className="quick-add">
            <button
              onClick={handleQuickAdd}
              className="btn-primary text-sm py-2 px-4"
            >
              <ShoppingBag size={16} />
              {txt.addToCart}
            </button>
          </div>
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-600 px-2 py-1 rounded-md">
              {product.category}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-keren-blue transition-colors">
            {displayTitle}
          </h3>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className="text-keren-gold fill-keren-gold"
              />
            ))}
          </div>
          {/* Price */}
          <p className="text-lg font-bold text-keren-orange">
            {minPrice === maxPrice
              ? formatPrice(minPrice)
              : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════
//  MAIN STORE COMPONENT
// ═══════════════════════════════════════════

const storeSeo: Record<string, { title: string; description: string }> = {
  he: {
    title: "החנות - ספרי ברסלב | האש שלי",
    description:
      "כל ספרי רבי נחמן מברסלב במקום אחד. ליקוטי מוהרן, סיפורי מעשיות, ליקוטי תפילות במחיר הקרן.",
  },
  en: {
    title: "Store - Breslov Books | Haesh Sheli",
    description:
      "All Rabbi Nachman of Breslov books in one place. Likutei Moharan, Tales, and Prayers at foundation prices.",
  },
  fr: {
    title: "Boutique - Livres Breslov | Haesh Sheli",
    description:
      "Tous les livres de Rabbi Nachman de Breslov en un seul endroit.",
  },
  es: {
    title: "Tienda - Libros Breslov | Haesh Sheli",
    description: "Todos los libros de Rabí Najmán de Breslov en un solo lugar.",
  },
  ru: {
    title: "Магазин - Книги Бреслова | Аеш Шели",
    description: "Все книги Рабби Нахмана из Бреслова в одном месте.",
  },
};

export default function Store() {
  const { currentLanguage, setLanguage } = useLanguage();
  const { formatPrice } = useCurrency();
  const txt = storeText[currentLanguage] || storeText.he;
  const isRtl = currentLanguage === "he";
  const allProducts = useMemo(() => Object.values(realBreslovProducts), []);
  const seo = storeSeo[currentLanguage] || storeSeo.he;
  useSEO({ title: seo.title, description: seo.description });

  // State
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    formats: [],
    sizes: [],
    priceRange: [0, 1000],
    searchQuery: "",
    languages: [],
    authors: [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    languages: true,
    sizes: false,
    formats: false,
    price: true,
    authors: true,
  });

  // Extract filter options
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const formats = new Set<string>();
    const sizes = new Set<string>();
    const languages = new Set<string>();
    const authors = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    allProducts.forEach((product) => {
      categories.add(product.category);
      if (product.language) languages.add(normalizeLanguage(product.language));
      if (product.author) authors.add(product.author);
      product.variants?.forEach((variant) => {
        if (variant.format) formats.add(variant.format);
        if (variant.size) sizes.add(variant.size);
        if (variant.price) {
          minPrice = Math.min(minPrice, variant.price);
          maxPrice = Math.max(maxPrice, variant.price);
        }
      });
    });

    return {
      categories: Array.from(categories).sort(),
      formats: Array.from(formats).sort(),
      sizes: Array.from(sizes).sort(),
      languages: Array.from(languages).sort(),
      authors: Array.from(authors).sort(),
      priceRange: [
        Math.floor(minPrice === Infinity ? 0 : minPrice),
        Math.ceil(maxPrice),
      ] as [number, number],
    };
  }, [allProducts]);

  // Sync initial price range — runs only once when filterOptions is ready
  const [priceInitialized, setPriceInitialized] = useState(false);
  useEffect(() => {
    if (!priceInitialized && filterOptions.priceRange[1] > 0) {
      setPriceInitialized(true);
      setFilters((prev) => ({ ...prev, priceRange: filterOptions.priceRange }));
    }
  }, [priceInitialized, filterOptions.priceRange]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (
        filters.searchQuery &&
        !product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !(product.nameEnglish || "")
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !(product.description || "")
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      )
        return false;
      if (filters.languages.length > 0) {
        const normalized = normalizeLanguage(product.language);
        if (!filters.languages.includes(normalized)) return false;
      }
      if (
        filters.authors.length > 0 &&
        product.author &&
        !filters.authors.includes(product.author)
      )
        return false;

      // Price + format + size check
      const priceActive =
        filters.priceRange[0] !== filterOptions.priceRange[0] ||
        filters.priceRange[1] !== filterOptions.priceRange[1];
      if (
        priceActive ||
        filters.formats.length > 0 ||
        filters.sizes.length > 0
      ) {
        const hasMatch = product.variants?.some((v) => {
          const fmtOk =
            filters.formats.length === 0 ||
            filters.formats.includes(v.format || "");
          const sizeOk =
            filters.sizes.length === 0 || filters.sizes.includes(v.size || "");
          const priceOk =
            !priceActive ||
            (v.price >= filters.priceRange[0] &&
              v.price <= filters.priceRange[1]);
          return fmtOk && sizeOk && priceOk;
        });
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [allProducts, filters, filterOptions.priceRange]);

  const toggleFilter = <T,>(key: keyof Filters, value: T) => {
    setFilters((prev) => {
      const current = prev[key] as T[];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      formats: [],
      sizes: [],
      priceRange: filterOptions.priceRange,
      searchQuery: "",
      languages: [],
      authors: [],
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFilterCount =
    filters.categories.length +
    filters.languages.length +
    filters.authors.length +
    filters.formats.length +
    filters.sizes.length +
    (filters.searchQuery ? 1 : 0);

  // ── Language label mapping for filter checkboxes ──
  const langLabelMap: Record<string, string> = {
    עברית: txt.hebrew,
    English: txt.english,
    Français: txt.french,
    Russian: txt.russian,
    Spanish: txt.spanish,
  };

  // ── Sidebar content (shared between desktop + mobile) ──
  const sidebarContent = (
    <div className="space-y-1">
      {/* Search */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
          }
          placeholder={txt.searchPlaceholder}
          className="input-clean ps-10 text-sm"
        />
      </div>

      {/* Price Range */}
      <FilterSection
        title={txt.priceRange}
        expanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-3">
          <input
            type="range"
            min={filterOptions.priceRange[0]}
            max={filterOptions.priceRange[1]}
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
            className="w-full accent-keren-orange"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </FilterSection>

      {/* Authors */}
      <FilterSection
        title={txt.authors}
        expanded={expandedSections.authors}
        onToggle={() => toggleSection("authors")}
      >
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {filterOptions.authors.map((author) => (
            <CheckboxItem
              key={author}
              label={author}
              checked={filters.authors.includes(author)}
              onChange={() => toggleFilter("authors", author)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Languages */}
      <FilterSection
        title={txt.languages}
        expanded={expandedSections.languages}
        onToggle={() => toggleSection("languages")}
      >
        <div className="space-y-0.5">
          {filterOptions.languages.map((lang) => (
            <CheckboxItem
              key={lang}
              label={langLabelMap[lang] || lang}
              checked={filters.languages.includes(lang)}
              onChange={() => toggleFilter("languages", lang)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection
        title={txt.categories}
        expanded={expandedSections.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-0.5 max-h-48 overflow-y-auto">
          {filterOptions.categories.map((cat) => (
            <CheckboxItem
              key={cat}
              label={cat}
              checked={filters.categories.includes(cat)}
              onChange={() => toggleFilter("categories", cat)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Sizes */}
      <FilterSection
        title={txt.sizes}
        expanded={expandedSections.sizes}
        onToggle={() => toggleSection("sizes")}
      >
        <div className="space-y-0.5">
          {filterOptions.sizes.map((size) => (
            <CheckboxItem
              key={size}
              label={size}
              checked={filters.sizes.includes(size)}
              onChange={() => toggleFilter("sizes", size)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Formats */}
      <FilterSection
        title={txt.formats}
        expanded={expandedSections.formats}
        onToggle={() => toggleSection("formats")}
      >
        <div className="space-y-0.5 max-h-48 overflow-y-auto">
          {filterOptions.formats.map((fmt) => (
            <CheckboxItem
              key={fmt}
              label={fmt}
              checked={filters.formats.includes(fmt)}
              onChange={() => toggleFilter("formats", fmt)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div style={{ direction: isRtl ? "rtl" : "ltr" }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main id="main-content" className="bg-white min-h-screen">
        {/* ── Page Header ── */}
        <section className="bg-keren-blue-50 border-b border-gray-100">
          <div className="container-haesh py-10 text-center">
            <h1 className="text-keren-blue mb-2">{txt.title}</h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              {txt.subtitle}
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <div className="container-haesh py-8">
          <div className="flex gap-8">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-keren-blue flex items-center gap-2">
                    <SlidersHorizontal size={16} />
                    {txt.filters}
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-keren-orange hover:underline"
                    >
                      {txt.clearAll}
                    </button>
                  )}
                </div>
                {sidebarContent}
              </div>
            </aside>

            {/* ── Main Grid ── */}
            <div className="flex-1 min-w-0">
              {/* Top bar: count + mobile filter toggle */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-keren-blue">
                    {filteredProducts.length}
                  </span>{" "}
                  {txt.of} {allProducts.length} {txt.results}
                </p>

                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden btn-secondary text-sm py-2 px-4"
                >
                  <Filter size={16} />
                  {txt.filters}
                  {activeFilterCount > 0 && (
                    <span className="bg-keren-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ms-1">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <StoreProductCard
                      key={product.id}
                      product={product}
                      lang={currentLanguage}
                      txt={txt}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4 opacity-30">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {txt.noResults}
                  </h3>
                  <p className="text-gray-500 mb-6">{txt.tryDifferent}</p>
                  <button onClick={clearAllFilters} className="btn-primary">
                    {txt.clearFilters}
                  </button>
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-12 text-center border-t border-gray-100 pt-10">
                <p className="text-gray-600 mb-4">{txt.moreHelp}</p>
                <Link href="/contact">
                  <button className="btn-secondary">{txt.contactUs}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ── Mobile Filter Drawer ── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer panel */}
          <div
            className={`absolute top-0 bottom-0 ${isRtl ? "right-0" : "left-0"} w-[85vw] max-w-sm bg-white shadow-xl overflow-y-auto animate-slide-in-${isRtl ? "right" : "left"}`}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-keren-blue flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  {txt.filters}
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-keren-orange hover:underline mb-4"
                >
                  {txt.clearAll} ({activeFilterCount})
                </button>
              )}
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
