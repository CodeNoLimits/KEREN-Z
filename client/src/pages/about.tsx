import heroBooks from "@assets/hero-books-composition.png";
import {
  Award,
  BookOpen,
  ChevronRight,
  Code,
  Download,
  Globe,
  Heart,
  Lightbulb,
  Mail,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  he: {
    // SEO
    title: "אודות האש שלי - המקום שלכם לספרי ברסלב אמיתיים",
    description:
      "למדו על הסיפור מאחורי האש שלי, האתר המוביל לספרי ברסלב באיכות מעולה. הכירו את המייסד יעקב חן והחזון שלנו להפצת אור ברסלב בעולם.",

    // Hero Section
    heroTitle: "אודות האש שלי",
    heroSubtitle: "המקום שלכם לספרי ברסלב אמיתיים באיכות מעולה",
    heroDescription:
      "אנחנו מאמינים שכל יהודי בעולם זכאי לגשת לאוצרות החכמה של רבי נחמן מברסלב. האש שלי נוסדה כדי להביא את האור הברסלבי לכל בית יהודי באמצעות הטכנולוגיה המתקדמת ביו��ר.",
    heroCtaPrimary: "צור קשר עכשיו",
    heroCtaSecondary: "הורדות חינמיות",

    // Founder Section
    founderTitle: "הכירו את המייסד ומשהו של אתכם",
    founderName: "יעקב חן",
    founderRole: "מייסד ומנהל האש שלי",
    founderBio:
      "יעק�� נשאר בעל אמונה עמוקה בברסלב והשתאבות את אלו החוכמות של רבי נחמן. עם זריזות וחיבור עמוק לרוח ברסלב, יעקב הקדיש עצמו למשימה קדושה: להביא את אור רבי נחמן לכל יהודי בעולם, ולא משנה אי שם הם שוהים או מה המצב שלהם. התקווה היא שהספרים והתורות של רבי נחמן יגיעו לכל לב שצריך אותם.",
    founderMission:
      "בעקבות רבי ישראל דב אודסר זצ״ל (הסבא), שהפיץ את מסרו של רבי נחמן בכל המדינות, אנו משתדלים להשלים את המשימה הזו דרך הטכנולוגיה. הטכנולוגיה היא כלי בלבד - הנשמה של העבודה היא להקרים את אור ברסלב לכל אחד.",
    personalValues: "הערכים שלנו",
    values: [
      {
        title: "הפצת אור",
        description: "להביא את חכמת ברסלב לכל אחד",
        icon: "Lightbulb",
      },
      {
        title: "איכות מעולה",
        description: "רק ספרים אמיתיים מהמקורות הנכונים",
        icon: "Award",
      },
      {
        title: "שירות קהילתי",
        description: "לתת את המיטב למען הקהילה הברסלבית",
        icon: "Heart",
      },
      {
        title: "חדשנות טכנולוגית",
        description: "שימוש בטכנולוגיות החדשניות ביותר",
        icon: "Zap",
      },
    ],

    // Stats Section
    statsTitle: "ההשפעה שלנו בעולם",
    statsSubtitle: "נתונים שמראים איך אנחנו משנים את עולם הספרות הברסלבית",
    stats: [
      {
        number: "25,000+",
        label: "משתמשים מכל העולם",
        icon: "Users",
      },
      {
        number: "75,000+",
        label: "הורדות ספרים חינמיות",
        icon: "BookOpen",
      },
      {
        number: "5,500+",
        label: "הזמנות מוצלחות",
        icon: "Award",
      },
      {
        number: "45",
        label: "מדינות עם לקוחות",
        icon: "Globe",
      },
    ],

    // Timeline Section
    timelineTitle: "המסע שלנו",
    timelineSubtitle: "איך האש שלי התפתחה למאגר הספרים הברסלבי המוביל",
    timeline: [
      {
        year: "2023",
        title: "החלום נולד",
        description:
          "זיהינו את הצורך בפלטפורמה מודרנית לספרי ברסלב איכותיים. התחלנו במחקר עמוק על הקהילה והצרכים.",
        duration: "3 חודשים",
      },
      {
        year: "2024",
        title: "פיתוח והקמה",
        description:
          "בניית האתר עם הטכנולוגיות המתקדמות ביותר: React, TypeScript, ומערכות תשלום מאובטחות.",
        duration: "8 חודשים",
      },
      {
        year: "2024",
        title: "השקה ראשונית",
        description:
          "פתיחת האתר לקהל הרחב עם מבחר ספרים מקיף ותמיכה בחמש שפות עיקריות.",
        duration: "2 חודשים",
      },
      {
        year: "2025",
        title: "הרחבה ויעדים",
        description:
          "הוספת תכונות מתקדמות, הרחבת המלאי והגעה לקהילות יהודיות נוספות ברחבי העולם.",
        duration: "מתמשך",
      },
    ],

    // Testimonials Section
    testimonialsTitle: "מה הלקוחות אומרים עלינו",
    testimonialsSubtitle: "הקהילה הברסלבית מכל העולם חולקת את החוויות שלהם",
    testimonials: [
      {
        name: "הרב משה כהן",
        location: "ירושלים, ישראל",
        quote:
          "האתר הכי מתקדם ונוח לקניית ספרי ברסלב. איכות מעולה, שי��ות מהיר, ומבחר שלא קיים בשום מקום אחר. מ��ליץ בחום!",
        rating: 5,
      },
      {
        name: "דוד לוי",
        location: "ברוקלין, ניו יורק",
        quote:
          "סוף סוף מצאתי מקום שמבין את הצרכים שלנו. החיפוש בעברית פועל מושלם, המחירים הוגנים והספרים מגיעים במצב מעולה.",
        rating: 5,
      },
      {
        name: "שרה רוזן",
        location: "לונדון, אנגליה",
        quote:
          "ההורדות החינמיות הן מתנה אמיתית לקהילה. תודה רבה על הטוב לב ועל ההזדמנות ללמוד ולהתקרב לחכמת רבי נחמן.",
        rating: 5,
      },
      {
        name: "יוסף מרדכי",
        location: "מונטריאול, קנדה",
        quote:
          "המשלוחים מהירים, האריזה מקצועית, והשירות מעבר לכל ציפייה. זה בדיוק מה שהקהילה הברסלבית חיפשה במשך שנים.",
        rating: 5,
      },
      {
        name: "רחל גולדברג",
        location: "מלבורן, אוסטרליה",
        quote:
          "האתר קל לשימוש, המידע מדויק והתמיכה בעברית מושלמת. המלצה גדולה למי שמחפש ספ���י ברסלב אמיתיים.",
        rating: 5,
      },
    ],

    // Final CTA Section
    ctaTitle: "הצטרפו למשפחת האש שלי",
    ctaSubtitle:
      "גלו את האוסף המלא של ספרי ברסלב איכותיים ותחילו את המסע הרוחני שלכם היום",
    ctaDescription:
      "בין אם אתם מחפשים ספר מסוים, רוצים לגלות יצירות חדשות, או פשוט רוצים לתמוך במשימה שלנו - אנחנו כאן בשבילכם.",
    ctaButtonPrimary: "חקרו את החנות",
    ctaButtonSecondary: "צרו קשר",
  },

  en: {
    // SEO
    title: "About Keren Rabbi Israel - Your Source for Authentic Breslov Books",
    description:
      "Learn about the story behind Keren Rabbi Israel Dov Odesser, the leading organization for high-quality Breslov books. Discover the legacy of Saba Rabbi Israel Dov Odesser and our mission to spread Breslov light worldwide.",

    // Hero Section
    heroTitle: "About My Fire",
    heroSubtitle: "Your source for authentic high-quality Breslov books",
    heroDescription:
      "We believe every Jew worldwide deserves access to Rabbi Nachman of Breslov's treasure troves of wisdom. My Fire was founded to bring Breslov light to every Jewish home using the most advanced technology.",
    heroCtaPrimary: "Contact Us Now",
    heroCtaSecondary: "Free Downloads",

    // Founder Section
    founderTitle: "Meet the Founder",
    founderName: "Rabbi Israël Dov Odesser זצ״ל - Saba",
    founderRole: "Founder and Director of My Fire",
    founderBio:
      'Rabbi Israël Dov Odesser, known as "Saba", was one of the greatest disseminators of Rabbi Nachman of Breslov\'s teachings in the world. For decades, he dedicated his life to spreading the light of Rabbi Nachman to every Jew in the world, in every country and every language. He merited to discover the holy note "Na Nach Nachma Nachman MeUman" and spread the Breslov light throughout the world. The Keren was founded to continue Saba\'s holy mission and bring Rabbi Nachman\'s books to every Jewish home.',
    founderMission:
      "Following Rabbi Israel Dov Odesser zt\"l (the Saba), who spread Rabbi Nachman's message to all nations, we strive to continue this mission through technology. Technology is merely a tool - the soul of our work is to illuminate the Breslov light for everyone.",
    personalValues: "Our Values",
    values: [
      {
        title: "Spreading Light",
        description: "Bringing Breslov wisdom to everyone",
        icon: "Lightbulb",
      },
      {
        title: "Excellent Quality",
        description: "Only authentic books from the right sources",
        icon: "Award",
      },
      {
        title: "Community Service",
        description: "Giving our best for the Breslov community",
        icon: "Heart",
      },
      {
        title: "Technological Innovation",
        description: "Using the most innovative technologies",
        icon: "Zap",
      },
    ],

    // Stats Section
    statsTitle: "Our Global Impact",
    statsSubtitle:
      "Numbers showing how we're changing the world of Breslov literature",
    stats: [
      {
        number: "25,000+",
        label: "Users Worldwide",
        icon: "Users",
      },
      {
        number: "75,000+",
        label: "Free Book Downloads",
        icon: "BookOpen",
      },
      {
        number: "5,500+",
        label: "Successful Orders",
        icon: "Award",
      },
      {
        number: "45",
        label: "Countries with Customers",
        icon: "Globe",
      },
    ],

    // Timeline Section
    timelineTitle: "Our Journey",
    timelineSubtitle:
      "How My Fire developed into the leading Breslov book repository",
    timeline: [
      {
        year: "2023",
        title: "The Dream Was Born",
        description:
          "We identified the need for a modern platform for quality Breslov books. Started deep research on the community and needs.",
        duration: "3 months",
      },
      {
        year: "2024",
        title: "Development & Establishment",
        description:
          "Building the website with the most advanced technologies: React, TypeScript, and secure payment systems.",
        duration: "8 months",
      },
      {
        year: "2024",
        title: "Initial Launch",
        description:
          "Opening the website to the general public with a comprehensive book selection and support for five main languages.",
        duration: "2 months",
      },
      {
        year: "2025",
        title: "Expansion & Goals",
        description:
          "Adding advanced features, expanding inventory and reaching additional Jewish communities worldwide.",
        duration: "Ongoing",
      },
    ],

    // Testimonials Section
    testimonialsTitle: "What Our Customers Say",
    testimonialsSubtitle:
      "The Breslov community worldwide shares their experiences",
    testimonials: [
      {
        name: "Rabbi Moshe Cohen",
        location: "Jerusalem, Israel",
        quote:
          "The most advanced and convenient website for buying Breslov books. Excellent quality, fast service, and a selection that doesn't exist anywhere else. Highly recommended!",
        rating: 5,
      },
      {
        name: "David Levy",
        location: "Brooklyn, New York",
        quote:
          "Finally found a place that understands our needs. The Hebrew search works perfectly, fair prices and books arrive in excellent condition.",
        rating: 5,
      },
      {
        name: "Sarah Rosen",
        location: "London, England",
        quote:
          "The free downloads are a real gift to the community. Thank you for the kindness and the opportunity to learn and get closer to Rabbi Nachman's wisdom.",
        rating: 5,
      },
      {
        name: "Joseph Mordechai",
        location: "Montreal, Canada",
        quote:
          "Fast shipping, professional packaging, and service beyond all expectations. This is exactly what the Breslov community has been looking for for years.",
        rating: 5,
      },
      {
        name: "Rachel Goldberg",
        location: "Melbourne, Australia",
        quote:
          "Easy to use website, accurate information and perfect Hebrew support. Great recommendation for anyone looking for authentic Breslov books.",
        rating: 5,
      },
    ],

    // Final CTA Section
    ctaTitle: "Join the My Fire Family",
    ctaSubtitle:
      "Discover the complete collection of quality Breslov books and begin your spiritual journey today",
    ctaDescription:
      "Whether you're looking for a specific book, want to discover new works, or simply want to support our mission - we're here for you.",
    ctaButtonPrimary: "Explore the Store",
    ctaButtonSecondary: "Contact Us",
  },

  fr: {
    // SEO
    title: "À Propos de Mon Feu - Votre Source de Livres Breslov Authentiques",
    description:
      "Découvrez l'histoire derrière la Keren Rabbi Israël Dov Odesser, l'organisation leader pour les livres Breslov de haute qualité. Découvrez l'héritage de Saba Rabbi Israël Dov Odesser et notre mission de répandre la lumière Breslov dans le monde.",

    // Hero Section
    heroTitle: "À Propos de Mon Feu",
    heroSubtitle:
      "Votre source de livres Breslov authentiques de haute qualité",
    heroDescription:
      "Nous croyons que chaque Juif dans le monde mérite d'accéder aux trésors de sagesse du Rabbi Nachman de Breslov. Mon Feu a été fondé pour apporter la lumière Breslov à chaque foyer juif en utilisant la technologie la plus avancée.",
    heroCtaPrimary: "Contactez-Nous Maintenant",
    heroCtaSecondary: "Téléchargements Gratuits",

    // Founder Section
    founderTitle: "Rencontrez le Fondateur",
    founderName: "Rabbi Israël Dov Odesser זצ״ל - Saba",
    founderRole: "Fondateur et Directeur de Mon Feu",
    founderBio:
      'Rabbi Israël Dov Odesser, connu sous le nom de "Saba", était l\'un des plus grands diffuseurs des enseignements du Rabbi Nachman de Breslov dans le monde. Pendant des décennies, il a consacré sa vie à répandre la lumière du Rabbi Nachman à chaque Juif du monde, dans chaque pays et chaque langue. Il a mérité de découvrir le note sacré "Na Nach Nachma Nachman MeUman" et de répandre la lumière Breslov dans le monde entier. La Keren a été fondée pour poursuivre la mission sainte de Saba et apporter les livres du Rabbi Nachman à chaque foyer juif.',
    founderMission:
      "En suivant le Rabbi Israel Dov Odesser zt\"l (le Saba), qui a répandu le message du Rabbi Nachman à toutes les nations, nous nous efforçons de poursuivre cette mission par la technologie. La technologie n'est qu'un outil - l'âme de notre travail est d'illuminer la lumière Breslov pour tous.",
    personalValues: "Nos Valeurs",
    values: [
      {
        title: "Répandre la Lumière",
        description: "Apporter la sagesse Breslov à tous",
        icon: "Lightbulb",
      },
      {
        title: "Qualité Excellente",
        description: "Seulement des livres authentiques des bonnes sources",
        icon: "Award",
      },
      {
        title: "Service Communautaire",
        description: "Donner notre meilleur pour la communauté Breslov",
        icon: "Heart",
      },
      {
        title: "Innovation Technologique",
        description: "Utiliser les technologies les plus innovantes",
        icon: "Zap",
      },
    ],

    // Stats Section
    statsTitle: "Notre Impact Mondial",
    statsSubtitle:
      "Des chiffres montrant comment nous changeons le monde de la littérature Breslov",
    stats: [
      {
        number: "25,000+",
        label: "Utilisateurs Mondiaux",
        icon: "Users",
      },
      {
        number: "75,000+",
        label: "Téléchargements de Livres Gratuits",
        icon: "BookOpen",
      },
      {
        number: "5,500+",
        label: "Commandes Réussies",
        icon: "Award",
      },
      {
        number: "45",
        label: "Pays avec Clients",
        icon: "Globe",
      },
    ],

    // Timeline Section
    timelineTitle: "Notre Parcours",
    timelineSubtitle:
      "Comment Mon Feu s'est développé en dépôt de livres Breslov leader",
    timeline: [
      {
        year: "2023",
        title: "Le Rêve Est Né",
        description:
          "Nous avons identifié le besoin d'une plateforme moderne pour les livres Breslov de qualité. Commencé la recherche approfondie sur la communauté et les besoins.",
        duration: "3 mois",
      },
      {
        year: "2024",
        title: "Développement & Établissement",
        description:
          "Construction du site web avec les technologies les plus avancées : React, TypeScript, et systèmes de paiement sécurisés.",
        duration: "8 mois",
      },
      {
        year: "2024",
        title: "Lancement Initial",
        description:
          "Ouverture du site web au grand public avec une sélection complète de livres et support pour cinq langues principales.",
        duration: "2 mois",
      },
      {
        year: "2025",
        title: "Expansion & Objectifs",
        description:
          "Ajout de fonctionnalités avancées, expansion de l'inventaire et atteinte de communautés juives supplémentaires dans le monde.",
        duration: "En cours",
      },
    ],

    // Testimonials Section
    testimonialsTitle: "Ce Que Disent Nos Clients",
    testimonialsSubtitle:
      "La communauté Breslov mondiale partage ses expériences",
    testimonials: [
      {
        name: "Rabbin Moshe Cohen",
        location: "Jérusalem, Israël",
        quote:
          "Le site web le plus avancé et pratique pour acheter des livres Breslov. Excellente qualité, service rapide, et une sélection qui n'existe nulle part ailleurs. Fortement recommandé !",
        rating: 5,
      },
      {
        name: "David Levy",
        location: "Brooklyn, New York",
        quote:
          "Finalement trouvé un endroit qui comprend nos besoins. La recherche en hébreu fonctionne parfaitement, prix équitables et les livres arrivent en excellent état.",
        rating: 5,
      },
      {
        name: "Sarah Rosen",
        location: "Londres, Angleterre",
        quote:
          "Les téléchargements gratuits sont un vrai cadeau pour la communauté. Merci pour la gentillesse et l'opportunité d'apprendre et de se rapprocher de la sagesse du Rabbi Nachman.",
        rating: 5,
      },
      {
        name: "Joseph Mordechai",
        location: "Montréal, Canada",
        quote:
          "Expédition rapide, emballage professionnel, et service au-delà de toutes les attentes. C'est exactement ce que la communauté Breslov cherchait depuis des années.",
        rating: 5,
      },
      {
        name: "Rachel Goldberg",
        location: "Melbourne, Australie",
        quote:
          "Site web facile à utiliser, informations précises et support hébreu parfait. Grande recommandation pour quiconque cherche des livres Breslov authentiques.",
        rating: 5,
      },
    ],

    // Final CTA Section
    ctaTitle: "Rejoignez la Famille Mon Feu",
    ctaSubtitle:
      "Découvrez la collection complète de livres Breslov de qualité et commencez votre voyage spirituel aujourd'hui",
    ctaDescription:
      "Que vous cherchiez un livre spécifique, vouliez découvrir de nouvelles œuvres, ou simplement soutenir notre mission - nous sommes là pour vous.",
    ctaButtonPrimary: "Explorer la Boutique",
    ctaButtonSecondary: "Contactez-Nous",
  },

  es: {
    // SEO
    title: "Acerca de Mi Fuego - Tu Fuente de Libros Breslov Auténticos",
    description:
      "Aprende sobre la historia detrás de la Keren Rabbi Israel Dov Odesser, la organización líder para libros Breslov de alta calidad. Descubre el legado de Saba Rabbi Israel Dov Odesser y nuestra misión de esparcir la luz Breslov mundialmente.",

    // Hero Section
    heroTitle: "Acerca de Mi Fuego",
    heroSubtitle: "Tu fuente de libros Breslov auténticos de alta calidad",
    heroDescription:
      "Creemos que cada judío en el mundo merece acceder a los tesoros de sabiduría del Rabino Nachman de Breslov. Mi Fuego fue fundado para traer la luz Breslov a cada hogar judío usando la tecnología más avanzada.",
    heroCtaPrimary: "Contáctanos Ahora",
    heroCtaSecondary: "Descargas Gratuitas",

    // Founder Section
    founderTitle: "Conoce al Fundador",
    founderName: "Rabbi Israël Dov Odesser זצ״ל - Saba",
    founderRole: "Fundador y Director de Mi Fuego",
    founderBio:
      'Rabbi Israel Dov Odesser, conocido como "Saba", fue uno de los más grandes difusores de las enseñanzas del Rabino Nachman de Breslov en el mundo. Durante décadas, dedicó su vida a esparcir la luz del Rabino Nachman a cada judío del mundo, en cada país y cada idioma. Merezó descubrir la nota sagrada "Na Nach Nachma Nachman MeUman" y esparcir la luz Breslov por todo el mundo. La Keren fue fundada para continuar la santa misión de Saba y traer los libros del Rabino Nachman a cada hogar judío.',
    founderMission:
      'Siguiendo al Rabino Israel Dov Odesser zt"l (el Saba), quien difundió el mensaje del Rabino Nachman a todas las naciones, nos esforzamos por continuar esta misión a través de la tecnología. La tecnología es solo una herramienta - el alma de nuestro trabajo es iluminar la luz Breslov para todos.',
    personalValues: "Nuestros Valores",
    values: [
      {
        title: "Esparcir Luz",
        description: "Traer sabiduría Breslov a todos",
        icon: "Lightbulb",
      },
      {
        title: "Calidad Excelente",
        description: "Solo libros auténticos de las fuentes correctas",
        icon: "Award",
      },
      {
        title: "Servicio Comunitario",
        description: "Dar nuestro mejor esfuerzo para la comunidad Breslov",
        icon: "Heart",
      },
      {
        title: "Innovación Tecnológica",
        description: "Usar las tecnologías más innovadoras",
        icon: "Zap",
      },
    ],

    // Stats Section
    statsTitle: "Nuestro Impacto Global",
    statsSubtitle:
      "Números mostrando cómo estamos cambiando el mundo de la literatura Breslov",
    stats: [
      {
        number: "25,000+",
        label: "Usuarios Mundiales",
        icon: "Users",
      },
      {
        number: "75,000+",
        label: "Descargas de Libros Gratuitas",
        icon: "BookOpen",
      },
      {
        number: "5,500+",
        label: "Órdenes Exitosas",
        icon: "Award",
      },
      {
        number: "45",
        label: "Países con Clientes",
        icon: "Globe",
      },
    ],

    // Timeline Section
    timelineTitle: "Nuestro Viaje",
    timelineSubtitle:
      "Cómo Mi Fuego se desarrolló en el repositorio líder de libros Breslov",
    timeline: [
      {
        year: "2023",
        title: "El Sueño Nació",
        description:
          "Identificamos la necesidad de una plataforma moderna para libros Breslov de calidad. Comenzamos investigación profunda sobre la comunidad y necesidades.",
        duration: "3 meses",
      },
      {
        year: "2024",
        title: "Desarrollo y Establecimiento",
        description:
          "Construyendo el sitio web con las tecnologías más avanzadas: React, TypeScript, y sistemas de pago seguros.",
        duration: "8 meses",
      },
      {
        year: "2024",
        title: "Lanzamiento Inicial",
        description:
          "Abriendo el sitio web al público general con una selección completa de libros y soporte para cinco idiomas principales.",
        duration: "2 meses",
      },
      {
        year: "2025",
        title: "Expansión y Objetivos",
        description:
          "Agregando características avanzadas, expandiendo inventario y alcanzando comunidades judías adicionales mundialmente.",
        duration: "En curso",
      },
    ],

    // Testimonials Section
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    testimonialsSubtitle:
      "La comunidad Breslov mundial comparte sus experiencias",
    testimonials: [
      {
        name: "Rabino Moshe Cohen",
        location: "Jerusalén, Israel",
        quote:
          "El sitio web más avanzado y conveniente para comprar libros Breslov. Excelente calidad, servicio rápido, y una selección que no existe en ningún otro lugar. ¡Altamente recomendado!",
        rating: 5,
      },
      {
        name: "David Levy",
        location: "Brooklyn, Nueva York",
        quote:
          "Finalmente encontré un lugar que entiende nuestras necesidades. La búsqueda en hebreo funciona perfectamente, precios justos y los libros llegan en excelente condición.",
        rating: 5,
      },
      {
        name: "Sarah Rosen",
        location: "Londres, Inglaterra",
        quote:
          "Las descargas gratuitas son un regalo real para la comunidad. Gracias por la bondad y la oportunidad de aprender y acercarse a la sabiduría del Rabino Nachman.",
        rating: 5,
      },
      {
        name: "Joseph Mordechai",
        location: "Montreal, Canadá",
        quote:
          "Envío rápido, empaquetado profesional, y servicio más allá de todas las expectativas. Esto es exactamente lo que la comunidad Breslov ha estado buscando por años.",
        rating: 5,
      },
      {
        name: "Rachel Goldberg",
        location: "Melbourne, Australia",
        quote:
          "Sitio web fácil de usar, información precisa y soporte en hebreo perfecto. Gran recomendación para cualquiera que busque libros Breslov auténticos.",
        rating: 5,
      },
    ],

    // Final CTA Section
    ctaTitle: "Únete a la Familia Mi Fuego",
    ctaSubtitle:
      "Descubre la colección completa de libros Breslov de calidad y comienza tu viaje espiritual hoy",
    ctaDescription:
      "Ya sea que busques un libro específico, quieras descubrir nuevas obras, o simplemente apoyar nuestra misión - estamos aquí para ti.",
    ctaButtonPrimary: "Explorar la Tienda",
    ctaButtonSecondary: "Contáctanos",
  },

  ru: {
    // SEO
    title: "О Моем Огне - Ваш Источник Подлинных Книг Бреслов",
    description:
      "Узнайте историю создания Моего Огня, ведущего веб-сайта высококачественных книг Бреслов. Познакомьтесь с основателем Яаковом Хеном и нашим видением распространения света Бреслов по всему миру.",

    // Hero Section
    heroTitle: "О Моем Огне",
    heroSubtitle: "Ваш источник подлинных высококачественных книг Бреслов",
    heroDescription:
      "Мы верим, что каждый еврей в мире заслуживает доступа к сокровищницам мудрости рабби Нахмана из Бреслов. Мой Огонь был основан, чтобы принести свет Бреслов в каждый еврейский дом, используя самые передовые технологии.",
    heroCtaPrimary: "Свяжитесь с Нами Сейчас",
    heroCtaSecondary: "Бесплатные Загрузки",

    // Founder Section
    founderTitle: "Познакомьтесь с Основателем",
    founderName: "Яаков Хен",
    founderRole: "Основатель и Разработчик Моего Огня",
    founderBio:
      "Яаков - опытн��й Full-Stack разработчик с глубокой страстью к распространению литературы Бреслов. Имея более 8 лет опыта в разработке передовых веб-сайтов, Яаков посвятил свои технические навыки святой миссии: созданию цифровой революции в мире еврейской литературы.",
    founderMission:
      "Мое видение простое: каждый еврей в мире должен иметь легкий и удобный доступ к мудрости рабби Нахмана. Технология - это инструмент, свет Бреслов - это цель.",
    personalValues: "Наши Ценности",
    values: [
      {
        title: "Распространение Света",
        description: "Принести мудрость Бреслов всем",
        icon: "Lightbulb",
      },
      {
        title: "Отличное Качество",
        description: "Только подлинные книги из правильных источников",
        icon: "Award",
      },
      {
        title: "Служени�� Общине",
        description: "Давать наше лучшее для общины Бреслов",
        icon: "Heart",
      },
      {
        title: "Технологические Инновации",
        description: "Использование самых инновационных технологий",
        icon: "Zap",
      },
    ],

    // Stats Section
    statsTitle: "Наше Глобальное Влияние",
    statsSubtitle: "Цифры, показывающие, как мы меняем мир литературы Бреслов",
    stats: [
      {
        number: "25,000+",
        label: "Пользователей по Всему Миру",
        icon: "Users",
      },
      {
        number: "75,000+",
        label: "Бесплатных Загрузок Книг",
        icon: "BookOpen",
      },
      {
        number: "5,500+",
        label: "Успешн��х Заказов",
        icon: "Award",
      },
      {
        number: "45",
        label: "Стран с Клиентами",
        icon: "Globe",
      },
    ],

    // Timeline Section
    timelineTitle: "Наш Путь",
    timelineSubtitle:
      "Как Мой Огонь развился в ведущий репозиторий книг Бреслов",
    timeline: [
      {
        year: "2023",
        title: "Мечта Родилась",
        description:
          "Мы определили потребность в современной платформе для качественных книг Бреслов. Начали глубокое исследование общины и потребностей.",
        duration: "3 месяца",
      },
      {
        year: "2024",
        title: "Разработка и Создание",
        description:
          "Создание веб-сайта с самыми передовыми технологиями: React, TypeScript и безопасные платежные системы.",
        duration: "8 месяцев",
      },
      {
        year: "2024",
        title: "Первоначальный Запуск",
        description:
          "Открытие веб-сайта для широкой публики с полным выбором книг и поддержкой пяти основных языков.",
        duration: "2 месяца",
      },
      {
        year: "2025",
        title: "Расширение и Цели",
        description:
          "Добавление передовых функций, расширение запасов и достижение дополнительных еврейских общин по всему миру.",
        duration: "Продолжается",
      },
    ],

    // Testimonials Section
    testimonialsTitle: "Что Говорят Наши Клиенты",
    testimonialsSubtitle: "Община Бреслов по всему миру делится своим опытом",
    testimonials: [
      {
        name: "Раввин Моше Коэн",
        location: "Иерусалим, Израиль",
        quote:
          "Самый передовой и удобный веб-сайт для покупки книг Бреслов. Отличное качество, быстрое обслуживание и выбор, которого нет больше нигде. Настоятельно рекомендую!",
        rating: 5,
      },
      {
        name: "Давид Леви",
        location: "Бруклин, Нью-Йорк",
        quote:
          "Наконец нашел место, которое понимает наши потребности. Поиск на иврите работает идеально, справедливые цены и книги приходят в отличном состоянии.",
        rating: 5,
      },
      {
        name: "Сара Розен",
        location: "Лондон, Англия",
        quote:
          "Бесплатные загрузки - настоящий подарок для общины. Спасибо за доброту и возможность учиться и приближаться к мудрости рабби Нахмана.",
        rating: 5,
      },
      {
        name: "Йосеф Мордехай",
        location: "Монреаль, Канада",
        quote:
          "Быстрая доставка, профессиональная упаковка и обслуживание сверх всех ожиданий. Это именно то, что община Бреслов искала годами.",
        rating: 5,
      },
      {
        name: "Рахель Гольдберг",
        location: "Мельбурн, Австралия",
        quote:
          "Легко используемый веб-сайт, точная информация и идеальная поддержка иврита. Отличная рекомендация для всех, кто ищет подлинны�� книги Бреслов.",
        rating: 5,
      },
    ],

    // Final CTA Section
    ctaTitle: "Присоединяйтесь к Семье Мой Огонь",
    ctaSubtitle:
      "Откройте полную коллекцию качественных книг Бреслов и начните свое духовное путешествие сегодня",
    ctaDescription:
      "Ищете ли вы кон��ретную книгу, хотите открыть новые произведения или просто поддержать нашу миссию - мы здесь для вас.",
    ctaButtonPrimary: "Изучить Магазин",
    ctaButtonSecondary: "Свяжитесь с Нами",
  },
};

// Icon mapping
const iconMap = {
  Users,
  BookOpen,
  Award,
  Globe,
  Lightbulb,
  Heart,
  Zap,
  Star,
  Shield,
  Code,
  Target,
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({
  iconName,
  className = "w-6 h-6",
}: {
  iconName: string;
  className?: string;
}) => {
  const Icon = iconMap[iconName as IconKey] ?? Star;
  return <Icon className={className} aria-hidden />;
};

// Animated counter
const AnimatedCounter = ({ end }: { end: string }) => {
  const [count, setCount] = useState("0");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          const numericEnd = parseInt(end.replace(/[^\d]/g, ""));
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / 2000, 1);
            const currentCount = Math.floor(progress * numericEnd);
            const suffix = end.includes("+") ? "+" : "";
            setCount(
              (end.includes(",")
                ? currentCount.toLocaleString()
                : currentCount.toString()) + suffix,
            );
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    const el = document.getElementById(`counter-${end}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [end, isVisible]);

  return <span id={`counter-${end}`}>{count}</span>;
};

export default function About() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t =
    translations[currentLanguage as keyof typeof translations] ||
    translations.he;
  const isRTL = currentLanguage === "he";

  useEffect(() => {
    document.title = t.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", t.description);
  }, [t.title, t.description]);

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="bg-keren-blue text-white py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src={heroBooks}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-haesh relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-blue-100 mb-4">{t.heroSubtitle}</p>
            <p className="text-blue-200 leading-relaxed mb-8">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="btn-primary py-3 px-6 no-underline"
              >
                <Mail size={18} /> {t.heroCtaPrimary}
              </Link>
              <Link
                href="/downloads"
                className="bg-white/10 backdrop-blur text-white border border-white/30 rounded-xl py-3 px-6 font-semibold hover:bg-white/20 transition-all no-underline inline-flex items-center gap-2"
              >
                <Download size={18} /> {t.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="py-16 lg:py-20">
          <div className="container-haesh max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-keren-blue text-center mb-12">
              {t.founderTitle}
            </h2>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-start">
                <div className="w-36 h-36 mx-auto lg:mx-0 mb-5 bg-gradient-to-br from-keren-orange to-keren-gold rounded-full flex items-center justify-center">
                  <span className="text-5xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-keren-blue mb-1">
                  {t.founderName}
                </h3>
                <p className="text-keren-orange font-semibold mb-3">
                  {t.founderRole}
                </p>
                <blockquote className="text-gray-600 italic border-r-4 border-keren-orange pr-4 text-sm leading-relaxed">
                  "{t.founderMission}"
                </blockquote>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">{t.founderBio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-12 bg-gray-50">
          <div className="container-haesh">
            <h3 className="text-2xl font-bold text-keren-blue text-center mb-8">
              {t.personalValues}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {t.values.map((v, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-keren-blue/10 rounded-xl flex items-center justify-center">
                    <IconComponent
                      iconName={v.icon}
                      className="w-7 h-7 text-keren-blue"
                    />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-500">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16">
          <div className="container-haesh text-center">
            <h2 className="text-3xl font-bold text-keren-blue mb-3">
              {t.statsTitle}
            </h2>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">
              {t.statsSubtitle}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.stats.map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-keren-orange/10 rounded-full flex items-center justify-center">
                    <IconComponent
                      iconName={stat.icon}
                      className="w-6 h-6 text-keren-orange"
                    />
                  </div>
                  <div className="text-3xl font-bold text-keren-blue mb-1">
                    <AnimatedCounter end={stat.number} />
                  </div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-16 bg-gray-50">
          <div className="container-haesh max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-keren-blue text-center mb-3">
              {t.timelineTitle}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              {t.timelineSubtitle}
            </p>
            <div className="space-y-6">
              {t.timeline.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-20">
                    <span className="inline-block bg-keren-blue text-white text-sm font-bold py-1 px-3 rounded-full">
                      {item.year}
                    </span>
                  </div>
                  <div className="bg-white rounded-xl p-5 flex-1 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <span className="text-xs text-keren-orange bg-orange-50 px-2 py-0.5 rounded-full">
                        {item.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16">
          <div className="container-haesh">
            <h2 className="text-3xl font-bold text-keren-blue text-center mb-3">
              {t.testimonialsTitle}
            </h2>
            <p className="text-gray-500 text-center mb-10">
              {t.testimonialsSubtitle}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {t.testimonials.map((tst, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex mb-3">
                    {Array.from({ length: tst.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-keren-gold fill-keren-gold"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 italic leading-relaxed mb-4">
                    "{tst.quote}"
                  </blockquote>
                  <div className="border-t border-gray-200 pt-3">
                    <p className="font-semibold text-gray-800 text-sm">
                      {tst.name}
                    </p>
                    <p className="text-xs text-gray-400">{tst.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-keren-blue text-white">
          <div className="container-haesh text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-blue-100 mb-3">{t.ctaSubtitle}</p>
            <p className="text-blue-200 text-sm mb-8">{t.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/store"
                className="btn-primary py-3 px-6 no-underline"
              >
                <ChevronRight size={18} /> {t.ctaButtonPrimary}
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur text-white border border-white/30 rounded-xl py-3 px-6 font-semibold hover:bg-white/20 transition-all no-underline inline-flex items-center gap-2"
              >
                <Mail size={18} /> {t.ctaButtonSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
