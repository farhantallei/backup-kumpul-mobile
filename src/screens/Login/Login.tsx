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

export function LoginScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            placeholder="Phone number"
            style={styles.textInput}
            keyboardType="numeric"
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
          <Button title="Login" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
