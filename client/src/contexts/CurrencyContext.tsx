import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CurrencyCode = "ILS" | "USD" | "EUR";

interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rate: number; // conversion rate from ILS (base)
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  ILS: { code: "ILS", symbol: "₪", label: "שקל", rate: 1 },
  USD: { code: "USD", symbol: "$", label: "Dollar", rate: 0.27 },
  EUR: { code: "EUR", symbol: "€", label: "Euro", rate: 0.25 },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountILS: number) => string;
  currencies: typeof CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("ILS");

  useEffect(() => {
    const saved = localStorage.getItem("site-currency") as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      setCurrencyCode(saved);
    }
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyCode(code);
    localStorage.setItem("site-currency", code);
  }, []);

  const formatPrice = useCallback(
    (amountILS: number) => {
      const config = CURRENCIES[currencyCode];
      const converted = Math.round(amountILS * config.rate * 100) / 100;

      if (currencyCode === "ILS") {
        return `${config.symbol}${converted.toLocaleString("he-IL")}`;
      }
      return `${config.symbol}${converted.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    },
    [currencyCode],
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency: CURRENCIES[currencyCode],
        setCurrency,
        formatPrice,
        currencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

export type { CurrencyCode };
