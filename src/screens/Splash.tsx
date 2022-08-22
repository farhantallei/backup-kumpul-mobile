import { useCachedResources } from '@app/hooks/useCachedResources';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const loading = useCachedResources();

  if (loading) return null;

  return <>{children}</>;
}
