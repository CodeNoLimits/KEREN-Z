import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, Heart, Shield, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";

// Load Stripe
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

interface ShippingAddress {
  fullName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
}

const CheckoutForm = ({
  clientSecret,
  orderSummary,
}: {
  clientSecret: string;
  orderSummary: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      toast({
        title: "שגיאה",
        description: "מערכת התשלום אינה זמינה כרגע",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) {
        toast({
          title: "שגיאה בתשלום",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "תשלום בוצע בהצלחה!",
          description: "ההזמנה שלך אושרה וקבלת מייל אישור",
        });
        clearCart();
        queryClient.invalidateQueries({ queryKey: ["/api/user/subscription"] });
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעיבוד התשלום",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Stripe amounts are in agorot (cents) — divide by 100
  const fp = (amount: number) => formatPrice(amount / 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <PaymentElement />
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
          <ShoppingCart size={18} className="text-keren-blue" /> סיכום ההזמנה
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">סכום ביניים:</span>
            <span>{fp(orderSummary.subtotal)}</span>
          </div>
          {orderSummary.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>הנחת מנוי (5%):</span>
              <span>-{fp(orderSummary.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">מע"מ (17%):</span>
            <span>{fp(orderSummary.vatAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">משלוח:</span>
            <span>
              {orderSummary.shippingAmount > 0
                ? fp(orderSummary.shippingAmount)
                : "חינם! 🎉"}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
            <span>סה"כ לתשלום:</span>
            <span className="text-keren-orange">
              {fp(orderSummary.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-3.5 text-base"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            מעבד תשלום...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CreditCard size={18} /> השלם תשלום - {fp(orderSummary.totalAmount)}
          </span>
        )}
      </button>
    </form>
  );
};

export default function Checkout() {
  const {
    items,
    totalPrice,
    subtotalPrice,
    discount,
    isSubscriber,
    clearCart,
  } = useCart();
  const { formatPrice } = useCurrency();
  const { currentLanguage, setLanguage } = useLanguage();
  useSEO({
    title:
      currentLanguage === "he" ? "קופה - האש שלי" : "Checkout - Haesh Sheli",
    description:
      currentLanguage === "he"
        ? "השלימו את הרכישה שלכם בצורה מאובטחת"
        : "Complete your purchase securely",
  });
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    city: "",
    region: "",
    postalCode: "",
    country: "IL",
    phone: "",
  });
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const { toast } = useToast();

  // Empty cart state
  if (items.length === 0) {
    return (
      <div dir="rtl">
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={setLanguage}
        />
        <main className="bg-white">
          <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="text-center max-w-sm">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                העגלה שלך ריקה
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                הוסף מוצרים לעגלה כדי להמשיך לקופה
              </p>
              <a
                href="/store"
                className="btn-primary py-2.5 px-6 no-underline text-sm"
              >
                המשך קניות
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const createPaymentIntent = useMutation({
    mutationFn: async () => {
      if (
        !shippingAddress.fullName ||
        !email ||
        !shippingAddress.addressLine1 ||
        !shippingAddress.city
      ) {
        throw new Error("יש למלא את כל השדות הנדרשים");
      }
      const cartData = items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        nameEnglish: item.nameEnglish,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant,
      }));
      const res = await apiRequest("POST", "/api/create-payment-intent", {
        cart: cartData,
        shippingAddress,
        billingAddress: shippingAddress,
        email,
        shippingMethod: "standard",
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "שגיאה ביצירת התשלום");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setOrderSummary(data.orderSummary);
      toast({
        title: "מוכן לתשלום",
        description: "ניתן להמשיך לתשלום באמצעות כרטיס אשראי",
      });
    },
    onError: (error: any) => {
      toast({
        title: "שגיאה",
        description: error.message || "שגיאה ביצירת התשלום",
        variant: "destructive",
      });
    },
  });

  const handleCreatePayment = () => {
    createPaymentIntent.mutate();
  };

  // No Stripe key
  if (!stripePromise) {
    return (
      <div dir="rtl">
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={setLanguage}
        />
        <main className="bg-white">
          <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="text-center max-w-sm">
              <CreditCard className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                מערכת תשלומים אינה זמינה
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                אנא צרו קשר עם שירות הלקוחות
              </p>
              <a
                href="/contact"
                className="bg-gray-100 text-gray-700 rounded-xl py-2.5 px-6 no-underline text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                צור קשר
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div dir="rtl">
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setLanguage}
      />

      <main className="bg-white py-8">
        <div className="container-haesh max-w-4xl mx-auto">
          {!clientSecret ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="font-bold text-gray-800 flex items-center gap-2 mb-1">
                  <Truck size={18} className="text-keren-blue" /> פרטי משלוח
                </h2>
                <p className="text-gray-500 text-xs mb-5">
                  אנא מלא את פרטי המשלוח שלך
                </p>
                <div className="space-y-4">
                  {[
                    {
                      id: "email",
                      label: "אימייל *",
                      type: "email",
                      value: email,
                      onChange: (v: string) => setEmail(v),
                    },
                    {
                      id: "fullName",
                      label: "שם מלא *",
                      value: shippingAddress.fullName,
                      onChange: (v: string) =>
                        setShippingAddress((p) => ({ ...p, fullName: v })),
                    },
                    {
                      id: "address1",
                      label: "כתובת *",
                      value: shippingAddress.addressLine1,
                      onChange: (v: string) =>
                        setShippingAddress((p) => ({ ...p, addressLine1: v })),
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        htmlFor={f.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id}
                        type={f.type || "text"}
                        value={f.value}
                        onChange={(e) => f.onChange(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        עיר *
                      </label>
                      <input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress((p) => ({
                            ...p,
                            city: e.target.value,
                          }))
                        }
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        מיקוד
                      </label>
                      <input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          setShippingAddress((p) => ({
                            ...p,
                            postalCode: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      טלפון *
                    </label>
                    <input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) =>
                        setShippingAddress((p) => ({
                          ...p,
                          phone: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-keren-blue/30 focus:border-keren-blue transition-all text-sm"
                    />
                  </div>
                  <button
                    onClick={handleCreatePayment}
                    disabled={createPaymentIntent.isPending}
                    className="btn-primary w-full py-3"
                  >
                    {createPaymentIntent.isPending
                      ? "מכין תשלום..."
                      : "המשך לתשלום"}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <ShoppingCart size={18} className="text-keren-blue" /> עגלת
                    קניות ({items.length} פריטים)
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start text-sm"
                      >
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-gray-500 text-xs">
                            כמות: {item.quantity} × {formatPrice(item.price)}
                          </p>
                          {item.variant && (
                            <p className="text-gray-400 text-xs">
                              {item.variant.format} - {item.variant.size}
                            </p>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">סכום ביניים:</span>
                        <span>{formatPrice(subtotalPrice)}</span>
                      </div>
                      {isSubscriber && discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>הנחת מנוי (5%):</span>
                          <span>-{formatPrice(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold pt-1">
                        <span>סה"כ:</span>
                        <span className="text-keren-orange">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission card */}
                <div className="bg-keren-gold/10 border border-keren-gold/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Heart
                      size={18}
                      className="text-keren-gold flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="font-bold text-amber-800 text-sm mb-1">
                        💎 מחיר הקרן - תמיכה רוחנית
                      </h3>
                      <p className="text-amber-700 text-xs leading-relaxed">
                        כל רכישה תומכת במשימה הרוחנית של הפצת תורת רבי נחמן
                        מברסלב. נ נח נחמ נחמן מאומן! 🔥
                      </p>
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield
                      size={18}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <h3 className="font-bold text-green-800 text-sm mb-1">
                        🛡️ מדיניות משלוח והחזרות
                      </h3>
                      <ul className="text-green-700 text-xs space-y-0.5">
                        <li>• משלוח חינם על הזמנות מעל {formatPrice(399)}</li>
                        <li>• זמן משלוח: 3-7 ימי עסקים</li>
                        <li>• החזרה תוך 14 יום מקבלת המוצר</li>
                        <li>• מוצר פגום - החלפה מיידית ללא עלות</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-keren-blue" />
                <h2 className="font-bold text-gray-800 mb-1">תשלום מאובטח</h2>
                <p className="text-gray-500 text-xs">
                  אנא השלם את פרטי כרטיס האשראי
                </p>
              </div>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  clientSecret={clientSecret}
                  orderSummary={orderSummary}
                />
              </Elements>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
