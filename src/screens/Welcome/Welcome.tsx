import { TextInput } from '@app/components';
import { useGlobalState } from '@app/hooks';
import { phoneRegExp } from '@app/libs/operator';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './Welcome.styles';

interface FormData {
  phoneNumber: string;
}

export function WelcomeScreen() {
  const [error, setError] = useState(false);
  const [userId, setUserId] = useGlobalState<string | null>(['auth']);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onSubmit',
    defaultValues: {
      phoneNumber: '',
    },
  });

  async function handleValidSubmit({ phoneNumber }: FormData) {
    await SecureStore.setItemAsync('userId', phoneNumber);
    setUserId(phoneNumber);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={{ color: 'red' }}>
            {error && errors.phoneNumber?.message}
          </Text>
          <TextInput
            control={control}
            name="phoneNumber"
            required="Phone number is required"
            pattern={{
              value: phoneRegExp(),
              message: 'Phone number is incorrect',
            }}
            placeholder="Phone number"
            keyboardType="number-pad"
            style={[
              styles.textInput,
              { borderColor: error && errors.phoneNumber ? 'red' : undefined },
            ]}
          />
          <View style={styles.btnContainer}>
            <Button
              title="Submit"
              onPress={handleSubmit(handleValidSubmit, () => setError(true))}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
