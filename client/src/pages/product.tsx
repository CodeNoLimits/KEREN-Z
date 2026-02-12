import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import {
  Check,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";
import { realBreslovProducts } from "../data/realProducts";
import { getInterfaceDisplayTitle } from "../utils/bookTitleHelper";
import {
  convertImagePath,
  getFirstProductImage,
} from "../utils/imagePathHelper";

/* ═══════════════════════════════════════════
   PRODUCT DETAIL — OZ VEHADAR CLEAN DESIGN
   Image gallery, variant selector, add to cart,
   product details, related products
   ═══════════════════════════════════════════ */

const productText: Record<string, Record<string, string>> = {
  he: {
    addToCart: "הוסף לסל",
    added: "נוסף לסל!",
    addedDesc: "נוסף בהצלחה לסל הקניות",
    outOfStock: "אזל מהמלאי",
    inStock: "במלאי",
    quantity: "כמות",
    chooseVariant: "בחירת גודל וכריכה",
    features: "מאפיינים מיוחדים",
    details: "פרטי המוצר",
    language: "שפה",
    publisher: "הוצאה",
    pages: "עמודים",
    author: "מחבר",
    related: "ספרים דומים",
    reviews: "ביקורות",
    freeShipping: "משלוח חינם מ-₪399",
    securePayment: "תשלום מאובטח",
    easyReturns: "החזרה קלה",
    volumes: "כרכים",
    volume: "כרך אחד",
    dimensions: "מידות",
    binding: "כריכה",
    format: "פורמט",
    size: "גודל",
  },
  en: {
    addToCart: "Add to Cart",
    added: "Added to Cart!",
    addedDesc: "Successfully added to cart",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    quantity: "Quantity",
    chooseVariant: "Choose size & binding",
    features: "Special Features",
    details: "Product Details",
    language: "Language",
    publisher: "Publisher",
    pages: "Pages",
    author: "Author",
    related: "Similar Books",
    reviews: "reviews",
    freeShipping: "Free shipping from ₪399",
    securePayment: "Secure payment",
    easyReturns: "Easy returns",
    volumes: "volumes",
    volume: "1 volume",
    dimensions: "Dimensions",
    binding: "Binding",
    format: "Format",
    size: "Size",
  },
  fr: {
    addToCart: "Ajouter au panier",
    added: "Ajouté au panier !",
    addedDesc: "Ajouté avec succès au panier",
    outOfStock: "Rupture de stock",
    inStock: "En stock",
    quantity: "Quantité",
    chooseVariant: "Choisissez taille et reliure",
    features: "Caractéristiques spéciales",
    details: "Détails du produit",
    language: "Langue",
    publisher: "Éditeur",
    pages: "Pages",
    author: "Auteur",
    related: "Produits similaires",
    reviews: "avis",
    freeShipping: "Livraison gratuite dès ₪399",
    securePayment: "Paiement sécurisé",
    easyReturns: "Retours faciles",
    volumes: "volumes",
    volume: "1 volume",
    dimensions: "Dimensions",
    binding: "Reliure",
    format: "Format",
    size: "Taille",
  },
  es: {
    addToCart: "Añadir al carrito",
    added: "¡Añadido al carrito!",
    addedDesc: "Añadido exitosamente al carrito",
    outOfStock: "Agotado",
    inStock: "En stock",
    quantity: "Cantidad",
    chooseVariant: "Elija tamaño y encuadernación",
    features: "Características especiales",
    details: "Detalles del producto",
    language: "Idioma",
    publisher: "Editor",
    pages: "Páginas",
    author: "Autor",
    related: "Productos similares",
    reviews: "reseñas",
    freeShipping: "Envío gratis desde ₪399",
    securePayment: "Pago seguro",
    easyReturns: "Devoluciones fáciles",
    volumes: "volúmenes",
    volume: "1 volumen",
    dimensions: "Dimensiones",
    binding: "Encuadernación",
    format: "Formato",
    size: "Tamaño",
  },
  ru: {
    addToCart: "В корзину",
    added: "Добавлено в корзину!",
    addedDesc: "Успешно добавлено в корзину",
    outOfStock: "Нет в наличии",
    inStock: "В наличии",
    quantity: "Количество",
    chooseVariant: "Выберите размер и переплет",
    features: "Особые характеристики",
    details: "Детали продукта",
    language: "Язык",
    publisher: "Издатель",
    pages: "Страницы",
    author: "Автор",
    related: "Похожие книги",
    reviews: "отзывов",
    freeShipping: "Бесплатная доставка от ₪399",
    securePayment: "Безопасная оплата",
    easyReturns: "Простой возврат",
    volumes: "томов",
    volume: "1 том",
    dimensions: "Размеры",
    binding: "Переплет",
    format: "Формат",
    size: "Размер",
  },
};

export default function Product() {
  const [match, params] = useRoute("/product/:id");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const txt = productText[currentLanguage] || productText.he;
  const isRtl = currentLanguage === "he";

  if (!match || !params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t("error")}</p>
      </div>
    );
  }

  const product = realBreslovProducts[params.id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{t("noResults")}</p>
      </div>
    );
  }

  const productTitle = isRtl ? product.name : product.nameEn || product.name;
  useSEO({
    title: `${productTitle} | ${isRtl ? "האש שלי" : "Haesh Sheli"}`,
    description: product.description?.slice(0, 160) || productTitle,
    ogImage: product.image,
    ogType: "product",
  });

  const variants = product.variants || [];
  const currentVariant =
    variants.find((v) => v.id === selectedVariant) || variants[0];

  const handleAddToCart = () => {
    if (!currentVariant?.inStock) return;
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      name: getInterfaceDisplayTitle(product, currentLanguage),
      nameEnglish: product.nameEnglish || product.name,
      image: product.images?.[0] || "",
      price: currentVariant.price,
      quantity,
      variant: {
        format: currentVariant.format,
        binding: currentVariant.binding,
        size: currentVariant.size,
      },
    });
    toast({
      title: txt.added,
      description: `${getInterfaceDisplayTitle(product, currentLanguage)} — ${txt.addedDesc}`,
    });
  };

  const displayTitle = getInterfaceDisplayTitle(product, currentLanguage);
  const relatedProducts = Object.values(realBreslovProducts)
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div style={{ direction: isRtl ? "rtl" : "ltr" }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Breadcrumb ── */}
        <nav className="container-haesh py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-keren-blue transition-colors">
            {t("home")}
          </Link>
          <span className="mx-2">{isRtl ? "←" : "→"}</span>
          <Link
            href="/store"
            className="hover:text-keren-blue transition-colors"
          >
            {t("store")}
          </Link>
          <span className="mx-2">{isRtl ? "←" : "→"}</span>
          <span className="text-gray-700 font-medium">{displayTitle}</span>
        </nav>

        {/* ── Main Product Section ── */}
        <section className="container-haesh pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ── Image Gallery ── */}
            <div>
              <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 aspect-[3/4]">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={convertImagePath(product.images[selectedImage])}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-20">📖</span>
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? "border-keren-orange ring-2 ring-keren-orange/30"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={convertImagePath(img)}
                        alt={`${displayTitle} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Product Info ── */}
            <div>
              {/* Category badge */}
              <span className="inline-block bg-keren-blue/10 text-keren-blue text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {displayTitle}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-keren-gold fill-keren-gold"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  5.0 (23 {txt.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-keren-orange mb-6">
                {currentVariant
                  ? formatPrice(currentVariant.price)
                  : formatPrice(0)}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {currentLanguage === "en" && product.descriptionEnglish
                  ? product.descriptionEnglish
                  : product.description}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-keren-blue" />
                  {txt.freeShipping}
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={14} className="text-keren-blue" />
                  {txt.securePayment}
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw size={14} className="text-keren-blue" />
                  {txt.easyReturns}
                </span>
              </div>

              {/* ── Variant Selector ── */}
              {variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    {txt.chooseVariant}
                  </h3>
                  <div className="space-y-2 max-h-[280px] overflow-y-auto">
                    {variants.map((variant) => (
                      <label
                        key={variant.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          (selectedVariant || variants[0]?.id) === variant.id
                            ? "border-keren-orange bg-orange-50/50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${!variant.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <input
                          type="radio"
                          name="variant"
                          value={variant.id}
                          checked={
                            (selectedVariant || variants[0]?.id) === variant.id
                          }
                          onChange={(e) => setSelectedVariant(e.target.value)}
                          disabled={!variant.inStock}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            (selectedVariant || variants[0]?.id) === variant.id
                              ? "border-keren-orange bg-keren-orange"
                              : "border-gray-300"
                          }`}
                        >
                          {(selectedVariant || variants[0]?.id) ===
                            variant.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-800">
                            {variant.format} — {variant.size}
                          </div>
                          <div className="text-xs text-gray-500">
                            {variant.dimensions} •{" "}
                            {variant.volumes === 1
                              ? txt.volume
                              : `${variant.volumes} ${txt.volumes}`}
                          </div>
                        </div>
                        <div className="text-end flex-shrink-0">
                          <div className="font-bold text-keren-orange">
                            {formatPrice(variant.price)}
                          </div>
                          <div
                            className={`text-xs ${variant.inStock ? "text-green-600" : "text-red-500"}`}
                          >
                            {variant.inStock ? txt.inStock : txt.outOfStock}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Quantity + Add to Cart ── */}
              <div className="flex gap-3 mb-8">
                {/* Quantity stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!currentVariant?.inStock}
                  className="btn-primary flex-1 py-3 text-base"
                >
                  <ShoppingBag size={18} />
                  {currentVariant?.inStock
                    ? `${txt.addToCart} — ${formatPrice((currentVariant?.price || 0) * quantity)}`
                    : txt.outOfStock}
                </button>
              </div>

              {/* ── Features ── */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">
                    {txt.features}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Check
                          size={16}
                          className="text-keren-orange flex-shrink-0 mt-0.5"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Product Details Table ── */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  {txt.details}
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {product.author && (
                    <>
                      <span className="text-gray-500">{txt.author}</span>
                      <span className="font-medium text-gray-700">
                        {product.author}
                      </span>
                    </>
                  )}
                  <span className="text-gray-500">{txt.language}</span>
                  <span className="font-medium text-gray-700">
                    {product.language}
                  </span>
                  <span className="text-gray-500">{txt.publisher}</span>
                  <span className="font-medium text-gray-700">
                    {product.publisher}
                  </span>
                  {product.pages && (
                    <>
                      <span className="text-gray-500">{txt.pages}</span>
                      <span className="font-medium text-gray-700">
                        {product.pages.toLocaleString()}
                      </span>
                    </>
                  )}
                  {product.isbn && (
                    <>
                      <span className="text-gray-500">ISBN</span>
                      <span className="font-medium text-gray-700">
                        {product.isbn}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="container-haesh">
              <h2 className="text-2xl font-bold text-keren-blue text-center mb-8">
                {txt.related}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {relatedProducts.map((rp) => {
                  const rpImage = getFirstProductImage(rp.images);
                  const rpTitle = getInterfaceDisplayTitle(rp, currentLanguage);
                  const rpMinPrice = rp.variants?.length
                    ? Math.min(...rp.variants.map((v) => v.price))
                    : 0;

                  return (
                    <Link
                      key={rp.id}
                      href={`/product/${rp.id}`}
                      className="no-underline"
                    >
                      <div className="product-card group">
                        <div className="relative overflow-hidden bg-gray-50">
                          {rpImage ? (
                            <img
                              src={rpImage}
                              alt={rpTitle}
                              className="product-image"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full aspect-[3/4] flex items-center justify-center">
                              <span className="text-4xl opacity-20">📖</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-keren-blue transition-colors">
                            {rpTitle}
                          </h3>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className="text-keren-gold fill-keren-gold"
                              />
                            ))}
                          </div>
                          <p className="text-lg font-bold text-keren-orange">
                            {formatPrice(rpMinPrice)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
