import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  CreatePartyScreen,
  PlannedPartyListScreen,
  PollingPartyListScreen,
} from '@app/screens/tabs';

export type BottomTabParamList = {
  PollingParty: undefined;
  CreateParty: undefined;
  PlannedParty: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="PollingParty"
        component={PollingPartyListScreen}
      />
      <BottomTab.Screen name="CreateParty" component={CreatePartyScreen} />
      <BottomTab.Screen
        name="PlannedParty"
        component={PlannedPartyListScreen}
      />
    </BottomTab.Navigator>
  );
}
