import { useState } from 'react';
import { Header } from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, Users, Heart, Star, ArrowRight, Clock, TrendingUp, Sparkles, Eye } from 'lucide-react';

const translations = {
  he: {
    title: 'המגזין - מגזין ברסלב',
    subtitle: 'תוכן מעודכן ועדכני על חיי ברסלב',
    latestArticles: 'מאמרים אחרונים',
    categories: 'קטגוריות',
    featured: 'מומלץ',
    readMore: 'קרא עוד',
    published: 'פורסם',
    author: 'מחבר',
    views: 'צפיות',
    allArticles: 'כל המאמרים',
    categoriesList: {
      teachings: 'תורות',
      stories: 'סיפורים',
      practices: 'תרגולים',
      community: 'קהילה',
      events: 'אירועים'
    },
    articles: [
      {
        id: 1,
        title: 'מצוה גדולה להיות בשמחה תמיד - התורה השלמה',
        excerpt: 'למדו על התורה המפורסמת ביותר של רבי נחמן מברסלב על השמחה הנצחית והחשיבות שלה בחיינו. רבי נחמן לימד: "מצוה גדולה להיות בשמחה תמיד" - זו התורה החזקה ביותר למול כל הקשיים והייסורים בחיים.',
        category: 'teachings',
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 2,
        title: 'התבודדות - השיחה הנשגבת עם הבורא',
        excerpt: 'גלו את סוד ההתבודדות, התפילה האישית והפרטית של רבי נחמן שכל אדם יכול לעשות בכל מקום ובכל זמן. ההתבודדות היא הכח העצום ביותר שניתן לנו - שיחה פשוטה ואישית עם הקדוש ברוך הוא, בשפה שלנו, במילים שלנו.',
        category: 'practices',
        author: 'רבי נחמן מברסלב',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 3,
        title: 'אין שום יאוש בעולם כלל - מסר התקווה',
        excerpt: 'התורה החזקה ביותר של רבי נחמן על התקווה והחשיבות של חיזוק עצמנו בכל מה שאפשר. נ נח נחמ נחמן מאומן! אפילו כשהכל נראה קשה, יש תמיד תקווה. "דע שהאדם צריך לעבור על גשר צר מאוד מאוד, והכלל: לא לפחד כלל!"',
        category: 'teachings',
        author: 'רבי נחמן מברסלב',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 4,
        title: 'סיפורי מעשיות - החכמה הנסתרת',
        excerpt: 'גלו את הסיפורים הנפלאים של רבי נחמן שמכילים חכמה עמוקה וסודות רוחניים לכל נשמה. כל סיפור הוא עולם שלם - מלך, נסיך, יער, מסע... ובתוכם כל החכמה שצריך לחיים האמיתיים.',
        category: 'stories',
        author: 'מסופר ע"י רבי נתן מברסלב',
        date: '2025-01-08',
        views: 890,
        featured: false,
        image: '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
        communityImage: true
      },
      {
        id: 5,
        title: 'עלייה לאומן - מסע רוחני של אלפים',
        excerpt: 'תמונות ודיווחים מאירועי הקהילה הברסלבית ברחבי העולם - עלייה לציון רבי נחמן באומן, ראש השנה, ריקודים, שמחה וחיבור נשמות מכל העולם. אלפי חסידים מתכנסים מדי שנה לחגוג יחד.',
        category: 'community',
        author: 'צילום: קהילת ברסלב עולמית',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/הגרלת-טיסה-לרבינו-הקדוש-קרן-רבי-ישראל.webp',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 6,
        title: 'תרגול היומי - מדריך מעשי לעבודת ה׳',
        excerpt: 'כיצד לשלב את תורת ברסלב בחיי היומיום - טיפים מעשיים לעבודה רוחנית יום-יומית. להתחיל בהתבודדות כל יום, לומר תיקון הכללי, לקרוא ליקוטי מוהרן, ולהיות בשמחה תמיד!',
        category: 'practices',
        author: 'רבי ישראל דב אודסר זצ"ל',
        date: '2025-01-03',
        views: 750,
        featured: false,
        image: '/attached_assets/חיי מוהרן 1_1757275910544.jpg',
        communityImage: true
      },
      {
        id: 7,
        title: 'נ נח נחמ נחמן מאומן - הפתק המפורסם',
        excerpt: 'סיפור גילוי הפתק המופלא של רבי ישראל דב אודסר זצ"ל. "נ נח נחמ נחמן מאומן" - המנטרה הקדושה שמביאה שמחה וגאולה לכל העולם. האש שלי תוקד עד ביאת המשיח!',
        category: 'teachings',
        author: 'רבי ישראל דב אודסר זצ"ל - סבא',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 8,
        title: 'ריקודי ברסלב - חגיגה של שמחה ואמונה',
        excerpt: 'ריקודים עצומים בירושלים ובכל העולם! חסידי ברסלב מתכנסים לרקוד, לשמוח, ולפזר את האור של רבי נחמן. "מצוה גדולה להיות בשמחה" - ובריקוד אנחנו מבטאים את השמחה הזאת!',
        category: 'community',
        author: 'מתעד: צילומי ברסלב',
        date: '2024-12-28',
        views: 1890,
        featured: false,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2023/07/6.d110a0.webp',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg'
        ]
      }
    ]
  },
  en: {
    title: 'The Magazine - Breslov Magazine',
    subtitle: 'Updated and current content about Breslov life',
    latestArticles: 'Latest Articles',
    categories: 'Categories',
    featured: 'Featured',
    readMore: 'Read More',
    published: 'Published',
    author: 'Author',
    views: 'Views',
    allArticles: 'All Articles',
    categoriesList: {
      teachings: 'Teachings',
      stories: 'Stories',
      practices: 'Practices',
      community: 'Community',
      events: 'Events'
    },
    articles: [
      {
        id: 1,
        title: 'It is a Great Mitzvah to Always Be Happy - The Complete Teaching',
        excerpt: 'Learn about Rabbi Nachman of Breslov\'s most famous teaching on eternal joy and its importance in our lives. Rabbi Nachman taught: "It is a great mitzvah to always be in joy" - this is the strongest teaching against all difficulties and suffering in life.',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l',
        date: '2025-01-15',
        views: 1250,
        featured: true,
        image: '/attached_assets/ליקוטי מוהרן 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 2,
        title: 'Hitbodedut - The Sacred Conversation with the Creator',
        excerpt: 'Discover the secret of hitbodedut, Rabbi Nachman\'s personal and private prayer that anyone can do anywhere and anytime. Hitbodedut is the most powerful force given to us - a simple and personal conversation with God, in our language, in our words.',
        category: 'practices',
        author: 'Rabbi Nachman of Breslov',
        date: '2025-01-12',
        views: 980,
        featured: true,
        image: '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
        communityImage: true
      },
      {
        id: 3,
        title: 'There is No Despair in the World - Message of Hope',
        excerpt: 'Rabbi Nachman\'s strongest teaching on hope and the importance of strengthening ourselves in all that is possible. Na Nach Nachma Nachman Meuman! Even when everything seems difficult, there is always hope. "Know that a person must cross over a very, very narrow bridge, and the rule is: not to be afraid at all!"',
        category: 'teachings',
        author: 'Rabbi Nachman of Breslov',
        date: '2025-01-10',
        views: 1560,
        featured: false,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 7,
        title: 'Na Nach Nachma Nachman Meuman - The Famous Note',
        excerpt: 'The story of the miraculous note\'s revelation by Rabbi Israel Dov Odesser zt"l. "Na Nach Nachma Nachman Meuman" - the holy mantra that brings joy and redemption to the entire world. My Fire will burn until the coming of Mashiach!',
        category: 'teachings',
        author: 'Rabbi Israel Dov Odesser zt"l - Saba',
        date: '2025-01-01',
        views: 2340,
        featured: true,
        image: '/attached_assets/ישראל סבא_1757281003112.jpg',
        communityImage: true
      },
      {
        id: 5,
        title: 'Pilgrimage to Uman - Spiritual Journey of Thousands',
        excerpt: 'Photos and reports from Breslov community events worldwide - pilgrimage to Rabbi Nachman\'s gravesite in Uman, Rosh Hashanah, dancing, joy and connection of souls from all over the world. Thousands of Hasidim gather every year to celebrate together.',
        category: 'community',
        author: 'Photography: Breslov World Community',
        date: '2025-01-05',
        views: 1120,
        featured: false,
        image: 'https://www.haesh-sheli.co.il/wp-content/uploads/2025/02/הגרלת-טיסה-לרבינו-הקדוש-קרן-רבי-ישראל.webp',
        communityImage: true,
        memberPhotos: [
          '/attached_assets/ליקוטי תפילות 1_1757275910545.jpg',
          '/attached_assets/סיפורי מעשיות 1_1757275910546.jpg',
          '/attached_assets/ליקוטי עצות 1_1757275910545.jpg',
          '/attached_assets/ישראל סבא_1757281003112.jpg'
        ]
      },
      {
        id: 2,
        title: 'Hitbodedut - The Sacred Conversation with the Creator',
        excerpt: 'Discover the secret of hitbodedut, the personal and private prayer of Rabbi Nachman that anyone can do anywhere and anytime.',
        category: 'practices',
        author: 'My Fire Team',
        date: '2025-01-12',
        views: 980,
        featured: true
      },
      {
        id: 3,
        title: 'There is No Despair in the World - Message of Hope',
        excerpt: 'Rabbi Nachman\'s strongest teaching on hope and the importance of strengthening ourselves in all that is possible.',
        category: 'teachings',
        author: 'My Fire Team',
        date: '2025-01-10',
        views: 1560,
        featured: false
      },
      {
        id: 4,
        title: 'Tales - The Hidden Wisdom',
        excerpt: 'Discover the wonderful stories of Rabbi Nachman that contain deep wisdom and spiritual secrets for every soul.',
        category: 'stories',
        author: 'My Fire Team',
        date: '2025-01-08',
        views: 890,
        featured: false
      },
      {
        id: 5,
        title: 'Community Events - Connecting Souls',
        excerpt: 'Photos and reports from Breslov community events around the world - weeks of connection and joy.',
        category: 'community',
        author: 'My Fire Team',
        date: '2025-01-05',
        views: 1120,
        featured: false
      },
      {
        id: 6,
        title: 'Daily Practice - Practical Guide',
        excerpt: 'How to integrate Breslov teachings into daily life - practical tips for daily spiritual work.',
        category: 'practices',
        author: 'My Fire Team',
        date: '2025-01-03',
        views: 750,
        featured: false
      }
    ]
  }
};

export default function Magazine() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const t = translations[currentLanguage as keyof typeof translations] || translations.he;
  const dir = currentLanguage === 'he' ? 'rtl' : 'ltr';
  
  const featuredArticles = t.articles.filter(a => a.featured);
  const filteredArticles = selectedCategory 
    ? t.articles.filter(a => a.category === selectedCategory)
    : t.articles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50" dir={dir} style={{ position: 'relative', zIndex: 1 }}>
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      {/* Hero Section - Design Premium Inspiré Breslev */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#2563eb] text-white relative overflow-hidden">
        {/* Decorative Elements - Plus Subtils */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#f97316] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/25 shadow-lg hover:bg-white/20 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-[#f97316]" />
            <span className="text-sm font-semibold">
              {currentLanguage === 'he' ? 'תוכן מעודכן יומיומי' :
               currentLanguage === 'en' ? 'Daily Updated Content' :
               currentLanguage === 'fr' ? 'Contenu mis à jour quotidiennement' :
               currentLanguage === 'es' ? 'Contenido actualizado diariamente' :
               'Ежедневно обновляемое содержание'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              {t.title}
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed font-light">
            {t.subtitle}
          </p>
          
          {/* Decorative Line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hot Topics Section - Design Premium Breslev */}
        <div className="mb-16 bg-gradient-to-br from-white via-blue-50/50 to-orange-50/30 rounded-3xl p-8 border-2 border-[#1e40af]/10 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {currentLanguage === 'he' ? 'הנושאים החמים' : 
               currentLanguage === 'en' ? 'Hot Topics' :
               currentLanguage === 'fr' ? 'Sujets Tendance' :
               currentLanguage === 'es' ? 'Temas Populares' :
               'Популярные темы'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'pidyon', he: 'פדיון נפש', en: 'Pidyon Nefesh', fr: 'Pidyon Nefesh', es: 'Pidyon Nefesh', ru: 'Пидйон Нефеш' },
              { key: 'hitbodedut', he: 'התבודדות', en: 'Hitbodedut', fr: 'Hitbodedut', es: 'Hitbodedut', ru: 'Хитбодедут' },
              { key: 'tikkun', he: 'תיקון הכללי', en: 'Tikkun HaKlali', fr: 'Tikkun HaKlali', es: 'Tikkun HaKlali', ru: 'Тикун ХаКлали' },
              { key: 'simcha', he: 'שמחה תמיד', en: 'Always Happy', fr: 'Toujours Joyeux', es: 'Siempre Feliz', ru: 'Всегда Радостен' }
            ].map((topic) => (
              <a 
                key={topic.key}
                href="#" 
                className="group px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-[#f97316] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/0 via-[#f97316]/5 to-[#f97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-sm font-semibold text-gray-700 group-hover:text-[#f97316] transition-colors">
                  {topic[currentLanguage as keyof typeof topic] || topic.he}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Categories Filter - Design Premium */}
        <div className="mb-12 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[#1e40af] via-[#1e3a8a] to-[#2563eb] text-white shadow-xl shadow-blue-500/30 border-2 border-[#f97316] ring-2 ring-[#f97316]/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1e40af] hover:shadow-md'
            }`}
          >
            {t.allArticles}
          </button>
          {Object.entries(t.categoriesList).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-[#1e40af] via-[#1e3a8a] to-[#2563eb] text-white shadow-xl shadow-blue-500/30 border-2 border-[#f97316] ring-2 ring-[#f97316]/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-[#1e40af] hover:shadow-md'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured Articles - Enhanced Design */}
        {selectedCategory === null && featuredArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] rounded-lg">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{t.featured}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#f97316] transform hover:-translate-y-3 hover:scale-[1.02] bg-white rounded-2xl"
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#2563eb] overflow-hidden">
                    {/* Image Overlay */}
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-110 transition-all duration-700"
                      />
                    )}
                    {/* Gradient Overlay - Plus Prononcé */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af]/95 via-[#1e40af]/40 to-transparent"></div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Featured Badge - Design Premium */}
                    <div className="absolute top-5 left-5 px-4 py-2 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white text-xs rounded-full font-bold shadow-2xl flex items-center gap-2 backdrop-blur-sm border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      {t.featured}
                    </div>
                    
                    {/* Content Overlay - Amélioré */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="mb-3">
                        <span className="px-4 py-1.5 bg-white/25 backdrop-blur-md text-white text-xs rounded-full font-semibold border border-white/40 shadow-lg">
                          {t.categoriesList[article.category as keyof typeof t.categoriesList]}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg">{article.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-7">
                    <p className="text-gray-700 dark:text-gray-300 mb-5 line-clamp-3 text-base leading-relaxed font-normal">{article.excerpt}</p>

                    {/* Member Photos - Community Articles */}
                    {article.memberPhotos && article.memberPhotos.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#f97316]" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {currentLanguage === 'he' ? 'חברי הקהילה' :
                             currentLanguage === 'en' ? 'Community Members' :
                             currentLanguage === 'fr' ? 'Membres de la communauté' :
                             currentLanguage === 'es' ? 'Miembros de la comunidad' :
                             'Члены сообщества'}
                          </span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {article.memberPhotos.slice(0, 4).map((photo, idx) => (
                            <img
                              key={idx}
                              src={photo}
                              alt={`Member ${idx + 1}`}
                              className="w-14 h-14 rounded-full object-cover border-2 border-[#f97316] shadow-md hover:scale-110 hover:shadow-xl transition-all cursor-pointer"
                            />
                          ))}
                          {article.memberPhotos.length > 4 && (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] flex items-center justify-center text-white text-sm font-bold shadow-md">
                              +{article.memberPhotos.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString(currentLanguage)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-[#1e40af] hover:text-[#f97316] font-semibold group-hover:gap-3 transition-all">
                        {t.readMore}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles - Modern Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#1e40af]" />
            <h2 className="text-3xl font-bold text-gray-900">{t.latestArticles}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-2 border-gray-100 hover:border-[#1e40af] transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer rounded-2xl"
              >
                <div className="relative h-56 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#2563eb] overflow-hidden">
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-110 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-gray-700 text-xs rounded-lg font-semibold shadow-lg border border-gray-200">
                      {t.categoriesList[article.category as keyof typeof t.categoriesList]}
                    </span>
                    {article.featured && (
                      <div className="px-3 py-1.5 bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white rounded-full shadow-lg border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-white" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-[#1e40af] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5 text-base line-clamp-3 leading-relaxed font-normal">{article.excerpt}</p>

                  {/* Member Photos - Community Articles */}
                  {article.memberPhotos && article.memberPhotos.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-[#f97316]" />
                        <span className="text-xs font-semibold text-gray-700">
                          {currentLanguage === 'he' ? 'חברי הקהילה' :
                           currentLanguage === 'en' ? 'Community Members' :
                           currentLanguage === 'fr' ? 'Membres de la communauté' :
                           currentLanguage === 'es' ? 'Miembros de la comunidad' :
                           'Члены сообщества'}
                        </span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {article.memberPhotos.slice(0, 4).map((photo, idx) => (
                          <img
                            key={idx}
                            src={photo}
                            alt={`Member ${idx + 1}`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#f97316] shadow-sm hover:scale-110 transition-transform cursor-pointer"
                          />
                        ))}
                        {article.memberPhotos.length > 4 && (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] border-2 border-[#f97316] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            +{article.memberPhotos.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString(currentLanguage)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-[#1e40af] hover:text-[#f97316] font-semibold group-hover:gap-2 transition-all">
                      {t.readMore}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
