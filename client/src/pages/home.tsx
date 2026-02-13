import {
  ArrowRight,
  BookOpen,
  Headphones,
  Heart,
  Shield,
  Truck,
} from "lucide-react";
import { Link } from "wouter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useLanguage } from "../contexts/LanguageContext";
import { useSEO } from "../hooks/useSEO";

/* ═══════════════════════════════════════════
   HOMEPAGE — OZ VEHADAR CLEAN DESIGN
   Sections: Hero → Featured Books → Mission → Services → Newsletter → Footer
   ═══════════════════════════════════════════ */

const FEATURED_BOOKS = [
  {
    id: "likutei-moharan",
    titleHe: "ליקוטי מוהרן",
    titleEn: "Likutei Moharan",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp",
    price: 89,
  },
  {
    id: "likutei-tefilot",
    titleHe: "ליקוטי תפילות",
    titleEn: "Likutei Tefilot",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp",
    price: 69,
  },
  {
    id: "chumash-likutei-halachos",
    titleHe: "חומש ליקוטי הלכות",
    titleEn: "Chumash Likutei Halachos",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/5.d110a0.webp",
    price: 120,
  },
  {
    id: "likutei-halachos",
    titleHe: "ליקוטי הלכות",
    titleEn: "Likutei Halachos",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/2.d110a0.webp",
    price: 99,
  },
  {
    id: "sipurei-maasiyot",
    titleHe: "סיפורי מעשיות",
    titleEn: "Tales of Ancient Times",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%9E%D7%95%D7%A6%D7%A8-3.d110a0.webp",
    price: 59,
  },
  {
    id: "kol-bo-liyeshuot",
    titleHe: "כל בו לישועות",
    titleEn: "Complete Guide to Salvation",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/1.d110a0.webp",
    price: 79,
  },
  {
    id: "sefer-hamidot",
    titleHe: "ספר המידות",
    titleEn: "The Book of Traits",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp",
    price: 49,
  },
  {
    id: "meshivat-nefesh",
    titleHe: "משיבת נפש",
    titleEn: "Restoring the Soul",
    image:
      "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/3.d110a0.webp",
    price: 39,
  },
];

const homeText: Record<string, Record<string, string>> = {
  he: {
    heroTitle: "ספרי רבנו נחמן מברסלב",
    heroSubtitle: "החנות המקוונת הגדולה ביותר לספרי רבנו הקדוש",
    heroCta: "כניסה לחנות",
    heroSecondary: "הורדות חינמיות",
    featuredTitle: "ספרי רבנו המובילים",
    featuredSubtitle: "האוסף המקיף ביותר של ספרי רבי נחמן מברסלב",
    viewAll: "צפו בכל הספרים",
    missionTitle: "קרן רבי ישראל",
    missionSubtitle: "הפצת אור רבי נחמן בעולם כולו",
    missionDesc:
      "קרן רבי ישראל דב אודסר מוקדשת להפצת ספרי רבנו הקדוש בכל העולם. כל רכישה תורמת ישירות לפרסום תורת רבי נחמן.",
    donateBtn: "תרמו עכשיו",
    learnMore: "קראו עוד",
    delivery: "משלוח חינם",
    deliveryDesc: "ברכישה מעל ₪399",
    secure: "רכישה מאובטחת",
    secureDesc: "SSL מאובטח",
    library: "הספריה הגדולה",
    libraryDesc: "מאות ספרי רבנו",
    support: "שירות לקוחות",
    supportDesc: "תמיד זמינים עבורכם",
    quoteTitle: "דף אחד מספרי רבנו",
    quoteText: "יהיה תיקון על הכל!",
    quoteAuthor: "רבי נתן מברסלב",
    raffleTitle: "הגרלה מיוחדת",
    raffleDesc: "קח ספר... והטיסה לאומן עלינו!",
    raffleCta: "הצטרפו להגרלה",
  },
  en: {
    heroTitle: "Rabbi Nachman of Breslov's Books",
    heroSubtitle: "The largest online store for holy books of our Master",
    heroCta: "Enter Store",
    heroSecondary: "Free Downloads",
    featuredTitle: "Featured Books",
    featuredSubtitle:
      "The most comprehensive collection of Rabbi Nachman's books",
    viewAll: "View All Books",
    missionTitle: "Keren Rabbi Israel",
    missionSubtitle: "Spreading Rabbi Nachman's Light Worldwide",
    missionDesc:
      "The Rabbi Israel Dov Odesser Foundation is dedicated to spreading our holy Master's books worldwide. Every purchase directly supports the mission.",
    donateBtn: "Donate Now",
    learnMore: "Learn More",
    delivery: "Free Delivery",
    deliveryDesc: "On orders over ₪399",
    secure: "Secure Shopping",
    secureDesc: "SSL Protected",
    library: "Largest Library",
    libraryDesc: "Hundreds of Rabbenu's books",
    support: "Customer Support",
    supportDesc: "Always available for you",
    quoteTitle: "One Page from Our Master's Books",
    quoteText: "There will be rectification for everything!",
    quoteAuthor: "Rabbi Nathan of Breslov",
    raffleTitle: "Special Raffle",
    raffleDesc: "Take a book... and the flight to Uman is on us!",
    raffleCta: "Join the Raffle",
  },
  fr: {
    heroTitle: "Livres de Rabbi Nachman de Breslov",
    heroSubtitle: "La plus grande librairie en ligne de livres saints",
    heroCta: "Entrer dans la Boutique",
    heroSecondary: "Téléchargements Gratuits",
    featuredTitle: "Livres Principaux",
    featuredSubtitle:
      "La collection la plus complète des livres de Rabbi Nachman",
    viewAll: "Voir tous les Livres",
    missionTitle: "Keren Rabbi Israël",
    missionSubtitle: "Diffuser la lumière de Rabbi Nachman dans le monde",
    missionDesc:
      "La fondation Rabbi Israël Dov Odesser est dédiée à la diffusion des livres saints dans le monde entier.",
    donateBtn: "Faire un Don",
    learnMore: "En Savoir Plus",
    delivery: "Livraison Gratuite",
    deliveryDesc: "À partir de ₪399",
    secure: "Achat Sécurisé",
    secureDesc: "Protégé par SSL",
    library: "Grande Bibliothèque",
    libraryDesc: "Des centaines de livres",
    support: "Service Client",
    supportDesc: "Toujours disponible",
    quoteTitle: "Une Page des Livres de Notre Maître",
    quoteText: "Il y aura une rectification pour tout!",
    quoteAuthor: "Rabbi Nathan de Breslov",
    raffleTitle: "Tirage Spécial",
    raffleDesc: "Prenez un livre... et le vol vers Uman est pour nous!",
    raffleCta: "Participer au Tirage",
  },
  es: {
    heroTitle: "Libros de Rabino Nachman de Breslov",
    heroSubtitle: "La librería en línea más grande de libros sagrados",
    heroCta: "Entrar a la Tienda",
    heroSecondary: "Descargas Gratuitas",
    featuredTitle: "Libros Principales",
    featuredSubtitle: "La colección más completa de libros del Rabino Nachman",
    viewAll: "Ver Todos los Libros",
    missionTitle: "Keren Rabino Israel",
    missionSubtitle: "Difundir la luz del Rabino Nachman en el mundo",
    missionDesc:
      "La fundación Rabino Israel Dov Odesser está dedicada a la difusión de los libros sagrados en todo el mundo.",
    donateBtn: "Donar Ahora",
    learnMore: "Más Información",
    delivery: "Envío Gratis",
    deliveryDesc: "En pedidos mayores a ₪399",
    secure: "Compra Segura",
    secureDesc: "Protegido por SSL",
    library: "Gran Biblioteca",
    libraryDesc: "Cientos de libros",
    support: "Servicio al Cliente",
    supportDesc: "Siempre disponible",
    quoteTitle: "Una Página de los Libros de Nuestro Maestro",
    quoteText: "¡Habrá rectificación para todo!",
    quoteAuthor: "Rabino Nathan de Breslov",
    raffleTitle: "Sorteo Especial",
    raffleDesc: "¡Toma un libro... y el vuelo a Uman corre por nuestra cuenta!",
    raffleCta: "Únete al Sorteo",
  },
  ru: {
    heroTitle: "Книги Рабби Нахмана из Бреслова",
    heroSubtitle: "Крупнейший онлайн-магазин священных книг",
    heroCta: "Войти в Магазин",
    heroSecondary: "Бесплатные Загрузки",
    featuredTitle: "Ведущие Книги",
    featuredSubtitle: "Самая полная коллекция книг Рабби Нахмана",
    viewAll: "Все Книги",
    missionTitle: "Керен Рабби Израэль",
    missionSubtitle: "Распространение света Рабби Нахмана по всему миру",
    missionDesc:
      "Фонд Рабби Израэля Дова Одессера посвящен распространению святых книг по всему миру.",
    donateBtn: "Пожертвовать",
    learnMore: "Узнать Больше",
    delivery: "Бесплатная Доставка",
    deliveryDesc: "При заказе от ₪399",
    secure: "Безопасная Покупка",
    secureDesc: "Защита SSL",
    library: "Большая Библиотека",
    libraryDesc: "Сотни книг Раббену",
    support: "Поддержка",
    supportDesc: "Всегда доступна",
    quoteTitle: "Одна Страница из Книг Нашего Учителя",
    quoteText: "Будет исправление для всего!",
    quoteAuthor: "Рабби Натан из Бреслова",
    raffleTitle: "Специальный Розыгрыш",
    raffleDesc: "Возьмите книгу... а перелет в Умань за наш счет!",
    raffleCta: "Участвовать",
  },
};

const seoData: Record<string, { title: string; description: string }> = {
  he: {
    title: "האש שלי - ספרי רבי נחמן מברסלב | קרן רבי ישראל",
    description:
      "חנות מקוונת לספרי רבי נחמן מברסלב במחיר הקרן. ליקוטי מוהרן, ליקוטי תפילות, סיפורי מעשיות ועוד.",
  },
  en: {
    title: "Haesh Sheli - Rabbi Nachman Books | Keren Rabbi Israel",
    description:
      "Online store for Rabbi Nachman of Breslov books at foundation price. Likutei Moharan, Likutei Tefilot, and more.",
  },
  fr: {
    title: "Haesh Sheli - Livres Rabbi Nachman | Keren Rabbi Israël",
    description:
      "Boutique en ligne de livres de Rabbi Nachman de Breslov. Likoutey Moharan, prières et contes.",
  },
  es: {
    title: "Haesh Sheli - Libros Rabí Najmán | Keren Rabí Israel",
    description:
      "Tienda online de libros de Rabí Najmán de Breslov a precio de fundación.",
  },
  ru: {
    title: "Аеш Шели - Книги Рабби Нахмана | Керен Рабби Исраэль",
    description:
      "Интернет-магазин книг Рабби Нахмана из Бреслова по ценам фонда.",
  },
};

export default function Home() {
  const { currentLanguage, setLanguage } = useLanguage();
  const txt = homeText[currentLanguage] || homeText.he;
  const isRtl = currentLanguage === "he";
  const seo = seoData[currentLanguage] || seoData.he;
  useSEO({ title: seo.title, description: seo.description });

  return (
    <div style={{ direction: isRtl ? "rtl" : "ltr" }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main id="main-content">
        {/* ── HERO SECTION ── */}
        <section className="relative bg-keren-blue overflow-hidden">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(232,104,51,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(201,168,76,0.2) 0%, transparent 50%)",
            }}
          />
          <div className="container-haesh relative z-10 py-20 md:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {txt.heroTitle}
              </h1>
              <p className="text-blue-200 text-lg md:text-xl mb-8 leading-relaxed">
                {txt.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/store">
                  <button className="btn-primary text-lg px-8 py-3">
                    {txt.heroCta}
                    <ArrowRight size={18} className="rtl:rotate-180" />
                  </button>
                </Link>
                <Link href="/downloads">
                  <button className="px-8 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors">
                    {txt.heroSecondary}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES BAR ── */}
        <section className="bg-white border-b border-gray-100">
          <div className="container-haesh py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {
                  icon: <Truck size={24} />,
                  title: txt.delivery,
                  desc: txt.deliveryDesc,
                },
                {
                  icon: <Shield size={24} />,
                  title: txt.secure,
                  desc: txt.secureDesc,
                },
                {
                  icon: <BookOpen size={24} />,
                  title: txt.library,
                  desc: txt.libraryDesc,
                },
                {
                  icon: <Headphones size={24} />,
                  title: txt.support,
                  desc: txt.supportDesc,
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-keren-orange">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED BOOKS ── */}
        <section className="section-haesh bg-white">
          <div className="container-haesh">
            <div className="text-center mb-10">
              <h2 className="text-keren-blue mb-2">{txt.featuredTitle}</h2>
              <p className="text-gray-500 text-base">{txt.featuredSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {FEATURED_BOOKS.map((book) => (
                <ProductCard
                  key={book.id}
                  id={book.id}
                  title={book.titleHe}
                  titleEnglish={book.titleEn}
                  image={book.image}
                  price={book.price}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/store">
                <button className="btn-secondary">
                  {txt.viewAll}
                  <ArrowRight size={16} className="rtl:rotate-180" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── QUOTE SECTION ── */}
        <section className="bg-keren-blue-50 py-14">
          <div className="container-haesh text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-wider text-keren-blue/60 mb-4">
              {txt.quoteTitle}
            </p>
            <blockquote className="text-2xl md:text-3xl font-bold text-keren-blue mb-4 leading-tight">
              "{txt.quoteText}"
            </blockquote>
            <cite className="text-keren-orange font-medium not-italic">
              — {txt.quoteAuthor}
            </cite>
          </div>
        </section>

        {/* ── RAFFLE SECTION ── */}
        <section className="section-haesh bg-white">
          <div className="container-haesh">
            <div className="bg-gradient-to-br from-keren-blue to-keren-blue-dark rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">
                ✈️ {txt.raffleTitle}
              </h2>
              <p className="text-blue-200 text-lg mb-6 max-w-lg mx-auto">
                {txt.raffleDesc}
              </p>
              <Link href="/lottery">
                <button className="btn-primary text-lg px-8 py-3">
                  {txt.raffleCta}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── MISSION / KEREN SECTION ── */}
        <section className="section-haesh bg-keren-orange-50">
          <div className="container-haesh">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-keren-orange/10 text-keren-orange text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Heart size={14} /> {txt.missionTitle}
              </div>
              <h2 className="text-keren-blue mb-4">{txt.missionSubtitle}</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {txt.missionDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/join">
                  <button className="btn-gold">
                    <Heart size={16} />
                    {txt.donateBtn}
                  </button>
                </Link>
                <Link href="/about">
                  <button className="btn-secondary">{txt.learnMore}</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
