import { SafeAreaProvider } from 'react-native-safe-area-context';

import Navigation from '@app/navigation';
import { ReactQueryProvider } from '@app/libs/react-query';
import { SplashScreen } from '@app/screens';

function App() {
  return (
    <ReactQueryProvider>
      <SplashScreen>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </SplashScreen>
    </ReactQueryProvider>
  );
}

export default App;
