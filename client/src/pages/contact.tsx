import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  he: {
    // SEO
    title: "צור קשר - האש שלי | נשמח לעזור ולענות על כל שאלה",
    description:
      "צור קשר עם צוות האש שלי. נענה על שאלות, נעזור בהזמנות ונספק שירות מקצועי לקהילה הברסלבית.",

    // Hero Section
    heroTitle: "נשמח לעזור לכם",
    heroSubtitle: "הצוות שלנו כאן כדי לענות על כל שאלה ולהעניק שירות מקצועי",
    heroDescription:
      "בין אם אתם מחפשים ספר מסוים, זקוקים לעזרה עם הזמנה, או פשוט רוצים לשתף משוב - אנחנו כאן בשבילכם.",

    // Form Section
    formTitle: "שלחו לנו הודעה",
    formSubtitle: "נחזור אליכם תוך 24 שעות",
    name: "שם מלא",
    email: "כתובת אימייל",
    phone: "טלפון (אופציונלי)",
    subject: "נושא הפנייה",
    message: "תוכן ההודעה",
    send: "שלח הודעה",
    sending: "שולח...",

    // Placeholders
    namePlaceholder: "שם מלא",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+972-50-123-4567",
    subjectPlaceholder: "בחרו נושא...",
    messagePlaceholder: "כתבו כאן את ההודעה שלכם...",

    // Subjects
    subjects: [
      "שאלה כללית",
      "הזמנת ספר מיוחד",
      "בעיה עם ההזמנה",
      "משוב על המוצר",
      "שאלה טכנית",
      "אחר",
    ],

    // Contact Info
    contactTitle: "פרטי התקשרות",
    contactSubtitle: "דרכים נוספות ליצור עמנו קשר",

    address: "כתובת",
    addressText: "ישראל, פתח תקווה",
    emailContact: "אימייל",
    emailText: "contact@haesh-sheli.co.il",
    phoneContact: "טלפון",
    phoneText: "+972-50-123-4567",
    hours: "שעות פעילות",
    hoursText: "ימים א'-ה': 9:00-18:00\nימי ו': 9:00-13:00\nימי שבת: סגור",

    // Features
    featuresTitle: "למה לבחור בנו?",
    features: [
      {
        title: "מענה מהיר",
        description: "תמיד נחזור אליכם תוך 24 שעות",
        icon: "MessageCircle",
      },
      {
        title: "שירות אישי",
        description: "כל לקוח מקבל יחס אישי ומקצועי",
        icon: "Heart",
      },
      {
        title: "מומחיות ברסלבית",
        description: "הצוות שלנו מכיר לעומק את הספרות הברסלבית",
        icon: "BookOpen",
      },
      {
        title: "קהילה תומכת",
        description: "אנחנו חלק מהקהילה הברסלבית העולמית",
        icon: "Users",
      },
    ],

    // Success & Error
    thankYou: "תודה רבה! ההודעה נשלחה בהצלחה",
    thankYouDescription: "נחזור אליכם בהקדם האפשרי",
    errorMessage: "אירעה שגיאה. אנא נסו שוב מאוחר יותר",

    // CTA
    ctaTitle: "מוכנים להתחיל?",
    ctaDescription: "עיינו בקטלוג הספרים שלנו או צרו איתנו קשר לייעוץ אישי",
  },

  en: {
    // SEO
    title: "Contact Us - My Fire | We're here to help with any question",
    description:
      "Contact the My Fire team. We answer questions, help with orders and provide professional service to the Breslov community.",

    // Hero Section
    heroTitle: "We're Here to Help",
    heroSubtitle:
      "Our team is here to answer any question and provide professional service",
    heroDescription:
      "Whether you're looking for a specific book, need help with an order, or simply want to share feedback - we're here for you.",

    // Form Section
    formTitle: "Send Us a Message",
    formSubtitle: "We'll get back to you within 24 hours",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone (Optional)",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",

    // Placeholders
    namePlaceholder: "Full Name",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+972-50-123-4567",
    subjectPlaceholder: "Choose subject...",
    messagePlaceholder: "Write your message here...",

    // Subjects
    subjects: [
      "General Question",
      "Special Book Order",
      "Order Problem",
      "Product Feedback",
      "Technical Question",
      "Other",
    ],

    // Contact Info
    contactTitle: "Contact Information",
    contactSubtitle: "Additional ways to reach us",

    address: "Address",
    addressText: "Israel, Petah Tikva",
    emailContact: "Email",
    emailText: "contact@haesh-sheli.co.il",
    phoneContact: "Phone",
    phoneText: "+972-50-123-4567",
    hours: "Business Hours",
    hoursText:
      "Sunday-Thursday: 9:00-18:00\nFridays: 9:00-13:00\nSaturdays: Closed",

    // Features
    featuresTitle: "Why Choose Us?",
    features: [
      {
        title: "Quick Response",
        description: "We always get back to you within 24 hours",
        icon: "MessageCircle",
      },
      {
        title: "Personal Service",
        description:
          "Every customer receives personal and professional treatment",
        icon: "Heart",
      },
      {
        title: "Breslov Expertise",
        description: "Our team deeply knows Breslov literature",
        icon: "BookOpen",
      },
      {
        title: "Supportive Community",
        description: "We're part of the global Breslov community",
        icon: "Users",
      },
    ],

    // Success & Error
    thankYou: "Thank you! Message sent successfully",
    thankYouDescription: "We'll get back to you as soon as possible",
    errorMessage: "An error occurred. Please try again later",

    // CTA
    ctaTitle: "Ready to Start?",
    ctaDescription:
      "Browse our book catalog or contact us for personal consultation",
  },

  fr: {
    // SEO
    title: "Contactez-Nous - Mon Feu | Nous sommes là pour vous aider",
    description:
      "Contactez l'équipe de Mon Feu. Nous répondons aux questions, aidons avec les commandes et fournissons un service professionnel à la communauté Breslov.",

    // Hero Section
    heroTitle: "Nous Sommes Là Pour Vous Aider",
    heroSubtitle:
      "Notre équipe est là pour répondre à toute question et fournir un service professionnel",
    heroDescription:
      "Que vous cherchiez un livre spécifique, ayez besoin d'aide avec une commande, ou souhaitiez simplement partager vos commentaires - nous sommes là pour vous.",

    // Form Section
    formTitle: "Envoyez-nous un Message",
    formSubtitle: "Nous vous répondrons dans les 24 heures",
    name: "Nom Complet",
    email: "Adresse Email",
    phone: "Téléphone (Optionnel)",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer le Message",
    sending: "Envoi...",

    // Placeholders
    namePlaceholder: "Nom Complet",
    emailPlaceholder: "exemple@email.com",
    phonePlaceholder: "+972-50-123-4567",
    subjectPlaceholder: "Choisir un sujet...",
    messagePlaceholder: "Écrivez votre message ici...",

    // Subjects
    subjects: [
      "Question Générale",
      "Commande de Livre Spécial",
      "Problème de Commande",
      "Commentaire sur le Produit",
      "Question Technique",
      "Autre",
    ],

    // Contact Info
    contactTitle: "Informations de Contact",
    contactSubtitle: "Autres moyens de nous joindre",

    address: "Adresse",
    addressText: "Israël, Petah Tikva",
    emailContact: "Email",
    emailText: "contact@haesh-sheli.co.il",
    phoneContact: "Téléphone",
    phoneText: "+972-50-123-4567",
    hours: "Heures d'Ouverture",
    hoursText:
      "Dimanche-Jeudi: 9:00-18:00\nVendredis: 9:00-13:00\nSamedis: Fermé",

    // Features
    featuresTitle: "Pourquoi Nous Choisir?",
    features: [
      {
        title: "Réponse Rapide",
        description: "Nous vous répondons toujours dans les 24 heures",
        icon: "MessageCircle",
      },
      {
        title: "Service Personnel",
        description:
          "Chaque client reçoit un traitement personnel et professionnel",
        icon: "Heart",
      },
      {
        title: "Expertise Breslov",
        description: "Notre équipe connaît profondément la littérature Breslov",
        icon: "BookOpen",
      },
      {
        title: "Communauté Solidaire",
        description: "Nous faisons partie de la communauté Breslov mondiale",
        icon: "Users",
      },
    ],

    // Success & Error
    thankYou: "Merci! Message envoyé avec succès",
    thankYouDescription: "Nous vous répondrons dès que possible",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer plus tard",

    // CTA
    ctaTitle: "Prêt à Commencer?",
    ctaDescription:
      "Parcourez notre catalogue de livres ou contactez-nous pour une consultation personnelle",
  },

  es: {
    // SEO
    title: "Contáctanos - Mi Fuego | Estamos aquí para ayudar",
    description:
      "Contacta al equipo de Mi Fuego. Respondemos preguntas, ayudamos con pedidos y brindamos servicio profesional a la comunidad Breslov.",

    // Hero Section
    heroTitle: "Estamos Aquí Para Ayudar",
    heroSubtitle:
      "Nuestro equipo está aquí para responder cualquier pregunta y brindar servicio profesional",
    heroDescription:
      "Ya sea que busques un libro específico, necesites ayuda con un pedido, o simplemente quieras compartir comentarios - estamos aquí para ti.",

    // Form Section
    formTitle: "Envíanos un Mensaje",
    formSubtitle: "Te responderemos dentro de 24 horas",
    name: "Nombre Completo",
    email: "Dirección de Email",
    phone: "Teléfono (Opcional)",
    subject: "Asunto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    sending: "Enviando...",

    // Placeholders
    namePlaceholder: "Nombre Completo",
    emailPlaceholder: "ejemplo@email.com",
    phonePlaceholder: "+972-50-123-4567",
    subjectPlaceholder: "Elegir asunto...",
    messagePlaceholder: "Escribe tu mensaje aquí...",

    // Subjects
    subjects: [
      "Pregunta General",
      "Pedido de Libro Especial",
      "Problema con Pedido",
      "Comentario sobre Producto",
      "Pregunta Técnica",
      "Otro",
    ],

    // Contact Info
    contactTitle: "Información de Contacto",
    contactSubtitle: "Formas adicionales de contactarnos",

    address: "Dirección",
    addressText: "Israel, Petah Tikva",
    emailContact: "Email",
    emailText: "contact@haesh-sheli.co.il",
    phoneContact: "Teléfono",
    phoneText: "+972-50-123-4567",
    hours: "Horarios de Atención",
    hoursText:
      "Domingo-Jueves: 9:00-18:00\nViernes: 9:00-13:00\nSábados: Cerrado",

    // Features
    featuresTitle: "¿Por Qué Elegirnos?",
    features: [
      {
        title: "Respuesta Rápida",
        description: "Siempre te respondemos dentro de 24 horas",
        icon: "MessageCircle",
      },
      {
        title: "Servicio Personal",
        description: "Cada cliente recibe un trato personal y profesional",
        icon: "Heart",
      },
      {
        title: "Experiencia Breslov",
        description:
          "Nuestro equipo conoce profundamente la literatura Breslov",
        icon: "BookOpen",
      },
      {
        title: "Comunidad Solidaria",
        description: "Somos parte de la comunidad Breslov global",
        icon: "Users",
      },
    ],

    // Success & Error
    thankYou: "¡Gracias! Mensaje enviado exitosamente",
    thankYouDescription: "Te responderemos lo antes posible",
    errorMessage: "Ocurrió un error. Por favor intenta de nuevo más tarde",

    // CTA
    ctaTitle: "¿Listo para Empezar?",
    ctaDescription:
      "Explora nuestro catálogo de libros o contáctanos para consulta personal",
  },

  ru: {
    // SEO
    title: "Свяжитесь с Нами - Мой Огонь | Мы здесь, чтобы помочь",
    description:
      "Свяжитесь с командой Мой Огонь. Мы отвечаем на вопросы, помогаем с заказами и предоставляем профессиональный сервис сообществу Бреслов.",

    // Hero Section
    heroTitle: "Мы Здесь, Чтобы Помочь",
    heroSubtitle:
      "Наша команда готова ответить на любой вопрос и предоставить профессиональный сервис",
    heroDescription:
      "Ищете ли вы конкретную книгу, нужна помощь с заказом, или просто хотите поделиться отзывом - мы здесь для вас.",

    // Form Section
    formTitle: "Отправьте Нам Сообщение",
    formSubtitle: "Мы ответим в течение 24 часов",
    name: "Полное Имя",
    email: "Адрес Электронной Почты",
    phone: "Телефон (Необязательно)",
    subject: "Тема",
    message: "Сообщение",
    send: "Отправить Сообщение",
    sending: "Отправка...",

    // Placeholders
    namePlaceholder: "Полное Имя",
    emailPlaceholder: "пример@email.com",
    phonePlaceholder: "+972-50-123-4567",
    subjectPlaceholder: "Выберите тему...",
    messagePlaceholder: "Напишите ваше сообщение здесь...",

    // Subjects
    subjects: [
      "Общий Вопрос",
      "Заказ Специальной Книги",
      "Проблема с Заказом",
      "Отзыв о Продукте",
      "Технический Вопрос",
      "Другое",
    ],

    // Contact Info
    contactTitle: "Контактная Информация",
    contactSubtitle: "Дополнительные способы связи с нами",

    address: "Адрес",
    addressText: "Израиль, Петах-Тиква",
    emailContact: "Email",
    emailText: "contact@haesh-sheli.co.il",
    phoneContact: "Телефон",
    phoneText: "+972-50-123-4567",
    hours: "Часы Работы",
    hoursText:
      "Воскресенье-Четверг: 9:00-18:00\nПятница: 9:00-13:00\nСуббота: Закрыто",

    // Features
    featuresTitle: "Почему Выбрать Нас?",
    features: [
      {
        title: "Быстрый Ответ",
        description: "Мы всегда отвечаем в течение 24 часов",
        icon: "MessageCircle",
      },
      {
        title: "Персональный Сервис",
        description:
          "Каждый клиент получает персональное и профессиональное обслуживание",
        icon: "Heart",
      },
      {
        title: "Экспертиза Бреслов",
        description: "Наша команда глубоко знает литературу Бреслов",
        icon: "BookOpen",
      },
      {
        title: "Поддерживающее Сообщество",
        description: "Мы часть глобального сообщества Бреслов",
        icon: "Users",
      },
    ],

    // Success & Error
    thankYou: "Спасибо! Сообщение отправлено успешно",
    thankYouDescription: "Мы ответим вам как можно скорее",
    errorMessage: "Произошла ошибка. Пожалуйста, попробуйте позже",

    // CTA
    ctaTitle: "Готовы Начать?",
    ctaDescription:
      "Просмотрите наш каталог книг или свяжитесь с нами для персональной консультации",
  },
};

// Icon mapping component
const iconMap = {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  BookOpen,
  Heart,
  Users,
  Lightbulb,
} as const;

type IconKey = keyof typeof iconMap;

const IconComponent = ({
  iconName,
  className = "w-6 h-6",
}: {
  iconName: string;
  className?: string;
}) => {
  const Icon = iconMap[iconName as IconKey] ?? Mail;
  return <Icon className={className} aria-hidden />;
};

export default function Contact() {
  const { currentLanguage, setLanguage } = useLanguage();
  const t =
    translations[currentLanguage as keyof typeof translations] ||
    translations.he;
  const isRTL = currentLanguage === "he";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "שגיאה בשליחת ההודעה",
        );
      }

      // Success!
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(""), 8000);
    } catch (error: any) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="bg-keren-blue text-white py-16 lg:py-24">
          <div className="container-haesh text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-blue-100 mb-3">{t.heroSubtitle}</p>
            <p className="text-blue-200 leading-relaxed">{t.heroDescription}</p>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="py-16">
          <div className="container-haesh">
            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-keren-blue mb-2">
                  {t.formTitle}
                </h2>
                <p className="text-gray-500 mb-6 text-sm">{t.formSubtitle}</p>

                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700 text-sm">
                        {t.thankYou}
                      </span>
                    </div>
                    <p className="text-green-600 text-xs">
                      {t.thankYouDescription}
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-700 text-sm">
                        {t.errorMessage}
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.subject}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                        required
                      >
                        <option value="">{t.subjectPlaceholder}</option>
                        {t.subjects.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {t.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm resize-vertical"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3"
                  >
                    <Send size={18} />
                    {isSubmitting ? t.sending : t.send}
                  </button>
                </form>
              </div>

              {/* Contact Info + Features */}
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-keren-blue mb-2">
                    {t.contactTitle}
                  </h2>
                  <p className="text-gray-500 text-sm mb-5">
                    {t.contactSubtitle}
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: MapPin, label: t.address, value: t.addressText },
                      {
                        icon: Mail,
                        label: t.emailContact,
                        value: t.emailText,
                        href: `mailto:${t.emailText}`,
                      },
                      {
                        icon: Phone,
                        label: t.phoneContact,
                        value: t.phoneText,
                        href: `tel:${t.phoneText}`,
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-keren-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon size={18} className="text-keren-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {item.label}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-keren-blue text-sm hover:underline"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-500 text-sm">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-keren-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-keren-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {t.hours}
                        </h3>
                        <p className="text-gray-500 text-sm whitespace-pre-line">
                          {t.hoursText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-keren-blue mb-4">
                    {t.featuresTitle}
                  </h3>
                  <div className="space-y-3">
                    {t.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg"
                      >
                        <div className="w-9 h-9 bg-keren-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent
                            iconName={feature.icon}
                            className="w-4 h-4 text-keren-orange"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-12 bg-keren-blue text-white">
          <div className="container-haesh text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-blue-200 text-sm mb-6">{t.ctaDescription}</p>
            <div className="flex gap-3 justify-center">
              <a
                href="/store"
                className="btn-primary py-2.5 px-5 no-underline text-sm"
              >
                <BookOpen size={16} />{" "}
                {currentLanguage === "he" ? "עיינו בחנות" : "Browse Store"}
              </a>
              <a
                href="/about"
                className="bg-white/10 text-white border border-white/30 rounded-xl py-2.5 px-5 font-semibold hover:bg-white/20 transition-all no-underline inline-flex items-center gap-2 text-sm"
              >
                <Users size={16} />{" "}
                {currentLanguage === "he" ? "למדו עלינו" : "About Us"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
