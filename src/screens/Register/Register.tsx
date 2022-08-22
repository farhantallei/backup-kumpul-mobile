import * as SecureStore from 'expo-secure-store';
import { useRef, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useGlobalState } from '@app/hooks/useGlobalState';
import { RootStackScreenProps } from '@app/navigation';
import styles from './Register.styles';

export function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  const phoneNumberInputRef = useRef<TextInput>(null);

  const [error, setError] = useState(false);

  const [userId, setUserId] = useGlobalState<string | null>(['auth']);

  async function handleSubmit(e: GestureResponderEvent) {
    await SecureStore.setItemAsync('userId', 'ajksndqw');
    setUserId('ajksndqw');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            placeholder="Display name"
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
            blurOnSubmit={false}
            style={{
              ...styles.textInput,
              borderColor: error ? 'red' : undefined,
            }}
          />
          <TextInput
            placeholder="Phone number"
            style={{
              ...styles.textInput,
              borderColor: error ? 'red' : undefined,
            }}
            keyboardType="numeric"
            ref={phoneNumberInputRef}
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
