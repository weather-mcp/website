import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    text: 'text-blue-800',
    Icon: Info,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    text: 'text-amber-800',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    text: 'text-red-800',
    Icon: XCircle,
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
    text: 'text-green-800',
    Icon: CheckCircle,
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = styles[type];
  const Icon = style.Icon;

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded-r ${style.container}`}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-1 ${style.title}`}>{title}</h4>
          )}
          <div className={style.text}>{children}</div>
        </div>
      </div>
    </div>
  );
}
