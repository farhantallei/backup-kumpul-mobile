import { StyleSheet, Text, View } from 'react-native';

export function PartyScreen() {
  return (
    <View style={styles.container}>
      <Text>Party Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
