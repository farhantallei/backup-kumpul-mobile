import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { LoginScreen, PartyScreen, RegisterScreen } from '@app/screens';
import { BottomTabNavigator, BottomTabParamList } from './BottomTab';
import { useGlobalState } from '@app/hooks/useGlobalState';

type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  Register: undefined;
  Login: undefined;
  Party: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const [userId] = useGlobalState<string | null>(['auth']);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userId == null ? (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Party" component={PartyScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
