import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useQuery } from '@tanstack/react-query';

export function useCachedResources() {
  return useQuery(
    ['auth'],
    async () => {
      SplashScreen.preventAutoHideAsync();
      return await SecureStore.getItemAsync('userId');
    },
    {
      onError(err) {
        console.warn(err);
      },
      onSuccess() {
        SplashScreen.hideAsync();
      },
    }
  ).isLoading;
}
