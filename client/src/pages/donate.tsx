import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CheckCircle, CreditCard, Gift, Heart, Smartphone } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useSEO } from "../hooks/useSEO";

interface DonationAmount {
  value: number;
  label: string;
  popular?: boolean;
}

export default function DonatePage() {
  const { currentLanguage, setLanguage } = useLanguage();
  useSEO({
    title:
      currentLanguage === "he"
        ? "תרומה - קרן רבי ישראל | האש שלי"
        : "Donate - Keren Rabbi Israel | Haesh Sheli",
    description:
      currentLanguage === "he"
        ? "תרמו לקרן רבי ישראל להפצת ספרי רבי נחמן מברסלב בעולם"
        : "Donate to Keren Rabbi Israel for spreading Rabbi Nachman books worldwide",
  });
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const isRTL = currentLanguage === "he";

  const donationAmounts: DonationAmount[] = [
    { value: 50, label: "50₪" },
    { value: 100, label: "100₪" },
    { value: 200, label: "200₪", popular: true },
    { value: 500, label: "500₪" },
    { value: 1000, label: "1000₪" },
    { value: 2000, label: "2000₪" },
  ];

  const getText = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: {
        he: "תרומה לקרן הרב ישראל",
        en: "Donation to Rabbi Yisrael Foundation",
        fr: "Don à la Fondation Rabbi Yisrael",
      },
      subtitle: {
        he: "תמכו במשימה שלנו להפיץ את תורתו של רבי נחמן מברסלב",
        en: "Support our mission to spread Rabbi Nachman's teachings",
        fr: "Soutenez notre mission de diffuser les enseignements de Rabbi Nachman",
      },
      amountLabel: {
        he: "סכום התרומה",
        en: "Donation Amount",
        fr: "Montant du don",
      },
      customAmount: {
        he: "סכום אחר",
        en: "Custom Amount",
        fr: "Montant personnalisé",
      },
      recurring: {
        he: "תרומה חודשית",
        en: "Monthly Donation",
        fr: "Don mensuel",
      },
      donorInfo: {
        he: "פרטי התורם",
        en: "Donor Information",
        fr: "Informations du donateur",
      },
      name: { he: "שם מלא", en: "Full Name", fr: "Nom complet" },
      email: { he: "אימייל", en: "Email", fr: "Email" },
      message: {
        he: "הודעה (אופציונלי)",
        en: "Message (Optional)",
        fr: "Message (Optionnel)",
      },
      donateButton: {
        he: "תרום עכשיו",
        en: "Donate Now",
        fr: "Faire un don maintenant",
      },
      paymentMethods: {
        he: "אמצעי תשלום",
        en: "Payment Methods",
        fr: "Moyens de paiement",
      },
      popular: { he: "פופולרי", en: "Popular", fr: "Populaire" },
      creditCard: {
        he: "כרטיס אשראי",
        en: "Credit Card",
        fr: "Carte de crédit",
      },
      paybox: { he: "פייבוקס", en: "PayBox", fr: "PayBox" },
      phonePayment: {
        he: "תשלום בטלפון",
        en: "Phone Payment",
        fr: "Paiement par téléphone",
      },
      bankTransfer: {
        he: "העברה בנקאית",
        en: "Bank Transfer",
        fr: "Virement bancaire",
      },
      directTransfer: {
        he: "העברה ישירה",
        en: "Direct Transfer",
        fr: "Transfert direct",
      },
      impactTitle: {
        he: "השפעת התרומה שלכם",
        en: "Impact of Your Donation",
        fr: "Impact de votre don",
      },
      impact1: {
        he: "תמיכה בהדפסת ספרים חדשים",
        en: "Support printing new books",
        fr: "Soutien à l'impression de nouveaux livres",
      },
      impact2: {
        he: "הפצת תורת ברסלב בעולם",
        en: "Spreading Breslov teachings worldwide",
        fr: "Diffusion des enseignements de Breslov dans le monde",
      },
      impact3: {
        he: "תמיכה בפעילות חינוכית",
        en: "Supporting educational activities",
        fr: "Soutien aux activités éducatives",
      },
    };
    return texts[key]?.[currentLanguage] || texts[key]?.he || key;
  };

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      alert(
        currentLanguage === "he"
          ? "אנא בחר סכום תרומה"
          : "Please select a donation amount",
      );
      return;
    }
    // Payment processing placeholder
    console.log("Donation:", {
      amount,
      isRecurring,
      donorName,
      donorEmail,
      donorMessage,
    });
    alert(
      currentLanguage === "he"
        ? "תודה רבה על תרומתכם! 🙏"
        : "Thank you for your donation! 🙏",
    );
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white">
        {/* ── Hero ── */}
        <section className="bg-keren-blue text-white py-16 lg:py-20">
          <div className="container-haesh text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {getText("title")}
            </h1>
            <p className="text-blue-200 text-sm">{getText("subtitle")}</p>
          </div>
        </section>

        {/* ── Donation Content ── */}
        <section className="py-10">
          <div className="container-haesh max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ── Donation Form ── */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {getText("amountLabel")}
                </h2>

                {/* Amount grid */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => {
                        setSelectedAmount(amount.value);
                        setCustomAmount("");
                      }}
                      className={`relative h-11 rounded-lg text-sm font-semibold transition-all border ${
                        selectedAmount === amount.value
                          ? "bg-keren-blue text-white border-keren-blue"
                          : "bg-white text-gray-700 border-gray-200 hover:border-keren-blue"
                      } ${amount.popular ? "ring-2 ring-keren-orange ring-offset-1" : ""}`}
                    >
                      {amount.label}
                      {amount.popular && (
                        <span className="absolute -top-2 right-2 text-[10px] bg-keren-orange text-white px-1.5 py-0.5 rounded">
                          {getText("popular")}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {getText("customAmount")}
                  </label>
                  <input
                    type="number"
                    placeholder="₪"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-keren-blue focus:border-keren-blue transition-all"
                  />
                </div>

                {/* Recurring */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-keren-blue focus:ring-keren-blue"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {getText("recurring")}
                    </span>
                  </label>
                </div>

                {/* Donor info */}
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  {getText("donorInfo")}
                </h3>
                <div className="space-y-3 mb-5">
                  <input
                    placeholder={getText("name")}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-keren-blue focus:border-keren-blue transition-all"
                  />
                  <input
                    type="email"
                    placeholder={getText("email")}
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-keren-blue focus:border-keren-blue transition-all"
                  />
                  <textarea
                    placeholder={getText("message")}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-keren-blue focus:border-keren-blue transition-all resize-none"
                  />
                </div>

                {/* PayPal Button */}
                <button
                  onClick={handleDonate}
                  className="w-full bg-keren-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  {getText("donateButton")}
                </button>
              </div>

              {/* ── Payment Methods & Impact ── */}
              <div className="space-y-5">
                {/* Payment methods */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {getText("paymentMethods")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                      <CreditCard className="h-5 w-5 text-keren-blue mr-3 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {getText("creditCard")}
                        </div>
                        <div className="text-xs text-gray-400">
                          Visa, Mastercard, American Express
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                      <Smartphone className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {getText("paybox")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {getText("phonePayment")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                      <Gift className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {getText("bankTransfer")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {getText("directTransfer")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact box */}
                <div className="bg-keren-blue rounded-xl p-5 text-white">
                  <h3 className="text-lg font-bold mb-4">
                    {getText("impactTitle")}
                  </h3>
                  <div className="space-y-3">
                    {["impact1", "impact2", "impact3"].map((key) => (
                      <div key={key} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0" />
                        <span className="text-sm text-blue-100">
                          {getText(key)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
