import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Eye,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const translations = {
  he: {
    title: "המגזין - מגזין ברסלב",
    subtitle: "תוכן מעודכן ועדכני על חיי ברסלב",
    latestArticles: "מאמרים אחרונים",
    categories: "קטגוריות",
    featured: "מומלץ",
    readMore: "קרא עוד",
    published: "פורסם",
    author: "מחבר",
    views: "צפיות",
    allArticles: "כל המאמרים",
    categoriesList: {
      teachings: "תורות",
      stories: "סיפורים",
      practices: "תרגולים",
      community: "קהילה",
      events: "אירועים",
    },
    articles: [
      {
        id: 1,
        title: "מצוה גדולה להיות בשמחה תמיד - התורה השלמה",
        excerpt:
          'למדו על התורה המפורסמת ביותר של רבי נחמן מברסלב על השמחה הנצחית והחשיבות שלה בחיינו. רבי נחמן לימד: "מצוה גדולה להיות בשמחה תמיד" - זו התורה החזקה ביותר למול כל הקשיים והייסורים בחיים.',
        category: "teachings",
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: "2025-01-15",
        views: 1250,
        featured: true,
        image: "/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg",
        communityImage: true,
      },
      {
        id: 2,
        title: "התבודדות - השיחה הנשגבת עם הבורא",
        excerpt:
          "גלו את סוד ההתבודדות, התפילה האישית והפרטית של רבי נחמן שכל אדם יכול לעשות בכל מקום ובכל זמן. ההתבודדות היא הכח העצום ביותר שניתן לנו - שיחה פשוטה ואישית עם הקדוש ברוך הוא, בשפה שלנו, במילים שלנו.",
        category: "practices",
        author: "רבי נחמן מברסלב",
        date: "2025-01-12",
        views: 980,
        featured: true,
        image: "/attached_assets/ליקוטי עצות 1_1757275910545.jpg",
        communityImage: true,
      },
      {
        id: 3,
        title: "אין שום יאוש בעולם כלל - מסר התקווה",
        excerpt:
          'התורה החזקה ביותר של רבי נחמן על התקווה והחשיבות של חיזוק עצמנו בכל מה שאפשר. נ נח נחמ נחמן מאומן! אפילו כשהכל נראה קשה, יש תמיד תקווה. "דע שהאדם צריך לעבור על גשר צר מאוד מאוד, והכלל: לא לפחד כלל!"',
        category: "teachings",
        author: "רבי נחמן מברסלב",
        date: "2025-01-10",
        views: 1560,
        featured: false,
        image: "/attached_assets/ישראל סבא_1757281003112.jpg",
        communityImage: true,
      },
      {
        id: 4,
        title: "סיפורי מעשיות - החכמה הנסתרת",
        excerpt:
          "גלו את הסיפורים הנפלאים של רבי נחמן שמכילים חכמה עמוקה וסודות רוחניים לכל נשמה. כל סיפור הוא עולם שלם - מלך, נסיך, יער, מסע... ובתוכם כל החכמה שצריך לחיים האמיתיים.",
        category: "stories",
        author: 'מסופר ע"י רבי נתן מברסלב',
        date: "2025-01-08",
        views: 890,
        featured: false,
        image: "/attached_assets/סיפורי מעשיות 1_1757275910546.jpg",
        communityImage: true,
      },
      {
        id: 5,
        title: "עלייה לאומן - מסע רוחני של אלפים",
        excerpt:
          "תמונות ודיווחים מאירועי הקהילה הברסלבית ברחבי העולם - עלייה לציון רבי נחמן באומן, ראש השנה, ריקודים, שמחה וחיבור נשמות מכל העולם. אלפי חסידים מתכנסים מדי שנה לחגוג יחד.",
        category: "community",
        author: "צילום: קהילת ברסלב עולמית",
        date: "2025-01-05",
        views: 1120,
        featured: false,
        image:
          "https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/הגרלת-טיסה-לרבינו-הקדוש-קרן-רבי-ישראל.webp",
        communityImage: true,
        memberPhotos: [
          "/attached_assets/ליקוטי תפילות 1_1757275910545.jpg",
          "/attached_assets/סיפורי מעשיות 1_1757275910546.jpg",
          "/attached_assets/ליקוטי עצות 1_1757275910545.jpg",
          "/attached_assets/ישראל סבא_1757281003112.jpg",
        ],
      },
      {
        id: 6,
        title: "תרגול היומי - מדריך מעשי לעבודת ה׳",
        excerpt:
          "כיצד לשלב את תורת ברסלב בחיי היומיום - טיפים מעשיים לעבודה רוחנית יום-יומית. להתחיל בהתבודדות כל יום, לומר תיקון הכללי, לקרוא ליקוטי מוהרן, ולהיות בשמחה תמיד!",
        category: "practices",
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: "2025-01-03",
        views: 750,
        featured: false,
        image: "/attached_assets/חיי מוהרן 1_1757275910544.jpg",
        communityImage: true,
      },
      {
        id: 7,
        title: "נ נח נחמ נחמן מאומן - הפתק המפורסם",
        excerpt:
          'סיפור גילוי הפתק המופלא של רבי ישראל דב אודסר זצ"ל. "נ נח נחמ נחמן מאומן" - המנטרה הקדושה שמביאה שמחה וגאולה לכל העולם. האש שלי תוקד עד ביאת המשיח!',
        category: "teachings",
        author: 'רבי ישראל דב אודסר זצ"ל - סבא',
        date: "2025-01-01",
        views: 2340,
        featured: true,
        image: "/attached_assets/ישראל סבא_1757281003112.jpg",
        communityImage: true,
      },
      {
        id: 8,
        title: "ריקודי ברסלב - חגיגה של שמחה ואמונה",
        excerpt:
          'ריקודים עצומים בירושלים ובכל העולם! חסידי ברסלב מתכנסים לרקוד, לשמוח, ולפזר את האור של רבי נחמן. "מצוה גדולה להיות בשמחה" - ובריקוד אנחנו מבטאים את השמחה הזאת!',
        category: "community",
        author: "מתעד: צילומי ברסלב",
        date: "2024-12-28",
        views: 1890,
        featured: false,
        image:
          "https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp",
        communityImage: true,
        memberPhotos: [
          "/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg",
          "/attached_assets/ליקוטי עצות 1_1757275910545.jpg",
          "/attached_assets/ליקוטי תפילות 1_1757275910545.jpg",
        ],
      },
    ],
  },
  en: {
    title: "The Magazine - Breslov Magazine",
    subtitle: "Updated and current content about Breslov life",
    latestArticles: "Latest Articles",
    categories: "Categories",
    featured: "Featured",
    readMore: "Read More",
    published: "Published",
    author: "Author",
    views: "Views",
    allArticles: "All Articles",
    categoriesList: {
      teachings: "Teachings",
      stories: "Stories",
      practices: "Practices",
      community: "Community",
      events: "Events",
    },
    articles: [
      {
        id: 1,
        title:
          "It is a Great Mitzvah to Always Be Happy - The Complete Teaching",
        excerpt:
          'Learn about Rabbi Nachman of Breslov\'s most famous teaching on eternal joy and its importance in our lives. Rabbi Nachman taught: "It is a great mitzvah to always be in joy" - this is the strongest teaching against all difficulties and suffering in life.',
        category: "teachings",
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: "2025-01-15",
        views: 1250,
        featured: true,
        image: "/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg",
        communityImage: true,
      },
      {
        id: 2,
        title: "Hitbodedut - The Sacred Conversation with the Creator",
        excerpt:
          "Discover the secret of hitbodedut, Rabbi Nachman's personal and private prayer that anyone can do anywhere and anytime. Hitbodedut is the most powerful force given to us - a simple and personal conversation with God, in our language, in our words.",
        category: "practices",
        author: "Rabbi Nachman of Breslov",
        date: "2025-01-12",
        views: 980,
        featured: true,
        image: "/attached_assets/ליקוטי עצות 1_1757275910545.jpg",
        communityImage: true,
      },
      {
        id: 3,
        title: "There is No Despair in the World - Message of Hope",
        excerpt:
          'Rabbi Nachman\'s strongest teaching on hope and the importance of strengthening ourselves in all that is possible. Na Nach Nachma Nachman Meuman! Even when everything seems difficult, there is always hope. "Know that a person must cross over a very, very narrow bridge, and the rule is: not to be afraid at all!"',
        category: "teachings",
        author: "Rabbi Nachman of Breslov",
        date: "2025-01-10",
        views: 1560,
        featured: false,
        image: "/attached_assets/ישראל סבא_1757281003112.jpg",
        communityImage: true,
      },
      {
        id: 7,
        title: "Na Nach Nachma Nachman Meuman - The Famous Note",
        excerpt:
          'The story of the miraculous note\'s revelation by Rabbi Israel Dov Odesser zt"l. "Na Nach Nachma Nachman Meuman" - the holy mantra that brings joy and redemption to the entire world. My Fire will burn until the coming of Mashiach!',
        category: "teachings",
        author: 'Rabbi Israel Dov Odesser zt"l - Saba',
        date: "2025-01-01",
        views: 2340,
        featured: true,
        image: "/attached_assets/ישראל סבא_1757281003112.jpg",
        communityImage: true,
      },
      {
        id: 5,
        title: "Pilgrimage to Uman - Spiritual Journey of Thousands",
        excerpt:
          "Photos and reports from Breslov community events worldwide - pilgrimage to Rabbi Nachman's gravesite in Uman, Rosh Hashanah, dancing, joy and connection of souls from all over the world. Thousands of Hasidim gather every year to celebrate together.",
        category: "community",
        author: "Photography: Breslov World Community",
        date: "2025-01-05",
        views: 1120,
        featured: false,
        image:
          "https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/הגרלת-טיסה-לרבינו-הקדוש-קרן-רבי-ישראל.webp",
        communityImage: true,
        memberPhotos: [
          "/attached_assets/ליקוטי תפילות 1_1757275910545.jpg",
          "/attached_assets/סיפורי מעשיות 1_1757275910546.jpg",
          "/attached_assets/ליקוטי עצות 1_1757275910545.jpg",
          "/attached_assets/ישראל סבא_1757281003112.jpg",
        ],
      },
      {
        id: 2,
        title: "Hitbodedut - The Sacred Conversation with the Creator",
        excerpt:
          "Discover the secret of hitbodedut, the personal and private prayer of Rabbi Nachman that anyone can do anywhere and anytime.",
        category: "practices",
        author: "My Fire Team",
        date: "2025-01-12",
        views: 980,
        featured: true,
      },
      {
        id: 3,
        title: "There is No Despair in the World - Message of Hope",
        excerpt:
          "Rabbi Nachman's strongest teaching on hope and the importance of strengthening ourselves in all that is possible.",
        category: "teachings",
        author: "My Fire Team",
        date: "2025-01-10",
        views: 1560,
        featured: false,
      },
      {
        id: 4,
        title: "Tales - The Hidden Wisdom",
        excerpt:
          "Discover the wonderful stories of Rabbi Nachman that contain deep wisdom and spiritual secrets for every soul.",
        category: "stories",
        author: "My Fire Team",
        date: "2025-01-08",
        views: 890,
        featured: false,
      },
      {
        id: 5,
        title: "Community Events - Connecting Souls",
        excerpt:
          "Photos and reports from Breslov community events around the world - weeks of connection and joy.",
        category: "community",
        author: "My Fire Team",
        date: "2025-01-05",
        views: 1120,
        featured: false,
      },
      {
        id: 6,
        title: "Daily Practice - Practical Guide",
        excerpt:
          "How to integrate Breslov teachings into daily life - practical tips for daily spiritual work.",
        category: "practices",
        author: "My Fire Team",
        date: "2025-01-03",
        views: 750,
        featured: false,
      },
    ],
  },
};

export default function Magazine() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useSEO({
    title:
      currentLanguage === "he"
        ? "המגזין - מאמרי ברסלב | האש שלי"
        : "Magazine - Breslov Articles | Haesh Sheli",
    description:
      currentLanguage === "he"
        ? "מאמרים ותכנים עדכניים על חיי ברסלב, תורות רבי נחמן, סיפורים וקהילה"
        : "Updated articles on Breslov life, Rabbi Nachman teachings, stories and community",
  });

  const t =
    translations[currentLanguage as keyof typeof translations] ||
    translations.he;
  const dir = currentLanguage === "he" ? "rtl" : "ltr";

  const featuredArticles = t.articles.filter((a) => a.featured);
  const filteredArticles = selectedCategory
    ? t.articles.filter((a) => a.category === selectedCategory)
    : t.articles;

  return (
    <div dir={dir}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="bg-keren-blue text-white py-16 lg:py-24">
          <div className="container-haesh text-center max-w-3xl mx-auto">
            <p className="text-blue-200 text-sm mb-3 flex items-center justify-center gap-2">
              <Sparkles size={14} />
              {currentLanguage === "he"
                ? "תוכן מעודכן יומיומי"
                : currentLanguage === "en"
                  ? "Daily Updated Content"
                  : "Contenu mis à jour"}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">{t.title}</h1>
            <p className="text-blue-100 text-sm">{t.subtitle}</p>
          </div>
        </section>

        {/* ── Hot Topics ── */}
        <section className="py-8 bg-gray-50">
          <div className="container-haesh max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-keren-blue mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              {currentLanguage === "he"
                ? "הנושאים החמים"
                : currentLanguage === "en"
                  ? "Hot Topics"
                  : "Sujets Tendance"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  key: "pidyon",
                  he: "פדיון נפש",
                  en: "Pidyon Nefesh",
                  fr: "Pidyon Nefesh",
                },
                {
                  key: "hitbodedut",
                  he: "התבודדות",
                  en: "Hitbodedut",
                  fr: "Hitbodedut",
                },
                {
                  key: "tikkun",
                  he: "תיקון הכללי",
                  en: "Tikkun HaKlali",
                  fr: "Tikkun HaKlali",
                },
                {
                  key: "simcha",
                  he: "שמחה תמיד",
                  en: "Always Happy",
                  fr: "Toujours Joyeux",
                },
              ].map((topic) => (
                <a
                  key={topic.key}
                  href="#"
                  className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-keren-orange hover:shadow-sm transition-all border border-gray-200"
                >
                  {topic[currentLanguage as keyof typeof topic] || topic.he}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="py-6">
          <div className="container-haesh max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedCategory === null ? "bg-keren-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {t.allArticles}
            </button>
            {Object.entries(t.categoriesList).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedCategory === key ? "bg-keren-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Featured ── */}
        {selectedCategory === null && featuredArticles.length > 0 && (
          <section className="pb-10">
            <div className="container-haesh max-w-5xl mx-auto">
              <h2 className="text-xl font-bold text-keren-blue mb-6 flex items-center gap-2">
                <Star size={18} className="text-keren-orange" /> {t.featured}
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-48 bg-keren-blue overflow-hidden">
                      {article.image && (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-keren-orange text-white text-xs rounded-md font-semibold flex items-center gap-1">
                        <Star size={10} className="fill-current" /> {t.featured}
                      </span>
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-white/80 text-gray-700 text-xs rounded font-medium">
                        {
                          t.categoriesList[
                            article.category as keyof typeof t.categoriesList
                          ]
                        }
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      {article.memberPhotos &&
                        article.memberPhotos.length > 0 && (
                          <div className="flex gap-1 mb-3">
                            {article.memberPhotos
                              .slice(0, 4)
                              .map((photo: string, idx: number) => (
                                <img
                                  key={idx}
                                  src={photo}
                                  alt=""
                                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                              ))}
                          </div>
                        )}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(article.date).toLocaleDateString(
                              currentLanguage,
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={10} />
                            {article.views.toLocaleString()}
                          </span>
                        </div>
                        <button className="text-keren-blue font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                          {t.readMore} <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All Articles ── */}
        <section className="py-10 bg-gray-50">
          <div className="container-haesh max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-keren-blue mb-6 flex items-center gap-2">
              <BookOpen size={18} /> {t.latestArticles}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative h-40 bg-keren-blue overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <BookOpen size={32} className="text-white/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 text-gray-700 text-xs rounded font-medium">
                      {
                        t.categoriesList[
                          article.category as keyof typeof t.categoriesList
                        ]
                      }
                    </span>
                    {article.featured && (
                      <span className="absolute top-3 right-3 w-6 h-6 bg-keren-orange rounded-full flex items-center justify-center">
                        <Star size={10} className="text-white fill-current" />
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-keren-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    {article.memberPhotos &&
                      article.memberPhotos.length > 0 && (
                        <div className="flex gap-1 mb-2">
                          {article.memberPhotos
                            .slice(0, 3)
                            .map((photo: string, idx: number) => (
                              <img
                                key={idx}
                                src={photo}
                                alt=""
                                className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
                              />
                            ))}
                        </div>
                      )}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(article.date).toLocaleDateString(
                            currentLanguage,
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={10} />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                      <button className="text-keren-blue font-semibold flex items-center gap-1">
                        {t.readMore} <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
