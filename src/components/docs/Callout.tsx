import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-100',
    text: 'text-blue-800 dark:text-blue-200',
    Icon: Info,
  },
  warning: {
    container: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-400',
    title: 'text-amber-900 dark:text-amber-100',
    text: 'text-amber-800 dark:text-amber-200',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-100',
    text: 'text-red-800 dark:text-red-200',
    Icon: XCircle,
  },
  success: {
    container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    title: 'text-green-900 dark:text-green-100',
    text: 'text-green-800 dark:text-green-200',
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
