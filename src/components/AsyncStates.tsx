import { Link } from 'react-router-dom';

export const SkeletonBlock = ({ height = 16, width = '100%' }: { height?: number; width?: number | string }) => (
  <div
    className="skeleton"
    style={{ height, width, borderRadius: 8, backgroundSize: '200% 100%', marginBottom: '0.5rem' }}
    aria-hidden
  />
);

export const SkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="stack">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="card">
        <SkeletonBlock width="35%" />
        <SkeletonBlock width="80%" />
        <SkeletonBlock width="65%" />
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <table className="table">
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index}>
          <td colSpan={7}>
            <SkeletonBlock height={18} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const EmptyState = ({
  title,
  message,
  actionLabel,
  to
}: {
  title: string;
  message: string;
  actionLabel: string;
  to: string;
}) => (
  <div className="empty-state">
    <p className="workspace">{title}</p>
    <h3>{message}</h3>
    <Link to={to} className="primary" style={{ textDecoration: 'none', color: '#fff' }}>
      {actionLabel}
    </Link>
  </div>
);

export const ErrorToast = ({ message, onRetry }: { message: string | null; onRetry: () => void }) => {
  if (!message) return null;

  return (
    <div role="alert" className="toast toast-error">
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>Something went wrong</p>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <button className="secondary" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};

