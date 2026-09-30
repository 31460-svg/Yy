import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-4">
            <span className="text-4xl block">🌸</span>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Flower Shop กำลังรีเฟรชระบบ
            </h2>
            <p className="text-xs text-stone-600">
              เกิดข้อผิดพลาดชั่วคราวในการแสดงผล กรุณากดปุ่มด้านล่างเพื่อโหลดใหม่อีกครั้ง
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>โหลดหน้าใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
