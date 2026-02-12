import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Crown,
  Download,
  Filter,
  Gift,
  Globe,
  Heart,
  Lock,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  Unlock,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SubscriptionCTA } from "../components/SubscriptionCTA";
import { useLanguage } from "../contexts/LanguageContext";
import { breslovDownloadBooks, freeBookIds } from "../data/downloadLinks";

const translations = {
  he: {
    // SEO
    title: "הורדות ספרי ברסלב | האש שלי - הוראת קבע 99₪ לחודש",
    description:
      "הורדו ספרי ברסלv חינמיים או הצטרפו למנוי הוראת קבע (99₪/חודש) לגישה מלאה לכל הספרים הדיגיטליים + 5% הנחה.",

    // Hero Section
    heroTitle: "ספרי ברסלב דיגיטליים",
    heroSubtitle: "הורדות חינמיות ומנוי פרימיום",
    heroDescription:
      "גלו את אוצר הספרים הדיגיטליים של חסידות ברסלב. ספרים חינמיים זמינים לכולם, ומנוי פרימיום עם גישה מלאה לכל הספרים.",

    // Subscription Plan
    subscriptionTitle: "מנוי הוראת קבע פרימיום",
    subscriptionPrice: "99₪",
    subscriptionPeriod: "לחודש",
    subscriptionDescription:
      "גישה מלאה לכל הספרים הדיגיטליים + הנחות על ספרים פיזיים",
    subscriptionFeatures: [
      "גישה לכל הספרים הדיגיטליים (300+ ספרים)",
      "5% הנחה על כל ההזמנות הפיזיות",
      "הורדות ללא הגבלה",
      "גישה מוקדמת לשחרורים חדשים",
      "תמיכה מועדפת",
      "ללא מחויבות - ביטול בכל עת",
    ],
    subscriptionButtonActive: "מנוי פעיל",
    subscriptionButtonJoin: "הצטרפו למנוי",
    subscriptionButtonManage: "ניהול מנוי",

    // Free vs Premium
    freeTitle: "ספרים חינמיים",
    freeSubtitle: "ספרים נבחרים זמינים להורדה חינמית",
    premiumTitle: "ספרים פרימיום",
    premiumSubtitle: "גישה מלאה עם מנוי הוראת קבע",
    premiumLocked: "נדרש מנוי פרימיום",
    downloadFree: "הורדה חינמית",
    downloadPremium: "הורדה פרימיום",

    // Categories
    categoriesTitle: "קטגוריות ספרים",

    // Search & Filters
    searchPlaceholder: "חפשו ספרים...",
    filterCategory: "קטגוריה",
    filterLanguage: "שפה",
    filterType: "סוג",
    allCategories: "כל הקטגוריות",
    allLanguages: "כל השפות",
    allTypes: "הכל",
    freeBooks: "ספרים חינמיים",
    premiumBooks: "ספרים פרימיום",

    // Statistics
    statsTitle: "הספריה במספרים",
    stats: [
      { number: "300+", label: "ספרים דיגיטליים", icon: "BookOpen" },
      { number: "50K+", label: "הורדות חודשיות", icon: "Download" },
      { number: "12", label: "שפות זמינות", icon: "Globe" },
      { number: "4.9", label: "דירוג ממוצע", icon: "Star" },
    ],

    // Benefits
    benefitsTitle: "מה מקבלים במנוי?",
    benefits: [
      {
        title: "ספריה מלאה",
        description: "גישה לכל 300+ הספרים הדיגיטליים בספריה",
        icon: "BookOpen",
      },
      {
        title: "הורדות ללא הגבלה",
        description: "הורידו כמה ספרים שתרצו, ללא מגבלות",
        icon: "Download",
      },
      {
        title: "הנחות על ספרים",
        description: "5% הנחה על כל ההזמנות הפיזיות בחנות",
        icon: "ShoppingCart",
      },
      {
        title: "שחרורים מוקדמים",
        description: "גישה ראשונה לספרים חדשים לפני כולם",
        icon: "Star",
      },
    ],

    // CTA Section
    ctaTitle: "התחילו את המסע הרוחני שלכם",
    ctaSubtitle: "הצטרפו לאלפים הלומדים תורת רבנו הקדוש",
    ctaDescription:
      "מנוי הוראת קבע מעניק לכם גישה מלאה לכל אוצר הספרים של חסידות ברסלב. התחילו היום!",
    ctaButtonTrial: "התחלה ללא התחייבות",
    ctaButtonLearn: "למידע נוסף",

    // Download Categories
    categoryNames: {
      "Likutey Moharan": 'ליקוטי מוהר"ן',
      "Likutey Tefilos": "ליקוטי תפילות",
      "Likutey Halachos": "ליקוטי הלכות",
      "Likutey Eitzos": "לקוטי עצות",
      "Sefer Hamidos": "ספר המידות",
      "Chayei Moharan": 'חיי מוהר"ן',
      "Siporay Masiyos": "ספורי מעשיות",
      "Tikkun HaKlali": "תיקון הכללי",
      "Hebrew Books": "ספרים בעברית",
      Siddur: "סידור",
      "Alim Letrufah": "עלים לתרופה",
      Ashreinu: "אשרינו",
      "Brochures Hébraïques": "חוברות בעברית",
      "Chalukei Hanachal": "חלוקי הנחל",
      "Eitzos Mevu'aros": "עצות המבוארות",
      "Eitzos Yesharos": "עצות ישרות",
      "Hishtapchs HaNefesh": "השתפכות הנפש",
      "Kochvei Ohr": "כוכבי אור",
      "Megilat Koheles": "מגילת קהלת",
      "Meshivas Nefesh": "משיבת נפש",
      "Shemos Hatzadikim": "שמות הצדיקים",
      "Shivchay & Sichos Haran": 'שבחי ושיחות הר"ן',
      "Torahs Utefilos": "תורות ותפילות",
      "Yimay Maharant": 'ימי מוהרנ"ת',
    },

    // Common
    downloadNow: "הורדה עכשיו",
    readOnline: "קריאה מקוונת",
    fileSize: "גודל קובץ",
    language: "שפה",
    pages: "עמודים",
    downloads: "הורדות",
    rating: "דירוג",
  },

  en: {
    // SEO
    title: "Breslov Books Downloads | My Fire - Horat Keva 99₪/month",
    description:
      "Download free Breslov books or join Horat Keva subscription (99₪/month) for full access to all digital books + 5% discount.",

    // Hero Section
    heroTitle: "Breslov Digital Library",
    heroSubtitle: "Free Downloads & Premium Subscription",
    heroDescription:
      "Discover our treasure of digital Breslov books. Free books available to everyone, and premium subscription with full access to all books.",

    // Subscription Plan
    subscriptionTitle: "Horat Keva Premium Subscription",
    subscriptionPrice: "99₪",
    subscriptionPeriod: "per month",
    subscriptionDescription:
      "Full access to all digital books + discounts on physical books",
    subscriptionFeatures: [
      "Access to all digital books (300+ books)",
      "5% discount on all physical orders",
      "Unlimited downloads",
      "Early access to new releases",
      "Priority support",
      "No commitment - cancel anytime",
    ],
    subscriptionButtonActive: "Active Subscription",
    subscriptionButtonJoin: "Join Subscription",
    subscriptionButtonManage: "Manage Subscription",

    // Free vs Premium
    freeTitle: "Free Books",
    freeSubtitle: "Selected books available for free download",
    premiumTitle: "Premium Books",
    premiumSubtitle: "Full access with Horat Keva subscription",
    premiumLocked: "Premium subscription required",
    downloadFree: "Free Download",
    downloadPremium: "Premium Download",

    // Categories
    categoriesTitle: "Book Categories",

    // Search & Filters
    searchPlaceholder: "Search books...",
    filterCategory: "Category",
    filterLanguage: "Language",
    filterType: "Type",
    allCategories: "All Categories",
    allLanguages: "All Languages",
    allTypes: "All",
    freeBooks: "Free Books",
    premiumBooks: "Premium Books",

    // Statistics
    statsTitle: "Library by Numbers",
    stats: [
      { number: "300+", label: "Digital Books", icon: "BookOpen" },
      { number: "50K+", label: "Monthly Downloads", icon: "Download" },
      { number: "12", label: "Languages Available", icon: "Globe" },
      { number: "4.9", label: "Average Rating", icon: "Star" },
    ],

    // Benefits
    benefitsTitle: "What You Get with Subscription",
    benefits: [
      {
        title: "Complete Library",
        description: "Access to all 300+ digital books in the library",
        icon: "BookOpen",
      },
      {
        title: "Unlimited Downloads",
        description: "Download as many books as you want, no limits",
        icon: "Download",
      },
      {
        title: "Book Discounts",
        description: "5% discount on all physical book orders",
        icon: "ShoppingCart",
      },
      {
        title: "Early Releases",
        description: "First access to new books before everyone else",
        icon: "Star",
      },
    ],

    // CTA Section
    ctaTitle: "Begin Your Spiritual Journey",
    ctaSubtitle: "Join thousands learning our holy Rabbi's teachings",
    ctaDescription:
      "Horat Keva subscription gives you full access to all Breslov books treasure. Start today!",
    ctaButtonTrial: "Start Without Commitment",
    ctaButtonLearn: "Learn More",

    // Download Categories
    categoryNames: {
      "Likutey Moharan": "Likutey Moharan",
      "Likutey Tefilos": "Likutey Tefilos",
      "Likutey Halachos": "Likutey Halachos",
      "Likutey Eitzos": "Likutey Eitzos",
      "Sefer Hamidos": "Sefer Hamidos",
      "Chayei Moharan": "Chayei Moharan",
      "Siporay Masiyos": "Siporay Masiyos",
      "Tikkun HaKlali": "Tikkun HaKlali",
      "Hebrew Books": "Hebrew Books",
      Siddur: "Siddur",
      "Alim Letrufah": "Alim Letrufah",
      Ashreinu: "Ashreinu",
      "Brochures Hébraïques": "Hebrew Pamphlets",
      "Chalukei Hanachal": "Chalukei Hanachal",
      "Eitzos Mevu'aros": "Eitzos Mevu'aros",
      "Eitzos Yesharos": "Eitzos Yesharos",
      "Hishtapchs HaNefesh": "Hishtapchs HaNefesh",
      "Kochvei Ohr": "Kochvei Ohr",
      "Megilat Koheles": "Megilat Koheles",
      "Meshivas Nefesh": "Meshivas Nefesh",
      "Shemos Hatzadikim": "Shemos Hatzadikim",
      "Shivchay & Sichos Haran": "Shivchay & Sichos Haran",
      "Torahs Utefilos": "Torahs Utefilos",
      "Yimay Maharant": "Yimay Maharant",
    },

    // Common
    downloadNow: "Download Now",
    readOnline: "Read Online",
    fileSize: "File Size",
    language: "Language",
    pages: "Pages",
    downloads: "Downloads",
    rating: "Rating",
  },

  fr: {
    // SEO
    title: "Téléchargements Livres Breslov | Mon Feu - Horat Keva 99₪/mois",
    description:
      "Téléchargez des livres Breslov gratuits ou rejoignez l'abonnement Horat Keva (99₪/mois) pour un accès complet à tous les livres numériques + 5% de réduction.",

    // Hero Section
    heroTitle: "Bibliothèque Numérique Breslov",
    heroSubtitle: "Téléchargements Gratuits & Abonnement Premium",
    heroDescription:
      "Découvrez notre trésor de livres numériques Breslov. Livres gratuits disponibles pour tous, et abonnement premium avec accès complet à tous les livres.",

    // Subscription Plan
    subscriptionTitle: "Abonnement Horat Keva Premium",
    subscriptionPrice: "99₪",
    subscriptionPeriod: "par mois",
    subscriptionDescription:
      "Accès complet à tous les livres numériques + réductions sur les livres physiques",
    subscriptionFeatures: [
      "Accès à tous les livres numériques (300+ livres)",
      "5% de réduction sur toutes les commandes physiques",
      "Téléchargements illimités",
      "Accès anticipé aux nouvelles sorties",
      "Support prioritaire",
      "Sans engagement - annulez à tout moment",
    ],
    subscriptionButtonActive: "Abonnement Actif",
    subscriptionButtonJoin: "Rejoindre l'Abonnement",
    subscriptionButtonManage: "Gérer l'Abonnement",

    // Free vs Premium
    freeTitle: "Livres Gratuits",
    freeSubtitle: "Livres sélectionnés disponibles en téléchargement gratuit",
    premiumTitle: "Livres Premium",
    premiumSubtitle: "Accès complet avec l'abonnement Horat Keva",
    premiumLocked: "Abonnement premium requis",
    downloadFree: "Téléchargement Gratuit",
    downloadPremium: "Téléchargement Premium",

    // Categories
    categoriesTitle: "Catégories de Livres",

    // Search & Filters
    searchPlaceholder: "Rechercher des livres...",
    filterCategory: "Catégorie",
    filterLanguage: "Langue",
    filterType: "Type",
    allCategories: "Toutes les Catégories",
    allLanguages: "Toutes les Langues",
    allTypes: "Tous",
    freeBooks: "Livres Gratuits",
    premiumBooks: "Livres Premium",

    // Statistics
    statsTitle: "La Bibliothèque en Chiffres",
    stats: [
      { number: "300+", label: "Livres Numériques", icon: "BookOpen" },
      { number: "50K+", label: "Téléchargements Mensuels", icon: "Download" },
      { number: "12", label: "Langues Disponibles", icon: "Globe" },
      { number: "4.9", label: "Note Moyenne", icon: "Star" },
    ],

    // Benefits
    benefitsTitle: "Ce Que Vous Obtenez avec l'Abonnement",
    benefits: [
      {
        title: "Bibliothèque Complète",
        description:
          "Accès à tous les 300+ livres numériques de la bibliothèque",
        icon: "BookOpen",
      },
      {
        title: "Téléchargements Illimités",
        description:
          "Téléchargez autant de livres que vous voulez, sans limites",
        icon: "Download",
      },
      {
        title: "Réductions sur Livres",
        description:
          "5% de réduction sur toutes les commandes de livres physiques",
        icon: "ShoppingCart",
      },
      {
        title: "Sorties Anticipées",
        description: "Premier accès aux nouveaux livres avant tout le monde",
        icon: "Star",
      },
    ],

    // CTA Section
    ctaTitle: "Commencez Votre Voyage Spirituel",
    ctaSubtitle:
      "Rejoignez des milliers apprenant les enseignements de notre saint Rabbi",
    ctaDescription:
      "L'abonnement Horat Keva vous donne un accès complet à tout le trésor des livres Breslov. Commencez aujourd'hui!",
    ctaButtonTrial: "Commencer Sans Engagement",
    ctaButtonLearn: "En Savoir Plus",

    // Common
    downloadNow: "Télécharger Maintenant",
    readOnline: "Lire en Ligne",
    fileSize: "Taille du Fichier",
    language: "Langue",
    pages: "Pages",
    downloads: "Téléchargements",
    rating: "Note",
  },

  es: {
    // SEO
    title: "Descargas Libros Breslov | Mi Fuego - Horat Keva 99₪/mes",
    description:
      "Descarga libros Breslov gratuitos o únete a la suscripción Horat Keva (99₪/mes) para acceso completo a todos los libros digitales + 5% descuento.",

    // Hero Section
    heroTitle: "Biblioteca Digital Breslov",
    heroSubtitle: "Descargas Gratuitas & Suscripción Premium",
    heroDescription:
      "Descubre nuestro tesoro de libros digitales Breslov. Libros gratuitos disponibles para todos, y suscripción premium con acceso completo a todos los libros.",

    // Subscription Plan
    subscriptionTitle: "Suscripción Horat Keva Premium",
    subscriptionPrice: "99₪",
    subscriptionPeriod: "por mes",
    subscriptionDescription:
      "Acceso completo a todos los libros digitales + descuentos en libros físicos",
    subscriptionFeatures: [
      "Acceso a todos los libros digitales (300+ libros)",
      "5% descuento en todos los pedidos físicos",
      "Descargas ilimitadas",
      "Acceso temprano a nuevos lanzamientos",
      "Soporte prioritario",
      "Sin compromiso - cancela en cualquier momento",
    ],
    subscriptionButtonActive: "Suscripción Activa",
    subscriptionButtonJoin: "Unirse a Suscripción",
    subscriptionButtonManage: "Gestionar Suscripción",

    // Free vs Premium
    freeTitle: "Libros Gratuitos",
    freeSubtitle: "Libros seleccionados disponibles para descarga gratuita",
    premiumTitle: "Libros Premium",
    premiumSubtitle: "Acceso completo con suscripción Horat Keva",
    premiumLocked: "Suscripción premium requerida",
    downloadFree: "Descarga Gratuita",
    downloadPremium: "Descarga Premium",

    // Categories
    categoriesTitle: "Categorías de Libros",

    // Search & Filters
    searchPlaceholder: "Buscar libros...",
    filterCategory: "Categoría",
    filterLanguage: "Idioma",
    filterType: "Tipo",
    allCategories: "Todas las Categorías",
    allLanguages: "Todos los Idiomas",
    allTypes: "Todos",
    freeBooks: "Libros Gratuitos",
    premiumBooks: "Libros Premium",

    // Statistics
    statsTitle: "La Biblioteca en Números",
    stats: [
      { number: "300+", label: "Libros Digitales", icon: "BookOpen" },
      { number: "50K+", label: "Descargas Mensuales", icon: "Download" },
      { number: "12", label: "Idiomas Disponibles", icon: "Globe" },
      { number: "4.9", label: "Calificación Promedio", icon: "Star" },
    ],

    // Benefits
    benefitsTitle: "Lo Que Obtienes con la Suscripción",
    benefits: [
      {
        title: "Biblioteca Completa",
        description:
          "Acceso a todos los 300+ libros digitales en la biblioteca",
        icon: "BookOpen",
      },
      {
        title: "Descargas Ilimitadas",
        description: "Descarga tantos libros como quieras, sin límites",
        icon: "Download",
      },
      {
        title: "Descuentos en Libros",
        description: "5% descuento en todos los pedidos de libros físicos",
        icon: "ShoppingCart",
      },
      {
        title: "Lanzamientos Tempranos",
        description: "Primer acceso a nuevos libros antes que todos",
        icon: "Star",
      },
    ],

    // CTA Section
    ctaTitle: "Comienza Tu Viaje Espiritual",
    ctaSubtitle:
      "Únete a miles aprendiendo las enseñanzas de nuestro santo Rabino",
    ctaDescription:
      "La suscripción Horat Keva te da acceso completo a todo el tesoro de libros Breslov. ¡Comienza hoy!",
    ctaButtonTrial: "Empezar Sin Compromiso",
    ctaButtonLearn: "Aprender Más",

    // Common
    downloadNow: "Descargar Ahora",
    readOnline: "Leer en Línea",
    fileSize: "Tamaño de Archivo",
    language: "Idioma",
    pages: "Páginas",
    downloads: "Descargas",
    rating: "Calificación",
  },

  ru: {
    // SEO
    title: "Загрузки Книг Бреслов | Мой Огонь - Хорат Кева 99₪/месяц",
    description:
      "Скачивайте бесплатные книги Бреслов или присоединяйтесь к подписке Хорат Кева (99₪/месяц) для полного доступа ко всем цифровым книгам + 5% скидка.",

    // Hero Section
    heroTitle: "Цифровая Библиотека Бреслов",
    heroSubtitle: "Бесплатные Загрузки & Премиум Подписка",
    heroDescription:
      "Откройте для себя наше сокровище цифровых книг Бреслов. Бесплатные книги доступны всем, и премиум подписка с полным доступом ко всем книгам.",

    // Subscription Plan
    subscriptionTitle: "Подписка Хорат Кева Премиум",
    subscriptionPrice: "99₪",
    subscriptionPeriod: "в месяц",
    subscriptionDescription:
      "Полный доступ ко всем цифровым книгам + скидки на физические книги",
    subscriptionFeatures: [
      "Доступ ко всем цифровым книгам (300+ книг)",
      "5% скидка на все физические заказы",
      "Неограниченные загрузки",
      "Ранний доступ к новым выпускам",
      "Приоритетная поддержка",
      "Без обязательств - отмените в любое время",
    ],
    subscriptionButtonActive: "Активная Подписка",
    subscriptionButtonJoin: "Присоединиться к Подписке",
    subscriptionButtonManage: "Управление Подпиской",

    // Free vs Premium
    freeTitle: "Бесплатные Книги",
    freeSubtitle: "Избранные книги доступны для бесплатной загрузки",
    premiumTitle: "Премиум Книги",
    premiumSubtitle: "Полный доступ с подпиской Хорат Кева",
    premiumLocked: "Требуется премиум подписка",
    downloadFree: "Бесплатная Загрузка",
    downloadPremium: "Премиум Загрузка",

    // Categories
    categoriesTitle: "Категории Книг",

    // Search & Filters
    searchPlaceholder: "Поиск книг...",
    filterCategory: "Категория",
    filterLanguage: "Язык",
    filterType: "Тип",
    allCategories: "Все Категории",
    allLanguages: "Все Языки",
    allTypes: "Все",
    freeBooks: "Бесплатные Книги",
    premiumBooks: "Премиум Книги",

    // Statistics
    statsTitle: "Библиотека в Цифрах",
    stats: [
      { number: "300+", label: "Цифровых Книг", icon: "BookOpen" },
      { number: "50K+", label: "Ежемесячных Загрузок", icon: "Download" },
      { number: "12", label: "Доступных Языков", icon: "Globe" },
      { number: "4.9", label: "Средний Рейтинг", icon: "Star" },
    ],

    // Benefits
    benefitsTitle: "Что Вы Получаете с Подпиской",
    benefits: [
      {
        title: "Полная Библиотека",
        description: "Доступ ко всем 300+ цифровым книгам в библиотеке",
        icon: "BookOpen",
      },
      {
        title: "Неограниченные Загрузки",
        description: "Скачивайте столько книг, сколько хотите, без ограничений",
        icon: "Download",
      },
      {
        title: "Скидки на Книги",
        description: "5% скидка на все заказы физических книг",
        icon: "ShoppingCart",
      },
      {
        title: "Ранние Выпуски",
        description: "Первый доступ к новым книгам до всех остальных",
        icon: "Star",
      },
    ],

    // CTA Section
    ctaTitle: "Начните Свое Духовное Путешествие",
    ctaSubtitle:
      "Присоединяйтесь к тысячам изучающих учения нашего святого Рабби",
    ctaDescription:
      "Подписка Хорат Кева дает вам полный доступ ко всему сокровищу книг Бреслов. Начните сегодня!",
    ctaButtonTrial: "Начать Без Обязательств",
    ctaButtonLearn: "Узнать Больше",

    // Common
    downloadNow: "Скачать Сейчас",
    readOnline: "Читать Онлайн",
    fileSize: "Размер Файла",
    language: "Язык",
    pages: "Страницы",
    downloads: "Загрузки",
    rating: "Рейтинг",
  },
};

// Icon mapping component
const iconMap = {
  BookOpen,
  Download,
  Search,
  Filter,
  Crown,
  Star,
  Lock,
  Unlock,
  CheckCircle,
  Heart,
  Globe,
  Target,
  Users,
  Sparkles,
  ShoppingCart,
  Gift,
  ArrowRight,
  Calendar,
  Award,
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({
  iconName,
  className = "w-6 h-6",
}: {
  iconName: string;
  className?: string;
}) => {
  const Icon = iconMap[iconName as IconKey] ?? BookOpen;
  return <Icon className={className} aria-hidden />;
};

export default function Downloads() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t =
    translations[currentLanguage as keyof typeof translations] ||
    translations.he;
  const isRTL = currentLanguage === "he";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Check subscription status for free access
  const { data: userSubscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ["/api/user/subscription"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isSubscriber = (userSubscription as any)?.user?.isSubscriber || false;
  const subscriptionStatus =
    (userSubscription as any)?.user?.subscriptionStatus || "none";

  // Set document title and meta description
  useEffect(() => {
    document.title = t.title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", t.description);
  }, [t.title, t.description]);

  // Filter books based on search and filters
  const getFilteredBooks = () => {
    let books = breslovDownloadBooks;

    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.titleEnglish.toLowerCase().includes(lowerQuery) ||
          book.description.toLowerCase().includes(lowerQuery),
      );
    }

    if (selectedCategory) {
      books = books.filter((book) => book.category === selectedCategory);
    }

    if (selectedType === "free") {
      books = books.filter((book) => freeBookIds.includes(book.id));
    } else if (selectedType === "premium") {
      books = books.filter((book) => !freeBookIds.includes(book.id));
    }

    return books;
  };

  const filteredBooks = getFilteredBooks();
  const freeBooks = filteredBooks.filter((book) =>
    freeBookIds.includes(book.id),
  );
  const premiumBooks = filteredBooks.filter(
    (book) => !freeBookIds.includes(book.id),
  );

  // Get unique categories
  const getUniqueCategories = () => {
    const categories = Array.from(
      new Set(breslovDownloadBooks.map((book) => book.category)),
    );
    return categories.sort();
  };

  const getCategoryName = (category: string) => {
    const categoryNames = (t as any).categoryNames || {};
    return categoryNames[category] || category;
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="bg-keren-blue text-white py-16 lg:py-24">
          <div className="container-haesh text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-blue-200 text-sm mb-3">{t.heroSubtitle}</p>
            <p className="text-blue-100 text-sm max-w-xl mx-auto">
              {t.heroDescription}
            </p>
          </div>
        </section>

        {/* ── Subscription Card ── */}
        <section className="py-12 bg-gray-50">
          <div className="container-haesh max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm">
              <div className="w-14 h-14 mx-auto bg-keren-blue/10 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-7 h-7 text-keren-blue" />
              </div>
              <h2 className="text-2xl font-bold text-keren-blue mb-2">
                {t.subscriptionTitle}
              </h2>
              <div className="mb-3">
                <span className="text-4xl font-bold text-keren-blue">
                  {t.subscriptionPrice}
                </span>
                <span className="text-gray-500 text-sm mr-1">
                  {t.subscriptionPeriod}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                {t.subscriptionDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 text-start max-w-lg mx-auto">
                {t.subscriptionFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <SubscriptionCTA size="lg" showManageLink={true} />
            </div>
          </div>
        </section>

        {/* ── Search & Filter ── */}
        <section className="py-8">
          <div className="container-haesh max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-5 flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-keren-blue focus:border-keren-blue transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-keren-blue"
              >
                <option value="">{t.allCategories}</option>
                {getUniqueCategories().map((category, index) => (
                  <option key={index} value={category}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-keren-blue"
              >
                <option value="">{t.allTypes}</option>
                <option value="free">{t.freeBooks}</option>
                <option value="premium">{t.premiumBooks}</option>
              </select>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-10 bg-gray-50">
          <div className="container-haesh max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-keren-blue text-center mb-6">
              {t.statsTitle}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {t.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 text-center border border-gray-100"
                >
                  <div className="w-10 h-10 mx-auto bg-keren-blue/10 rounded-lg flex items-center justify-center mb-3">
                    <IconComponent
                      iconName={stat.icon}
                      className="w-5 h-5 text-keren-blue"
                    />
                  </div>
                  <div className="text-2xl font-bold text-keren-blue">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Free Books ── */}
        {freeBooks.length > 0 && (
          <section className="py-10">
            <div className="container-haesh max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-keren-blue mb-2">
                {t.freeTitle}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{t.freeSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {freeBooks.slice(0, 8).map((book, index) => (
                  <div
                    key={book.id}
                    className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                        {t.downloadFree}
                      </span>
                      <Unlock className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-keren-blue transition-colors">
                      {currentLanguage === "he"
                        ? book.title
                        : book.titleEnglish}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {getCategoryName(book.category)}
                    </p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>
                        {t.language}: {book.language}
                      </span>
                      <span>
                        {book.pages} {t.pages}
                      </span>
                    </div>
                    <a
                      href={book.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> {t.downloadNow}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Premium Books ── */}
        {premiumBooks.length > 0 && (
          <section className="py-10 bg-gray-50">
            <div className="container-haesh max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-keren-blue mb-2">
                {t.premiumTitle}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{t.premiumSubtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {premiumBooks.slice(0, 8).map((book, index) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow group relative"
                  >
                    {!isSubscriber && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                        <div className="text-center">
                          <Lock className="w-6 h-6 text-keren-blue mx-auto mb-1" />
                          <p className="text-xs font-medium text-keren-blue">
                            {t.premiumLocked}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 bg-keren-blue/10 text-keren-blue text-xs rounded font-medium">
                        {t.downloadPremium}
                      </span>
                      <Crown className="w-4 h-4 text-keren-blue" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-keren-blue transition-colors">
                      {currentLanguage === "he"
                        ? book.title
                        : book.titleEnglish}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {getCategoryName(book.category)}
                    </p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>
                        {t.language}: {book.language}
                      </span>
                      <span>
                        {book.pages} {t.pages}
                      </span>
                    </div>
                    {isSubscriber ? (
                      <a
                        href={book.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-keren-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> {t.downloadNow}
                      </a>
                    ) : (
                      <a
                        href="/subscription"
                        className="w-full bg-keren-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Crown className="w-4 h-4" /> {t.subscriptionButtonJoin}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Benefits ── */}
        <section className="py-10">
          <div className="container-haesh max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-keren-blue text-center mb-6">
              {t.benefitsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto bg-keren-blue/10 rounded-xl flex items-center justify-center mb-3">
                    <IconComponent
                      iconName={benefit.icon}
                      className="w-6 h-6 text-keren-blue"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-keren-blue text-white">
          <div className="container-haesh max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">{t.ctaTitle}</h2>
            <p className="text-blue-200 text-sm mb-3">{t.ctaSubtitle}</p>
            <p className="text-blue-100 text-sm mb-8 max-w-md mx-auto">
              {t.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/subscription"
                className="bg-white text-keren-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" /> {t.ctaButtonTrial}
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-5 h-5" /> {t.ctaButtonLearn}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
