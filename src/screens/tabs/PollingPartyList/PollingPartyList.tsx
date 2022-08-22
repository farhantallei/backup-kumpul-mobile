import * as SecureStore from 'expo-secure-store';
import { Button, GestureResponderEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalState } from '@app/hooks/useGlobalState';

export function PollingPartyListScreen() {
  const [userId, setUserId] = useGlobalState<string | null>(['auth']);

  async function handleSubmit(e: GestureResponderEvent) {
    await SecureStore.deleteItemAsync('userId');
    setUserId(null);
  }

  return (
    <SafeAreaView>
      <Button title="logout" onPress={handleSubmit} />
    </SafeAreaView>
  );
}
