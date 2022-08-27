import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from '@app/navigation';
import { ReactQueryProvider } from '@app/libs/react-query';
import { SplashScreen } from '@app/screens';
import { StatusBar } from 'expo-status-bar';

function App() {
  return (
    <ReactQueryProvider>
      <SplashScreen>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </SplashScreen>
      <StatusBar style="dark" />
    </ReactQueryProvider>
  );
}

export default App;
