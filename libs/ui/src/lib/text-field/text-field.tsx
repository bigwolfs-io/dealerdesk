import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

export type TextFieldProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
  errorText?: string
}

export function TextField({ containerStyle, style, errorText, ...restProps }: TextFieldProps) {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        placeholderTextColor='#999'
        style={[styles.input, style]}
        {...restProps}
      />

      {errorText && <Text style={styles.errorLabel}>{errorText}</Text>}
    </View>
  );
};


export default TextField;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  errorLabel: {
    color: '#E74B1C',
    marginTop: 5,
    marginLeft: 5
  }
});

