import * as SecureStore from 'expo-secure-store';

import { useGlobalState } from '@app/hooks/useGlobalState';
import { login } from '@app/services/auth';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './Login.styles';
import { useState } from 'react';

export function LoginScreen() {
  const [userId, setUserId] = useGlobalState<string | null>(['auth']);

  const [errorMessage, setErrorMessage] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState(false);

  const { mutate } = useMutation(() => login({ phoneNumber }), {
    onMutate() {
      setError(false);
      setErrorMessage('');
    },
    onError: (error: string) => {
      if (error.includes('body/')) {
        const newErr = error.split('/');
        const instancePath = newErr[0];
        const dataError = newErr[1].split(' ')[0];

        // console.log({ instancePath, dataError });
        setError(true);

        if (dataError === 'phoneNumber')
          setErrorMessage('Phone number type error');

        return;
      }
      setErrorMessage(error);
    },
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('userId', data.id);
      setUserId(data.id);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
          <TextInput
            placeholder="Phone number"
            onChangeText={(text) => setPhoneNumber(text)}
            style={{
              ...styles.textInput,
              borderColor: error ? 'red' : undefined,
            }}
            keyboardType="number-pad"
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => mutate()} />
          </View>
          <Button title="Login" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
