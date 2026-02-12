import { ShoppingBag, Star } from "lucide-react";
import React from "react";
import { Link } from "wouter";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import { useLanguage } from "../contexts/LanguageContext";

interface ProductCardProps {
  id: string;
  title: string;
  titleEnglish?: string;
  image: string;
  price: number;
  rating?: number;
  category?: string;
  onQuickAdd?: () => void;
}

export function ProductCard({
  id,
  title,
  titleEnglish,
  image,
  price,
  rating = 5,
  category,
  onQuickAdd,
}: ProductCardProps) {
  const { currentLanguage, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const isRtl = currentLanguage === "he";
  const displayTitle =
    (currentLanguage === "he" ? title : titleEnglish) || title;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd();
    } else {
      addItem({
        productId: id,
        variantId: "default",
        name: title,
        nameEnglish: titleEnglish || title,
        image,
        price,
        quantity: 1,
      });
    }
  };

  return (
    <Link href={`/product/${id}`} className="no-underline block">
      <div className="product-card group">
        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={displayTitle}
            className="product-image"
            loading="lazy"
          />
          {/* Quick add overlay */}
          <div className="quick-add">
            <button
              onClick={handleQuickAdd}
              className="btn-primary text-sm py-2 px-4"
            >
              <ShoppingBag size={16} />
              {t("addToCart")}
            </button>
          </div>
          {/* Category badge */}
          {category && (
            <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-600 px-2 py-1 rounded-md">
              {category}
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
                className={
                  i < rating
                    ? "text-keren-gold fill-keren-gold"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
          {/* Price */}
          <p className="text-lg font-bold text-keren-orange">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
