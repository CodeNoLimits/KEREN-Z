import { AmbientMusic } from "@/components/AmbientMusic";
import { HilloulaBuilder, TestimonialsBuilder } from "@/components/BuilderPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import About from "@/pages/about";
import BreslovWisdom from "@/pages/breslovWisdom";
import Chat from "@/pages/chat";
import Checkout from "@/pages/checkout";
import Contact from "@/pages/contact";
import Donate from "@/pages/donate";
import Downloads from "@/pages/downloads";
import HaeshHype from "@/pages/haesh-hype";
import Home from "@/pages/home";
import Join from "@/pages/join";
import KerenStyle from "@/pages/keren-style";
import Lottery from "@/pages/lottery";
import LotteryAdmin from "@/pages/lottery-admin";
import Magazine from "@/pages/magazine";
import NotFound from "@/pages/not-found";
import Product from "@/pages/product";
import Store from "@/pages/store";
import Subscription from "@/pages/subscription";
import SubscriptionManagement from "@/pages/subscription-management";
import YaakovDashboard from "@/pages/yaaakov";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";

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

function Router() {
  return (
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
