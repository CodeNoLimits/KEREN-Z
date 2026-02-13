import { AmbientMusic } from "@/components/AmbientMusic";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";

// ── Core pages (eagerly loaded — critical path) ──
import Home from "@/pages/home";
import Store from "@/pages/store";

// ── Lazy-loaded pages (code split) ──
const About = lazy(() => import("@/pages/about"));
const BreslovWisdom = lazy(() => import("@/pages/breslovWisdom"));
const Chat = lazy(() => import("@/pages/chat"));
const Checkout = lazy(() => import("@/pages/checkout"));
const Contact = lazy(() => import("@/pages/contact"));
const Donate = lazy(() => import("@/pages/donate"));
const Downloads = lazy(() => import("@/pages/downloads"));
const HaeshHype = lazy(() => import("@/pages/haesh-hype"));
const Join = lazy(() => import("@/pages/join"));
const KerenStyle = lazy(() => import("@/pages/keren-style"));
const Lottery = lazy(() => import("@/pages/lottery"));
const LotteryAdmin = lazy(() => import("@/pages/lottery-admin"));
const Magazine = lazy(() => import("@/pages/magazine"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Product = lazy(() => import("@/pages/product"));
const Subscription = lazy(() => import("@/pages/subscription"));
const SubscriptionManagement = lazy(
  () => import("@/pages/subscription-management"),
);
const YaakovDashboard = lazy(() => import("@/pages/yaaakov"));
const BreslovVideos = lazy(() => import("@/pages/breslov-videos"));

// Builder.io pages (lazy-loaded with named export wrappers)
const HilloulaBuilder = lazy(() =>
  import("@/components/BuilderPage").then((m) => ({
    default: m.HilloulaBuilder,
  })),
);
const TestimonialsBuilder = lazy(() =>
  import("@/components/BuilderPage").then((m) => ({
    default: m.TestimonialsBuilder,
  })),
);

// Simple checkout success component
const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            תשלום בוצע בהצלחה!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ההזמנה שלך התקבלה ותקבל מייל אישור בקרוב
          </p>
          <a
            href="/"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </div>
  );
};

// Loading fallback for lazy routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-keren-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-500 text-sm">טוען...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/store" component={Store} />
        <Route path="/about" component={About} />
        <Route path="/magazine" component={Magazine} />
        <Route path="/join" component={Join} />
        <Route path="/contact" component={Contact} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/checkout/success" component={() => <CheckoutSuccess />} />
        <Route path="/downloads" component={Downloads} />
        <Route path="/donate" component={Donate} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/subscription/manage" component={SubscriptionManagement} />
        <Route path="/product/:id" component={Product} />
        <Route path="/breslov-wisdom" component={BreslovWisdom} />
        <Route path="/breslov-videos" component={BreslovVideos} />
        <Route path="/keren-style" component={KerenStyle} />
        <Route path="/haesh-hype" component={HaeshHype} />
        <Route path="/chat" component={Chat} />
        <Route path="/lottery" component={Lottery} />
        <Route path="/lottery/admin" component={LotteryAdmin} />
        <Route path="/hilloula-2024" component={HilloulaBuilder} />
        <Route path="/testimonials" component={TestimonialsBuilder} />
        <Route path="/yaaakov" component={YaakovDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <CartProvider>
                <Toaster />
                <InstallPrompt />
                <AmbientMusic />
                {/* Skip to content link for keyboard users */}
                <a href="#main-content" className="skip-to-content">
                  Skip to content
                </a>
                <ErrorBoundary>
                  <Router />
                </ErrorBoundary>
              </CartProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
