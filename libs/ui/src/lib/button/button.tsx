import { Text, Pressable, StyleSheet, ViewStyle, StyleProp } from 'react-native';

export interface ButtonProps {
  variant?: 'primary' | 'error'
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  title: string
}

export function Button({
  variant = 'primary',
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable style={[styles.button, styles[variant], style]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};


export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#3498DB',
  },
  error: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
} as const)
