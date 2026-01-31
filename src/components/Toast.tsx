import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <XCircle className="w-5 h-5 text-white" />,
    info: <AlertCircle className="w-5 h-5 text-white" />,
  };

  const colors = {
    success: 'bg-success',
    error: 'bg-red-500',
    info: 'bg-primary',
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 animate-slideDown">
      <div className={cn(
        "max-w-[400px] w-full rounded-xl shadow-lg p-4 flex items-center gap-3",
        colors[type]
      )}>
        {icons[type]}
        <p className="flex-1 text-white font-medium">{message}</p>
        <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
