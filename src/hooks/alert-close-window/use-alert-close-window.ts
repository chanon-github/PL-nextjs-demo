import { useEffect } from 'react';

export const useBeforeUnload = (
  params: { enabled: boolean; message?: string }
) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (params.enabled) {
        e.preventDefault();
        e.returnValue = params.message;
        // return params.message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [params.enabled, params.message]);
};