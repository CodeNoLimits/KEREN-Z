import React, { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — Catches React rendering errors and shows a friendly fallback.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-gray-50 p-8"
          dir="rtl"
        >
          <div className="max-w-md text-center space-y-6">
            <div className="text-6xl">🔥</div>
            <h1 className="text-2xl font-bold text-keren-blue">משהו השתבש</h1>
            <p className="text-gray-600">
              קרתה שגיאה לא צפויה. נסו לרענן את הדף.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-keren-blue text-white px-6 py-3 rounded-lg hover:bg-keren-blue/90 transition-colors font-medium"
            >
              רענן דף
            </button>
            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 p-4 bg-red-50 text-red-800 text-xs text-left overflow-auto rounded-lg border border-red-200 max-h-40">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
