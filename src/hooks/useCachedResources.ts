import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useQuery } from '@tanstack/react-query';
import { validation } from '@app/services/auth';

export function useCachedResources() {
  return useQuery(
    ['auth'],
    async () => {
      SplashScreen.preventAutoHideAsync();
      const userId = await SecureStore.getItemAsync('userId');
      if (userId == null) throw 'Not authenticated';
      await validation(userId);
      return userId;
    },
    {
      onError(err) {
        console.warn(err);
        SplashScreen.hideAsync();
      },
      onSuccess() {
        SplashScreen.hideAsync();
      },
    }
  ).isLoading;
}
