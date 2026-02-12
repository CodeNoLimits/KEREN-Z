import { MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { currentLanguage, t } = useLanguage();
  const [email, setEmail] = useState("");
  const isRtl = currentLanguage === "he";

  const footerText = {
    he: {
      aboutTitle: "קרן רבי ישראל",
      aboutDesc: "הפצת ספרי רבי נחמן מברסלב בעולם כולו. נח נח נחמ נחמן מאומן!",
      quickLinks: "קישורים מהירים",
      newsletter: "הרשמה לעדכונים",
      newsletterDesc: "קבלו 10% הנחה ועדכונים על מוצרים חדשים",
      emailPlaceholder: "כתובת אימייל",
      subscribe: "הרשמה",
      rights: '© 2025 קרן רבי ישראל דב אודסר זצ"ל. כל הזכויות שמורות.',
      address: "ירושלים, ישראל",
      phone: "058-730-8000",
      whatsapp: "וואטסאפ",
    },
    en: {
      aboutTitle: "Keren Rabbi Israel",
      aboutDesc:
        "Spreading Rabbi Nachman of Breslov's books worldwide. Na Nach Nachma Nachman Meuman!",
      quickLinks: "Quick Links",
      newsletter: "Newsletter",
      newsletterDesc: "Get 10% off and updates on new products",
      emailPlaceholder: "Email address",
      subscribe: "Subscribe",
      rights:
        "© 2025 Rabbi Israel Dov Odesser Foundation. All rights reserved.",
      address: "Jerusalem, Israel",
      phone: "058-730-8000",
      whatsapp: "WhatsApp",
    },
    fr: {
      aboutTitle: "Keren Rabbi Israël",
      aboutDesc:
        "Diffusion des livres de Rabbi Nachman de Breslov dans le monde entier.",
      quickLinks: "Liens Rapides",
      newsletter: "Newsletter",
      newsletterDesc: "Obtenez 10% de réduction et des mises à jour",
      emailPlaceholder: "Adresse email",
      subscribe: "S'inscrire",
      rights:
        "© 2025 Fondation Rabbi Israël Dov Odesser. Tous droits réservés.",
      address: "Jérusalem, Israël",
      phone: "058-730-8000",
      whatsapp: "WhatsApp",
    },
    es: {
      aboutTitle: "Keren Rabino Israel",
      aboutDesc:
        "Difusión de los libros del Rabino Nachman de Breslov en todo el mundo.",
      quickLinks: "Enlaces Rápidos",
      newsletter: "Boletín",
      newsletterDesc: "Obtenga 10% de descuento y actualizaciones",
      emailPlaceholder: "Correo electrónico",
      subscribe: "Suscribirse",
      rights:
        "© 2025 Fundación Rabino Israel Dov Odesser. Todos los derechos reservados.",
      address: "Jerusalén, Israel",
      phone: "058-730-8000",
      whatsapp: "WhatsApp",
    },
    ru: {
      aboutTitle: "Керен Рабби Израэль",
      aboutDesc:
        "Распространение книг Рабби Нахмана из Бреслова по всему миру.",
      quickLinks: "Быстрые Ссылки",
      newsletter: "Рассылка",
      newsletterDesc: "Получите скидку 10% и обновления",
      emailPlaceholder: "Электронная почта",
      subscribe: "Подписаться",
      rights: "© 2025 Фонд Рабби Израэля Дова Одессера. Все права защищены.",
      address: "Иерусалим, Израиль",
      phone: "058-730-8000",
      whatsapp: "WhatsApp",
    },
  };

  const ft = (footerText as any)[currentLanguage] || footerText.he;

  return (
    <footer className="bg-keren-blue text-white">
      {/* Main footer */}
      <div className="container-haesh py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">
              🔥 {ft.aboutTitle}
            </h4>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              {ft.aboutDesc}
            </p>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {ft.address}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> {ft.phone}
              </div>
              <a
                href="https://wa.me/972587308000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-300 hover:text-green-200 no-underline"
              >
                💬 {ft.whatsapp}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">
              {ft.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { key: "store", path: "/store" },
                { key: "downloads", path: "/downloads" },
                { key: "about", path: "/about" },
                { key: "contact", path: "/contact" },
                { key: "join", path: "/join" },
              ].map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.path}
                    className="text-blue-200 hover:text-white no-underline transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">
              {ft.newsletter}
            </h4>
            <p className="text-blue-200 text-sm mb-4">{ft.newsletterDesc}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: newsletter signup
                setEmail("");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ft.emailPlaceholder}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-blue-300 text-sm focus:outline-none focus:border-keren-orange"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-keren-orange hover:bg-keren-orange-dark text-white transition-colors"
                aria-label={ft.subscribe}
              >
                <Send size={16} />
              </button>
            </form>

            {/* WhatsApp groups */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "🇮🇱 עברית", phone: "972587308000" },
                { label: "🇬🇧 EN", phone: "972587308001" },
                { label: "🇫🇷 FR", phone: "972587308004" },
              ].map((group, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${group.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-green-600/30 hover:bg-green-600/50 text-green-200 px-2 py-1 rounded no-underline transition-colors"
                >
                  {group.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-haesh py-4 text-center text-xs text-blue-300">
          {ft.rights}
        </div>
      </div>
    </footer>
  );
}
