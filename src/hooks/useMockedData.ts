import { useCallback, useEffect, useState } from 'react';

type UseMockedDataOptions = {
  delay?: number;
  failFirst?: boolean;
};

export const useMockedData = <T,>(loader: () => T, options?: UseMockedDataOptions) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      if (options?.failFirst && !hasFailedOnce) {
        setHasFailedOnce(true);
        setLoading(false);
        setError('Unable to load data right now. Please retry.');
        return;
      }

      try {
        const nextData = loader();
        setData(nextData);
      } catch (err) {
        setError('Something went wrong while loading. Please retry.');
      } finally {
        setLoading(false);
      }
    }, options?.delay ?? 450);

    return () => clearTimeout(timeout);
  }, [hasFailedOnce, loader, options?.delay, options?.failFirst]);

  useEffect(() => load(), [load]);

  return { data, loading, error, reload: load } as const;
};

