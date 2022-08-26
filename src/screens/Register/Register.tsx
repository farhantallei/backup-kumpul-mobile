import * as SecureStore from 'expo-secure-store';
import { useRef, useState } from 'react';
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

import { useGlobalState } from '@app/hooks/useGlobalState';
import { RootStackScreenProps } from '@app/navigation';
import styles from './Register.styles';
import { useMutation } from '@tanstack/react-query';
import { register } from '@app/services/auth';

export function RegisterScreen({
  navigation,
}: RootStackScreenProps<'Register'>) {
  const phoneNumberInputRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
  });

  const [error, setError] = useState({
    name: false,
    phoneNumber: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [userId, setUserId] = useGlobalState<string | null>(['auth']);

  const { mutate } = useMutation(
    () => register({ name: form.name, phoneNumber: form.phoneNumber }),
    {
      onMutate() {
        setError({
          name: false,
          phoneNumber: false,
        });
        setErrorMessage('');
      },
      onError: (error: string) => {
        if (error.includes('body/')) {
          const newErr = error.split('/');
          const instancePath = newErr[0];
          const dataError = newErr[1].split(' ')[0];

          // console.log({ instancePath, dataError });
          setError((prevErr) => ({ ...prevErr, [dataError]: true }));

          if (dataError === 'name')
            setErrorMessage('Name should more than 2 chars');
          if (dataError === 'phoneNumber')
            setErrorMessage('Phone number type error');

          return;
        }
        setErrorMessage(error);
        // setError(true);
      },
      onSuccess: async (data) => {
        await SecureStore.setItemAsync('userId', data.id);
        setUserId(data.id);
      },
    }
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
          <TextInput
            placeholder="Display name"
            returnKeyType="next"
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, name: text }))
            }
            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
            blurOnSubmit={false}
            style={{
              ...styles.textInput,
              borderColor: error.name ? 'red' : undefined,
            }}
          />
          <TextInput
            placeholder="Phone number"
            onChangeText={(text) =>
              setForm((prevForm) => ({ ...prevForm, phoneNumber: text }))
            }
            style={{
              ...styles.textInput,
              borderColor: error.phoneNumber ? 'red' : undefined,
            }}
            keyboardType="number-pad"
            ref={phoneNumberInputRef}
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => mutate()} />
          </View>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
